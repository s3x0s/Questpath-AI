/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Award, 
  Trophy, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  RefreshCw,
  ExternalLink
} from "lucide-react";

import { Navbar } from "./components/Navbar";
import { GlowingOrb } from "./components/GlowingOrb";
import { CareerCard } from "./components/CareerCard";
import { ProgressBar } from "./components/ProgressBar";
import { ScenarioCard } from "./components/ScenarioCard";
import { FutureSelfAvatar } from "./components/FutureSelfAvatar";
import { RadarScoreChart } from "./components/RadarScoreChart";
import { TimelineNode } from "./components/TimelineNode";

import { careers } from "./data/careers";
import { scenarios } from "./data/scenarios";
import { calculateScores, getActionablePoints } from "./lib/scoring";
import { Choice, Career, Scenario, Scores } from "./types";

// Simple typewriter sub-component to animate future self feedback
function TypewriterText({ text, speed = 10 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    if (!text) return;
    
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="whitespace-pre-line font-sans text-slate-300 leading-relaxed text-base sm:text-lg">
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-2 h-4 ml-0.5 bg-amber-400 animate-pulse" />
      )}
    </p>
  );
}

export default function App() {
  // Navigation & Simulation State
  const [view, setView] = useState<"home" | "scenario" | "assessment" | "progress">("home");
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]); // indexes of choices
  
  // Async feedback state
  const [loadingFeedback, setLoadingFeedback] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>("");

  // Load state from sessionStorage if present to survive reloads
  useEffect(() => {
    const savedCareerId = sessionStorage.getItem("rq_career_id");
    const savedIndex = sessionStorage.getItem("rq_scenario_index");
    const savedChoices = sessionStorage.getItem("rq_choices");
    const savedView = sessionStorage.getItem("rq_view");

    if (savedCareerId) setSelectedCareerId(savedCareerId);
    if (savedIndex) setCurrentScenarioIndex(parseInt(savedIndex, 10));
    if (savedChoices) setSelectedChoices(JSON.parse(savedChoices));
    if (savedView) setView(savedView as any);
  }, []);

  // Sync state to sessionStorage
  const saveStateToSession = (
    nextView: typeof view,
    careerId: string | null,
    scenarioIndex: number,
    choicesList: number[]
  ) => {
    sessionStorage.setItem("rq_view", nextView);
    if (careerId) {
      sessionStorage.setItem("rq_career_id", careerId);
    } else {
      sessionStorage.removeItem("rq_career_id");
    }
    sessionStorage.setItem("rq_scenario_index", scenarioIndex.toString());
    sessionStorage.setItem("rq_choices", JSON.stringify(choicesList));
  };

  const handleReset = () => {
    sessionStorage.clear();
    setSelectedCareerId(null);
    setCurrentScenarioIndex(0);
    setSelectedChoices([]);
    setFeedbackText("");
    setView("home");
  };

  const handleSelectCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    setCurrentScenarioIndex(0);
    setSelectedChoices([]);
    setFeedbackText("");
    setView("scenario");
    saveStateToSession("scenario", careerId, 0, []);
  };

  const currentCareer = careers.find((c) => c.id === selectedCareerId) || null;
  const careerScenarios = selectedCareerId ? scenarios[selectedCareerId] || [] : [];
  const currentScenario = careerScenarios[currentScenarioIndex] || null;

  // Compile selected choice objects to compute scores
  const getSelectedChoiceObjects = (choicesIndices: number[]): Choice[] => {
    if (!selectedCareerId || !scenarios[selectedCareerId]) return [];
    return choicesIndices.map((choiceIdx, scenarioIdx) => {
      const scen = scenarios[selectedCareerId][scenarioIdx];
      return scen.choices[choiceIdx];
    });
  };

  const activeChoiceObjects = getSelectedChoiceObjects(selectedChoices);
  const currentScores = calculateScores(activeChoiceObjects);

  const handleSelectChoice = async (choiceIndex: number) => {
    if (!currentScenario || !selectedCareerId) return;

    const updatedChoices = [...selectedChoices, choiceIndex];
    setSelectedChoices(updatedChoices);
    
    // Switch to assessment and trigger temporal feedback fetching
    setView("assessment");
    saveStateToSession("assessment", selectedCareerId, currentScenarioIndex, updatedChoices);
    
    setLoadingFeedback(true);
    setFeedbackText("");

    try {
      // Gather narrative texts and chosen answers for API context
      const scenarioTexts = careerScenarios
        .slice(0, currentScenarioIndex + 1)
        .map((scen) => scen.narrative);

      const response = await fetch("/api/future-self", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          careerId: selectedCareerId,
          choices: updatedChoices.map((idx, i) => careerScenarios[i].choices[idx].text),
          scenarioTexts,
        }),
      });

      if (!response.ok) {
        throw new Error("Feedback fetch failed");
      }

      const data = await response.json();
      setFeedbackText(data.text);
    } catch (err) {
      console.error("API error, using client-side high-fidelity fallback:", err);
      // Fail-safes are directly handled inside server, but if server is completely down, let's write a browser-level safety fallback:
      const careerKey = selectedCareerId.toLowerCase();
      const localFallbacks: Record<string, string> = {
        "project-manager": "Hello from 10 years in the future! Looking back at your decision patterns—especially how you negotiated client deadlines, defended sprint scopes, and kept people aligned with deep empathy—I am incredibly proud of you. By prioritizing trust and quality over quick shortcuts, you established an impeccable reputation. Today, as VP of Operations, those exact habits allow us to lead large cross-functional teams with ease. Keep going, the future is incredibly bright!",
        "data-analyst": "Hey there! It's you, a decade later, sitting in the CDO suite. I remember those initial dashboard designs—how you cleanly simplified metrics, automated reports, and balanced cold algorithmic recommendations with human retraining. You chose truth and visual focus over pure complexity. That transparency defined our career. Leaders across the company trusted your insights because they trusted you. Trust your trajectory, you are doing great!",
        "entrepreneur": "Greetings from the future, my fellow founder! Reflecting on your initial startup days—how you pivoted to consulting to secure runway, structured an elegant buyout to let our co-founder depart gracefully, and pitched with a meticulous valuation model—I can see exactly why we succeeded. You avoided easy traps and respected financial health. Today, as we scale our second venture, those early habits are our cornerstone. Hold onto that resourcefulness!",
        "digital-marketer": "Hello from 10 years out! It is your future CMO self. Looking back at how you navigated those early marketing crises—owning that meme campaign error with a sincere apology, shifting to first-party organic loops during tracking limits, and backing vertical video experiments—I am thrilled. You proved that real branding is about authentic relationships, not just cheap clickbait. Your strategic agility is why our current global campaigns set the industry standard. Lead with voice!"
      };
      setFeedbackText(localFallbacks[careerKey] || localFallbacks["project-manager"]);
    } finally {
      setLoadingFeedback(false);
    }
  };

  const handleContinueToProgress = () => {
    setView("progress");
    saveStateToSession("progress", selectedCareerId, currentScenarioIndex, selectedChoices);
  };

  const handleNextPhase = () => {
    const nextIndex = currentScenarioIndex + 1;
    setCurrentScenarioIndex(nextIndex);
    setView("scenario");
    saveStateToSession("scenario", selectedCareerId, nextIndex, selectedChoices);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background Neon Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <GlowingOrb color="cyan" size="w-[500px] h-[500px]" className="-top-40 -left-20" />
        <GlowingOrb color="amber" size="w-[450px] h-[450px]" className="bottom-20 -right-20" />
        {view === "assessment" && (
          <GlowingOrb color="purple" size="w-[600px] h-[600px]" className="top-1/3 left-1/3" />
        )}
      </div>

      {/* Sticky Header */}
      <Navbar onReset={handleReset} showReset={view !== "home"} />

      {/* Page Layout Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {/* 1. HOMEPAGE VIEW */}
          {view === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Hero Banner Section */}
              <div className="text-center space-y-5 max-w-3xl mx-auto pt-4 sm:pt-10">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-400 font-mono tracking-wider uppercase">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
                  YOUTH CODE X AI HACKATHON CHAMPION
                </div>
                
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Real<span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">Quest</span>
                </h1>
                
                <p className="font-sans text-xl font-medium text-slate-200 sm:text-2xl tracking-tight">
                  Don't just study your future. <span className="text-cyan-400 font-extrabold underline decoration-cyan-500/50">Live it.</span>
                </p>
                
                <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  Duolingo makes language learning a game. <strong className="text-slate-200">RealQuest</strong> makes learning any career skill a real job before you even get the job. Choose your path, survive realistic high-stakes scenarios, and face the feedback of your Future Self.
                </p>
              </div>

              {/* Career Selection Grid */}
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
                    SELECT A SIMULATION PATHWAY
                  </span>
                  <div className="h-0.5 w-12 bg-cyan-500/50 rounded-full" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {careers.map((career) => (
                    <CareerCard
                      key={career.id}
                      career={career}
                      onSelect={handleSelectCareer}
                    />
                  ))}
                </div>
              </div>

              {/* Quote Footer / Aesthetic Accent */}
              <div className="pt-8 border-t border-white/5 text-center max-w-lg mx-auto">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
                  REALQUEST METAVERSE VM v2.1 • NO TYPING REQUIRED • 100% LIVING SIMULATION
                </p>
              </div>
            </motion.div>
          )}

          {/* 2. SCENARIO SIMULATION VIEW */}
          {view === "scenario" && currentCareer && currentScenario && (
            <motion.div
              key="scenario-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              {/* Back & Breadcrumb header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-xs text-slate-500 uppercase">ACTIVE FIELD PATHWAY</span>
                  <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                    {currentCareer.title}
                  </h2>
                </div>
                <button
                  onClick={handleReset}
                  className="font-mono text-[10px] text-slate-500 hover:text-cyan-400 uppercase tracking-widest border border-white/5 px-3 py-1.5 rounded-lg bg-white/5"
                  id="btn-scenario-abort"
                >
                  &larr; Abort Mission
                </button>
              </div>

              {/* Simulation Progression tracker */}
              <ProgressBar current={currentScenarioIndex + 1} total={careerScenarios.length} />

              {/* Scenario Interactive Card Container */}
              <ScenarioCard
                scenario={currentScenario}
                selectedChoiceIndex={null}
                onSelectChoice={handleSelectChoice}
              />
            </motion.div>
          )}

          {/* 3. ASSESSMENT / FUTURE SELF FEEDBACK VIEW */}
          {view === "assessment" && currentCareer && (
            <motion.div
              key="assessment-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto space-y-10"
            >
              {/* Temporal Header Accent */}
              <div className="text-center">
                <span className="font-mono text-xs tracking-widest text-slate-500 uppercase">
                  CHRONO-LINK ESTABLISHED • TEMPORAL FEEDBACK
                </span>
                <div className="mx-auto mt-2 h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-amber-500" />
              </div>

              {/* Hero Split Layout: Future Self Speaks + Radar Chart */}
              <div className="grid gap-8 lg:grid-cols-12 items-start">
                
                {/* Left Side: Avatar + AI Narrative Card (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Future Self Avatar */}
                  <FutureSelfAvatar />

                  {/* AI Dialogue Glassmorphic Bubble */}
                  <div className="relative rounded-2xl border border-amber-500/20 bg-amber-950/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/40 bg-slate-950 px-3 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-400">
                      LIVE TRANSCEIVER INCOMING
                    </div>

                    <div className="min-h-[140px] flex items-center justify-center">
                      {loadingFeedback ? (
                        <div className="flex flex-col items-center gap-3">
                          <RefreshCw className="h-8 w-8 text-amber-400 animate-spin" />
                          <span className="font-mono text-xs text-amber-400/70 animate-pulse uppercase tracking-wider">
                            Syncing client decisions with timeline...
                          </span>
                        </div>
                      ) : (
                        <TypewriterText text={feedbackText} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: Radar Chart & Metrics (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Radar Chart Component */}
                  <RadarScoreChart scores={currentScores} />

                  {/* Actionable points / Learning takeaways */}
                  <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-5 backdrop-blur-md">
                    <h4 className="font-sans text-sm font-bold text-white flex items-center gap-2 mb-3.5">
                      <Award className="h-4.5 w-4.5 text-cyan-400" />
                      Takeaways for Timeline Growth
                    </h4>
                    <ul className="space-y-3">
                      {getActionablePoints(currentScores, currentCareer.title).map((point, index) => (
                        <li key={index} className="flex gap-2.5 text-xs text-slate-400 leading-relaxed items-start">
                          <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_4px_rgba(245,158,11,0.8)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleContinueToProgress}
                  disabled={loadingFeedback}
                  className={`group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-4 font-sans text-sm font-bold uppercase tracking-wider text-slate-950 shadow-xl shadow-cyan-900/30 transition-all hover:from-cyan-400 hover:to-sky-400 active:scale-95 ${
                    loadingFeedback ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  id="btn-assessment-continue"
                >
                  Continue Your Journey
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. PROGRESS / CAREER TIMELINE VIEW */}
          {view === "progress" && currentCareer && (
            <motion.div
              key="progress-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto space-y-12"
            >
              {/* View Header */}
              <div className="text-center space-y-2">
                <span className="font-mono text-xs tracking-widest text-slate-500 uppercase">
                  TEMPORAL CHRONOLOGY PROGRESSION
                </span>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
                  Your Career Timeline
                </h2>
                <p className="font-sans text-sm text-slate-400 max-w-lg mx-auto">
                  Trace your career path from Junior Associate up to Executive Director, forged through your custom high-stakes decisions.
                </p>
              </div>

              {/* Vertical Timeline Node Tree */}
              <div className="relative border-l-2 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-[2px] md:before:bg-slate-800 space-y-12 pl-6 md:pl-0">
                
                {/* Visual Glow vertical overlay along the timeline line */}
                <div className="absolute left-[1px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-500/80 via-cyan-500/30 to-slate-800/20 shadow-[0_0_8px_rgba(6,182,212,0.3)] pointer-events-none" />

                {currentCareer.milestones.map((milestone, index) => {
                  // Milestone 1 (index 0) corresponds to completing Scenario 1.
                  // Milestone 2 (index 1) corresponds to completing Scenario 2.
                  // So, if selectedChoices.length > index, then this milestone is completed!
                  // Active milestone is index === selectedChoices.length
                  const isCompleted = selectedChoices.length > index;
                  const isActive = selectedChoices.length === index;

                  return (
                    <TimelineNode
                      key={index}
                      milestone={milestone}
                      index={index}
                      isCompleted={isCompleted}
                      isActive={isActive}
                    />
                  );
                })}
              </div>

              {/* Actions & Milestone Badge Section */}
              <div className="pt-8 border-t border-white/10 space-y-8">
                {selectedChoices.length === careerScenarios.length ? (
                  // Case: Completed entire simulation
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cyan-500/30 bg-cyan-950/15 p-8 text-center space-y-5"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Trophy className="h-7 w-7 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-bold text-white">
                        Simulation Completed!
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                        Unlocked Achievement: EXECUTIVE PATHFINDER
                      </p>
                    </div>

                    <p className="font-sans text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                      You have survived all 5 real-world scenarios for a <strong className="text-white">{currentCareer.title}</strong>, shaping a 10-year trajectory with highly impactful, empathetic decisions. Your Future Self approves of the legacy you are carving out!
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                      <button
                        onClick={handleReset}
                        className="rounded-2xl bg-cyan-600 hover:bg-cyan-500 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-cyan-900/30 active:scale-95"
                        id="btn-timeline-replay"
                      >
                        Simulate Another Career
                      </button>
                      <button
                        onClick={handleReset}
                        className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-slate-200 active:scale-95"
                        id="btn-timeline-home"
                      >
                        Back to Core Hub
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  // Case: Mid simulation, navigate to next scenario
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="font-sans text-xs text-slate-500">
                      You've unlocked Year {currentCareer.milestones[currentScenarioIndex]?.year || 1}. Continue simulating to scale your career.
                    </p>
                    <button
                      onClick={handleNextPhase}
                      className="group flex items-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-8 py-4 font-sans text-xs font-extrabold uppercase tracking-widest text-slate-950 shadow-lg shadow-cyan-900/30 active:scale-95"
                      id="btn-timeline-continue"
                    >
                      Enter Next Simulation Phase
                      <ChevronRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Futuristic subtle footer */}
      <footer className="relative z-10 mx-auto max-w-7xl px-4 py-12 text-center text-slate-600 border-t border-white/5 mt-12">
        <p className="font-mono text-[9px] uppercase tracking-widest leading-relaxed">
          REALQUEST PROTOCOL • BUILT FOR YOUTH CODE X AI HACKATHON 2026 • ALL RIGHTS RESERVED
        </p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <a
            href="https://ai.studio/build"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] uppercase tracking-widest hover:text-cyan-400 flex items-center gap-1 transition-colors"
          >
            AI Studio Workspace <ExternalLink className="h-2.5 w-2.5" />
          </a>
          <span className="text-slate-800">|</span>
          <span className="font-mono text-[9px] uppercase tracking-widest">
            Temporal Engine: v2.1-Flash
          </span>
        </div>
      </footer>
    </div>
  );
}
