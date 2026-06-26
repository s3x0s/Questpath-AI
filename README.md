# RealQuest: Learn by living real scenarios

**RealQuest** is a hackathon-winning web application that replaces boring, passive online courses with immersive, multiple-choice career simulations. Users choose a career path, face realistic, high-stakes scenarios, make tactical decisions, and receive emotionally engaging, wise feedback from their "Future Self" (an AI persona of them 10 years later). An interactive, glowing vertical timeline tracks their professional progression from a Junior Associate to a board-level Executive over a simulated 10-year period.

---

## 🏆 HACKATHON FOCUS
- **Award Designation:** Built for **Youth Code x AI Hackathon**
- **Slogan:** *"Don't just study your future. Live it."*
- **Tagline:** *"Duolingo makes language learning a game. RealQuest makes learning any skill a real job before you even get the job."*

---

## 🚀 TECH STACK

- **Frontend Client:** React 19 (SPA with TypeScript)
- **Styling & Theme:** Tailwind CSS 4 with custom variables
- **Animation System:** Framer Motion (`motion/react` v12)
- **Interactive Analytics:** Recharts (Dynamic Radar score charts)
- **Vector Icons:** Lucide React
- **Backend Service:** Express with a bundled `esbuild` server compiler
- **AI Integration:** Google Gemini API (`@google/genai` on `gemini-3.5-flash`)
- **Key Features:** Seamless 100% full-stack code, 0% typing required, robust offline-fallback mechanisms.

---

## 🎨 DESIGN SYSTEM & PHILOSOPHY

- **Background Ambiance:** Deep, immersive cosmic black (`#020617`) with slow-moving ambient glowing orbs.
- **Color Accent (Core):** Neon Cyan (`#06b6d4`) representing technological pathways and achievements.
- **Color Accent (Future Self):** Warm Amber (`#f59e0b`) indicating wisdom, caution, and temporal guidance.
- **Cards UI:** Sleek glassmorphism (`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl`).
- **Typography pairing:**
  - *Headings:* `Space Grotesk` (Cybernetic display headings)
  - *Body:* `Inter` (Sleek, highly readable body typography)
  - *Data & Metrics:* `JetBrains Mono` (Tech-forward alignment matrices)

---

## 🕹️ PAGE FLOW & SIMULATION MECHANICS

1. **Dashboard Hub (Home):**
   - Elegant hero section presenting the learning philosophy.
   - 4 selectable professional pathways:
     1. **Project Manager** (Lead teams, solve delivery blockers, manage budgets)
     2. **Data Analyst** (Uncover trends, construct automated charts, guide decisions)
     3. **Entrepreneur** (MVP deployment, VC pitching, co-founder equity alignment)
     4. **Digital Marketer** (Viral growth, brand trust recovery, tracking shifts)

2. **Scenario Chamber (Simulation):**
   - Top progression indicators showing trajectory progress.
   - Narrative of a realistic, high-stakes conflict (e.g., failed launch day, scope creep).
   - 3 multiple-choice decision cards (Options A, B, and C). Click-driven controls (NO typing).

3. **Temporal Gateway (Assessment):**
   - Glowing amber "Future Self" transceiver.
   - Word-by-word typewriter animation presenting wise, direct, encouraging AI critique.
   - Recharts Radar Score Chart showing alignment across: *Decision-Making, Leadership, Communication, Risk Tolerance, and Empathy*.
   - Customized bulleted "Points for Improvement" for immediate pedagogical takeaways.

4. **Chronology Ledger (Timeline):**
   - High-fidelity vertical timeline tracking Year 1 (Junior), Year 3 (Specialist), Year 5 (Senior), and Year 10 (Executive).
   - Solved stages light up in electric cyan with lifestyle pictures and full details revealed, while future milestones remain locked in a dimmed state.

---

## 🛡️ STABILITY & AI FALLBACK INTEGRITY

RealQuest guarantees a seamless user experience even in isolated network conditions. If no `GEMINI_API_KEY` is present or if a network threshold fails, the backend automatically intercepts and returns highly-tailored, realistic, and inspiring pre-authored feedback paragraphs for each career path, preserving the application's premium grade.

---

## 🛠️ RUNNING THE CODE

To run the full-stack development server locally:

```bash
# 1. Install all dependencies
npm install

# 2. Boot dev server (Express server hosting both API and Vite)
npm run dev
```

To run a production-ready build:

```bash
# 1. Compile client assets and bundle Express backend to CommonJS
npm run build

# 2. Start compiled full-stack deployment
npm run start
```

---

### 📺 [Try it with this link!](https://realquest-152880807025.europe-west2.run.app/)
### 🎥 📺 [Watch the Official Demo Video on YouTube!](https://youtu.be/bPYgBfl567s?si=HbUrzP7yXUf36nUz)


*RealQuest — live your career before you build it.*
