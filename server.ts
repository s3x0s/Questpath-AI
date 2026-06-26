/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini client, using fallback:", err);
  }
} else {
  console.log("No GEMINI_API_KEY detected in environment. Using fallback mode.");
}

// High-fidelity fallback feedback database in case the API key is absent or fails
const fallbacks: Record<string, string> = {
  "project-manager": 
    "Hello from 10 years in the future! Looking back at your early decisions—especially how you negotiated client timelines to preserve quality, defended sprint boundaries against scope creep, and balanced project delivery with team empathy—I am so incredibly proud of you. By prioritizing trust and sustainable velocity over quick fixes, you built an impeccable reputation. Today, as VP of Operations, those exact habits allow us to lead large teams with deep respect and tactical precision. You proved that great PMs don't just ship on time—they align people and protect quality. Keep going, your future leadership is inevitable!",
  
  "data-analyst": 
    "Hey there! It's you, a decade later, writing from the Chief Data Officer suite. I remember those early analytical trials—how you instantly corrected that KPI reporting error, simplified dashboards to core business levers, and balanced cold algorithmic recommendations with human retraining programs. You chose transparency and actionable insights over easy numbers. That integrity defined our trajectory. Leaders across the firm trusted your metrics because they trusted your character. The road wasn't just about math; it was about translation and human-centric systems. Trust your path, you are building an outstanding career!",
  
  "entrepreneur": 
    "Greetings from the future, my fellow founder! Reflecting on your initial startup days—how you pivoted to consulting to secure survival runway, structured a clean buyout to let our co-founder transition gracefully, and pitched with a meticulous valuation model—I can see exactly how we survived. You didn't just chase venture capital; you respected cash flow and company governance. Today, after our successful acquisition and subsequent serial ventures, those early lessons are our absolute foundation. You proved that grit, creative resourcefulness, and a focus on core customer value are what build a real empire. Hold onto that vision!",
  
  "digital-marketer": 
    "Hello from 10 years out! It is your future CMO self. Looking back at how you navigated those early marketing campaigns—owning that viral meme error with a sincere and human apology, shifting from broken tracking loops to proprietary first-party databases, and empowering your team to explore modern vertical video channels—I am thrilled. You proved that branding is about authentic relationships, not just cheap clickbait. That strategic agility is why our current global campaigns set the industry standard. Lead with voice, embrace raw creativity, and continue taking bold, calculated risks. You are going to do incredible things!"
};

// API Endpoint for Future Self Feedback
app.post("/api/future-self", async (req, res) => {
  try {
    const { careerId, choices, scenarioTexts } = req.body;
    
    if (!careerId) {
      return res.status(400).json({ error: "Missing careerId parameter" });
    }

    const careerKey = (careerId as string).toLowerCase();

    // If AI client is active, attempt to fetch live response from Gemini
    if (ai) {
      try {
        const formattedScenarios = Array.isArray(scenarioTexts) && Array.isArray(choices)
          ? scenarioTexts.map((text, i) => `Scenario ${i + 1}: ${text}\nMy decision: ${choices[i] || "N/A"}`).join("\n\n")
          : "Standard Career Simulation completed.";

        const prompt = `I am simulating a career in ${careerId}. Here are the scenarios I faced and the decisions I made:\n\n${formattedScenarios}\n\nAs my 'Future Self' 10 years from now, speak directly to me in the first person using 'you'. Warmly and wisely comment on my decision patterns, and paint a compelling picture of our career path to VP/Executive leadership.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are the user's 'Future Self' — them 10 years in the future in their chosen career. You have lived through the consequences of every decision they just made. Speak directly to them using 'you'. Be warm, wise, encouraging, but honest. Reference their specific choices. Tell them how those choices shaped your current life, your career, and your happiness. Keep it under 200 words. Be emotionally compelling."
          }
        });

        const feedbackText = response.text;
        if (feedbackText && feedbackText.trim().length > 0) {
          return res.json({ text: feedbackText });
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to high-fidelity template:", geminiError);
      }
    }

    // Fallback: return our beautiful customized template
    const fallbackText = fallbacks[careerKey] || fallbacks["project-manager"];
    return res.json({ text: fallbackText });

  } catch (error: any) {
    console.error("Error in /api/future-self route:", error);
    return res.status(500).json({ error: "Internal server error occurred while processing feedback." });
  }
});

// Configure Vite or Static Files
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode: Mount Vite's middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    // Production Mode: Serve built static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Serving static files from production dist path: ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RealQuest Server is running on http://0.0.0.0:${PORT} [NODE_ENV=${process.env.NODE_ENV || "development"}]`);
  });
}

setupServer().catch((err) => {
  console.error("Critical error starting RealQuest server:", err);
});
