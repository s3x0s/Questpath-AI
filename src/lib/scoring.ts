/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Choice, Scores } from "../types";

/**
 * Calculates the average scores across the five dimensions based on selected choices.
 * The raw score is out of 10, so we normalize to 0-100 by multiplying by 10.
 *
 * @param selectedChoices Array of selected choices made by the user
 * @returns Normalized scores out of 100
 */
export function calculateScores(selectedChoices: Choice[]): Scores {
  const defaultScores: Scores = {
    decisionMaking: 50,
    leadership: 50,
    communication: 50,
    riskTolerance: 50,
    empathy: 50,
  };

  if (!selectedChoices || selectedChoices.length === 0) {
    return defaultScores;
  }

  let totalDecisionMaking = 0;
  let totalLeadership = 0;
  let totalCommunication = 0;
  let totalRiskTolerance = 0;
  let totalEmpathy = 0;

  selectedChoices.forEach((choice) => {
    totalDecisionMaking += choice.scores.decisionMaking;
    totalLeadership += choice.scores.leadership;
    totalCommunication += choice.scores.communication;
    totalRiskTolerance += choice.scores.riskTolerance;
    totalEmpathy += choice.scores.empathy;
  });

  const count = selectedChoices.length;

  return {
    decisionMaking: Math.round((totalDecisionMaking / count) * 10),
    leadership: Math.round((totalLeadership / count) * 10),
    communication: Math.round((totalCommunication / count) * 10),
    riskTolerance: Math.round((totalRiskTolerance / count) * 10),
    empathy: Math.round((totalEmpathy / count) * 10),
  };
}

/**
 * Generates actionable "Points for Improvement" or feedback based on the scores.
 */
export function getActionablePoints(scores: Scores, careerTitle: string): string[] {
  const points: string[] = [];

  // Empathy
  if (scores.empathy < 50) {
    points.push("Foster active listening on your team. High performance in " + careerTitle + " relies on building high-trust environments.");
  } else if (scores.empathy > 80) {
    points.push("Balance your high empathy with boundaries. Avoid taking on too much emotional labor or compromising standards to keep everyone happy.");
  }

  // Decision Making
  if (scores.decisionMaking < 60) {
    points.push("Practice structured problem-solving. Use decision trees or risk matrices to avoid analysis paralysis or gut-reaction pitfalls.");
  } else {
    points.push("Your decisive nature is a key asset. Ensure you gather sufficient cross-functional perspective before locking in final directions.");
  }

  // Risk Tolerance
  if (scores.riskTolerance > 80) {
    points.push("Mitigate aggressive risk postures. High risk exposure can yield huge wins but warrants robust contingency planning.");
  } else if (scores.riskTolerance < 45) {
    points.push("Lean into calculated risks. Innovation in modern fields requires stepping out of traditional comfort zones.");
  }

  // Leadership & Communication
  if (scores.leadership < 60 || scores.communication < 60) {
    points.push("Invest in transparent communication. Keep key stakeholders aligned early, sharing 'why' decisions are made, not just 'what'.");
  } else {
    points.push("Excellent leadership alignment. Continue mentoring others to scale your operational footprint.");
  }

  // Ensure we always have exactly 2-3 tailored points
  if (points.length < 2) {
    points.push("Continue testing yourself against high-stakes cases to refine your intuitive business judgment.");
  }
  return points.slice(0, 3);
}
