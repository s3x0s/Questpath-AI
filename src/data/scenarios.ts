/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scenario } from "../types";

export const scenarios: Record<string, Scenario[]> = {
  "project-manager": [
    {
      id: "pm-1",
      title: "The Deadline Crisis",
      narrative: "Your team is two weeks behind schedule on a critical product launch. The CEO wants it shipped on time, but your lead developer insists the code needs two more weeks of testing. Shipping on time risks critical bugs; delaying risks losing your biggest client.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=80",
      difficulty: "Junior",
      choices: [
        {
          text: "Ship on time with known minor bugs and promise a day-one hotfix patch.",
          scores: { decisionMaking: 4, leadership: 5, communication: 5, riskTolerance: 9, empathy: 3 }
        },
        {
          text: "Negotiate a 1-week extension with the client, showing them the testing roadmap and explaining that quality guarantees safety.",
          scores: { decisionMaking: 9, leadership: 8, communication: 10, riskTolerance: 4, empathy: 7 }
        },
        {
          text: "Push the team to work mandatory overtime and weekend shifts to finish testing and ship on time.",
          scores: { decisionMaking: 3, leadership: 3, communication: 4, riskTolerance: 7, empathy: 1 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "pm-2",
      title: "The Scope Creep",
      narrative: "A major, high-influence stakeholder demands a massive new 'AI chatbot' feature mid-sprint, insisting it must go into the upcoming release. Your team is already at full capacity, and adding this will derail the core commitments.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80",
      difficulty: "Junior",
      choices: [
        {
          text: "Agree immediately to please the stakeholder, hoping the developers can 'make it work' under pressure.",
          scores: { decisionMaking: 2, leadership: 3, communication: 5, riskTolerance: 8, empathy: 4 }
        },
        {
          text: "Refuse the request outright, telling the stakeholder they are breaking sprint rules and should have asked earlier.",
          scores: { decisionMaking: 5, leadership: 5, communication: 3, riskTolerance: 2, empathy: 3 }
        },
        {
          text: "Conduct an emergency scope review: offer to add the feature by swapping out low-priority items, or slate it as the absolute priority for the very next sprint.",
          scores: { decisionMaking: 10, leadership: 9, communication: 9, riskTolerance: 5, empathy: 8 }
        }
      ],
      optimalChoice: 2
    },
    {
      id: "pm-3",
      title: "The Underperforming Core Player",
      narrative: "Your lead designer, who is single-handedly responsible for the product's UX, is missing deadlines and submitting subpar work. You discover they are going through a difficult personal crisis. The team's velocity is plummeting.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
      difficulty: "Mid",
      choices: [
        {
          text: "Issue an official performance warning, emphasizing that professional commitments must remain separate from personal life.",
          scores: { decisionMaking: 4, leadership: 3, communication: 4, riskTolerance: 3, empathy: 1 }
        },
        {
          text: "Have a private, supportive 1-on-1. Arrange a temporary workload re-distribution and recommend company counseling resources.",
          scores: { decisionMaking: 9, leadership: 10, communication: 10, riskTolerance: 5, empathy: 10 }
        },
        {
          text: "Ignore the decline and take on design tasks yourself in secret to protect them and keep the project moving.",
          scores: { decisionMaking: 5, leadership: 4, communication: 3, riskTolerance: 6, empathy: 7 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "pm-4",
      title: "The Budget Cut",
      narrative: "Midway through a complex client build, corporate slashes your project budget by 30% due to external market conditions. The client still expects a premium delivery, but you can no longer afford your full contract staff.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
      difficulty: "Senior",
      choices: [
        {
          text: "Quietly lay off contract staff and attempt to deliver the entire original scope by having remaining staff absorb the hours.",
          scores: { decisionMaking: 3, leadership: 2, communication: 2, riskTolerance: 8, empathy: 2 }
        },
        {
          text: "Present the financial reality to the client immediately. Facilitate a collaborative prioritization workshop to rescale the MVP to focus purely on high-ROI features.",
          scores: { decisionMaking: 10, leadership: 9, communication: 10, riskTolerance: 4, empathy: 8 }
        },
        {
          text: "Ask executive leadership for a temporary emergency budget exception, threatening to resign if quality is compromised.",
          scores: { decisionMaking: 5, leadership: 6, communication: 6, riskTolerance: 7, empathy: 4 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "pm-5",
      title: "The Failed Launch Day",
      narrative: "It is Launch Day. Within 30 minutes of going live, a major database bug slips through, completely locking out 20% of your high-value enterprise users. Slack is exploding, and the Sales VP is screaming in your office.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80",
      difficulty: "Executive",
      choices: [
        {
          text: "Instruct marketing to issue an 'under scheduled maintenance' banner, roll back the release immediately, and set up an isolated war-room with engineering.",
          scores: { decisionMaking: 10, leadership: 10, communication: 9, riskTolerance: 3, empathy: 8 }
        },
        {
          text: "Leave the app live and try to push hotfixes directly into production to avoid the embarrassment of taking the app offline.",
          scores: { decisionMaking: 3, leadership: 4, communication: 3, riskTolerance: 9, empathy: 2 }
        },
        {
          text: "Confront the QA lead in front of the team to find out how this bug got missed, demanding a fix within the hour.",
          scores: { decisionMaking: 2, leadership: 1, communication: 2, riskTolerance: 5, empathy: 1 }
        }
      ],
      optimalChoice: 0
    }
  ],
  "data-analyst": [
    {
      id: "da-1",
      title: "The Corrupted KPI Report",
      narrative: "You discover a query bug in your automated pipeline that double-counted subscription renewals, artificially inflating last quarter's revenue metrics by 15%. The CEO has already presented these metrics to the board of directors.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
      difficulty: "Junior",
      choices: [
        {
          text: "Quietly patch the pipeline and let the error wash out in next quarter's cumulative report, hoping nobody notices the deviation.",
          scores: { decisionMaking: 2, leadership: 2, communication: 2, riskTolerance: 9, empathy: 3 }
        },
        {
          text: "Draft a clear, non-defensive correction report highlighting the bug, the exact recalculated figures, and the pipeline fix, then present it directly to your CDO.",
          scores: { decisionMaking: 10, leadership: 9, communication: 10, riskTolerance: 5, empathy: 8 }
        },
        {
          text: "Blame the engineering team for changing the schema without notifying you, and demand they take responsibility for the error.",
          scores: { decisionMaking: 3, leadership: 3, communication: 4, riskTolerance: 4, empathy: 2 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "da-2",
      title: "The Metric Overload Request",
      narrative: "The Marketing Director demands a dashboard containing 75 different data charts tracking every single micro-interaction on the website. You know it will be virtually unreadable, slow to render, and draw focus away from actual KPIs.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
      difficulty: "Junior",
      choices: [
        {
          text: "Build exactly what they asked for. After all, they are the client and you don't want to cause friction.",
          scores: { decisionMaking: 4, leadership: 4, communication: 6, riskTolerance: 2, empathy: 5 }
        },
        {
          text: "Refuse the request, explaining that 75 charts violate basic data visualization principles and will slow down the server.",
          scores: { decisionMaking: 6, leadership: 6, communication: 4, riskTolerance: 3, empathy: 3 }
        },
        {
          text: "Host a short user-story session with marketing. Uncover their 4 core questions and propose a highly-interactive, clean dashboard focused on 5 key conversion levers.",
          scores: { decisionMaking: 10, leadership: 9, communication: 10, riskTolerance: 4, empathy: 9 }
        }
      ],
      optimalChoice: 2
    },
    {
      id: "da-3",
      title: "The Inconvenient Truth",
      narrative: "Your data analysis conclusively proves that a new, highly-celebrated premium feature is losing the company money due to massive cloud server costs. The Product VP loves this feature and recently bragged about it in an all-hands meeting.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80",
      difficulty: "Mid",
      choices: [
        {
          text: "Alter the chart scales or exclude server cost parameters to paint the feature in a better, more supportive light.",
          scores: { decisionMaking: 1, leadership: 2, communication: 4, riskTolerance: 5, empathy: 4 }
        },
        {
          text: "Email the report directly to the CEO, bypassing the Product VP entirely to show your direct commitment to truth.",
          scores: { decisionMaking: 5, leadership: 5, communication: 3, riskTolerance: 8, empathy: 2 }
        },
        {
          text: "Schedule a private run-through with the Product VP. Walk them through the cost structure objectively and present optimization alternatives to save the feature.",
          scores: { decisionMaking: 10, leadership: 10, communication: 9, riskTolerance: 5, empathy: 9 }
        }
      ],
      optimalChoice: 2
    },
    {
      id: "da-4",
      title: "Suspicious Telemetry Logs",
      narrative: "While running an audit on database read speeds, you detect anomalous querying patterns suggesting an external IP is systematically harvesting customer email lists. The cybersecurity team is ignoring your tickets.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
      difficulty: "Senior",
      choices: [
        {
          text: "Wait for the security team to handle the ticket since security is not your official domain or responsibility.",
          scores: { decisionMaking: 3, leadership: 3, communication: 4, riskTolerance: 2, empathy: 4 }
        },
        {
          text: "Assemble a concise dossier of the breach logs and schedule an immediate emergency call with the CTO, citing potential compliance breaches.",
          scores: { decisionMaking: 10, leadership: 10, communication: 10, riskTolerance: 8, empathy: 8 }
        },
        {
          text: "Write a script to block the offending IP address myself, and announce your heroic action to the company Slack channel.",
          scores: { decisionMaking: 4, leadership: 5, communication: 4, riskTolerance: 9, empathy: 3 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "da-5",
      title: "The AI Algorithm Pivot",
      narrative: "Your predictive model recommends shutting down 12 physical branches in rural areas to maximize company-wide profitability. However, doing so will lay off 120 loyal employees and leave thousands of elderly customers without access.",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=80",
      difficulty: "Executive",
      choices: [
        {
          text: "Trust the model completely. Business is about maximizing margins; present the closure plan directly to the board.",
          scores: { decisionMaking: 6, leadership: 6, communication: 6, riskTolerance: 8, empathy: 1 }
        },
        {
          text: "Present the model's insights alongside a hybrid transition strategy: keep 3 vital regional hubs open, shift others to digital-assistance vans, and detail a retraining program for staff.",
          scores: { decisionMaking: 10, leadership: 10, communication: 10, riskTolerance: 5, empathy: 10 }
        },
        {
          text: "Bury the report. The human cost is too high, and sometimes data analysis needs to be ignored to preserve company culture.",
          scores: { decisionMaking: 4, leadership: 5, communication: 5, riskTolerance: 2, empathy: 9 }
        }
      ],
      optimalChoice: 1
    }
  ],
  "entrepreneur": [
    {
      id: "ent-1",
      title: "The Runway Cliff",
      narrative: "Your SaaS startup has only 4 months of cash left in the bank. Your free tier is incredibly popular with 10,000 users, but only 1.5% are converting to paid. You are running out of runway fast.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
      difficulty: "Junior",
      choices: [
        {
          text: "Add a hard limit to the free tier (max 5 items), forcing active free users to convert to paid or leave.",
          scores: { decisionMaking: 8, leadership: 7, communication: 6, riskTolerance: 8, empathy: 4 }
        },
        {
          text: "Pivot to custom consulting/service work for 3 major enterprises to bring in immediate cash, even though it pulls developers away from building the product.",
          scores: { decisionMaking: 9, leadership: 8, communication: 8, riskTolerance: 4, empathy: 6 }
        },
        {
          text: "Double down on marketing efforts, running expensive Facebook ads to acquire more users in hopes of raising a VC round.",
          scores: { decisionMaking: 3, leadership: 4, communication: 5, riskTolerance: 10, empathy: 3 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "ent-2",
      title: "The Co-founder Deadlock",
      narrative: "Your co-founder is completely burned out and wants to accept an early acquisition offer of $3M. You own equal equity, but you believe the market is huge and you could grow the company to $50M in 5 years. The tension is freezing progress.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80",
      difficulty: "Junior",
      choices: [
        {
          text: "Yield to their request and sell the company to protect the relationship and get a guaranteed payout.",
          scores: { decisionMaking: 4, leadership: 4, communication: 6, riskTolerance: 2, empathy: 7 }
        },
        {
          text: "Structure an equity buyout plan: use secondary market investors or future revenue shares to buy out your co-founder's stake, allowing them to depart gracefully while you take full control.",
          scores: { decisionMaking: 10, leadership: 9, communication: 9, riskTolerance: 8, empathy: 8 }
        },
        {
          text: "Threaten to leave the company yourself and start a competitor if they don't agree to reject the buyout.",
          scores: { decisionMaking: 2, leadership: 2, communication: 2, riskTolerance: 9, empathy: 1 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "ent-3",
      title: "The High-Stakes Term Sheet",
      narrative: "An old-school Venture Capitalist offers you a $2.5M Series A investment, but they demand a 35% equity stake and 2 out of 3 seats on your board of directors, meaning they can fire you from your own company.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=80",
      difficulty: "Mid",
      choices: [
        {
          text: "Accept the deal immediately. Having $2.5M in the bank solves all survival fears, regardless of governance controls.",
          scores: { decisionMaking: 4, leadership: 5, communication: 5, riskTolerance: 8, empathy: 3 }
        },
        {
          text: "Reject the sheet entirely and vow to boost revenue organically (bootstrapping) to avoid ever giving up control.",
          scores: { decisionMaking: 6, leadership: 6, communication: 5, riskTolerance: 5, empathy: 5 }
        },
        {
          text: "Counter-propose with a detailed valuation model, offering 20% equity and 1 board seat, while shopping the term sheet to rival investors to build leverage.",
          scores: { decisionMaking: 10, leadership: 10, communication: 9, riskTolerance: 7, empathy: 6 }
        }
      ],
      optimalChoice: 2
    },
    {
      id: "ent-4",
      title: "The Star Hire Dilemma",
      narrative: "You've recruited a world-class CTO candidate who can take your AI product to the next level. She has an offer of $220k cash from Google. You can't afford to pay her more than $90k without draining your cash, but she is key to your survival.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
      difficulty: "Senior",
      choices: [
        {
          text: "Match Google's cash offer by using your entire product development budget, delaying other crucial hires.",
          scores: { decisionMaking: 3, leadership: 4, communication: 5, riskTolerance: 9, empathy: 4 }
        },
        {
          text: "Pitch her on the long-term vision: Offer $90k plus a generous 4% equity package vesting over 4 years, detailing how her architecture shapes a future $100M entity.",
          scores: { decisionMaking: 10, leadership: 10, communication: 10, riskTolerance: 6, empathy: 9 }
        },
        {
          text: "Congratulate her on the Google offer and look for a cheaper, entry-level developer on Upwork.",
          scores: { decisionMaking: 5, leadership: 5, communication: 6, riskTolerance: 2, empathy: 5 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "ent-5",
      title: "The Copycat Strike",
      narrative: "A massive tech giant launches a native feature in their operating system that does exactly what your standalone SaaS does, entirely for free. Your churn rates instantly spike 15% as news spreads.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
      difficulty: "Executive",
      choices: [
        {
          text: "Pivot your focus immediately to a highly-specialized, enterprise-grade niche with custom integrations and security features that giants won't prioritize.",
          scores: { decisionMaking: 10, leadership: 10, communication: 9, riskTolerance: 8, empathy: 7 }
        },
        {
          text: "Slash your pricing by 50% and launch a negative public relations campaign accusing the giant of stealing indie-developer tech.",
          scores: { decisionMaking: 3, leadership: 4, communication: 6, riskTolerance: 7, empathy: 3 }
        },
        {
          text: "Initiate discussions with the giant's corporate development team to see if they are interested in buying your brand and IP for a talent acquisition.",
          scores: { decisionMaking: 8, leadership: 8, communication: 8, riskTolerance: 5, empathy: 5 }
        }
      ],
      optimalChoice: 0
    }
  ],
  "digital-marketer": [
    {
      id: "dm-1",
      title: "The Meme campaign Backlash",
      narrative: "A cheeky, boundary-pushing social media campaign you approved gets misinterpreted by a vocal online group, causing a major public backlash and viral boycott hashtags. Your notifications are in flames.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
      difficulty: "Junior",
      choices: [
        {
          text: "Delete all campaign posts immediately, stay completely silent, and wait for the internet's attention span to move on.",
          scores: { decisionMaking: 4, leadership: 4, communication: 3, riskTolerance: 2, empathy: 3 }
        },
        {
          text: "Issue a sincere, human-written apology taking 100% responsibility, detail exactly why the messaging was tone-deaf, and donate the campaign budget to an aligned cause.",
          scores: { decisionMaking: 10, leadership: 9, communication: 10, riskTolerance: 5, empathy: 10 }
        },
        {
          text: "Double down on the humor, liking supportive comments and claiming that 'outrage culture' is just boosting your reach.",
          scores: { decisionMaking: 3, leadership: 3, communication: 5, riskTolerance: 10, empathy: 1 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "dm-2",
      title: "The Budget Cut Pivot",
      narrative: "Management slashes your quarterly paid marketing budget by 50% due to corporate restructuring, but they still expect you to hit your original target of 5,000 new client registrations.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=80",
      difficulty: "Junior",
      choices: [
        {
          text: "Run highly controversial, 'gray-area' clickbait advertisements that have massive click rates but convert poorly, just to hit your metric targets.",
          scores: { decisionMaking: 3, leadership: 3, communication: 4, riskTolerance: 9, empathy: 2 }
        },
        {
          text: "Present a business model showing that a 50% budget cut demands a realistic 30% reduction in target registrations, refuse to compromise your CAC thresholds.",
          scores: { decisionMaking: 7, leadership: 8, communication: 7, riskTolerance: 3, empathy: 5 }
        },
        {
          text: "Shift focus away from paid ads to low-cost organic levers: launch an interactive customer referral program, optimize existing SEO content, and run a co-marketing campaign.",
          scores: { decisionMaking: 10, leadership: 9, communication: 9, riskTolerance: 6, empathy: 8 }
        }
      ],
      optimalChoice: 2
    },
    {
      id: "dm-3",
      title: "The Scandalous Influencer",
      narrative: "Your brand's primary celebrity influencer, who you just paid a non-refundable $30k fee to represent your green beauty products, is caught in a massive public scandal involving environmental pollution.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80",
      difficulty: "Mid",
      choices: [
        {
          text: "Run the campaign anyway since the fee is non-refundable and you need the marketing impressions.",
          scores: { decisionMaking: 2, leadership: 3, communication: 4, riskTolerance: 8, empathy: 2 }
        },
        {
          text: "Terminating the contract instantly, issue an immediate statement declaring your brand values, and pivot the budget to micro-influencers with verified green credentials.",
          scores: { decisionMaking: 10, leadership: 10, communication: 10, riskTolerance: 6, empathy: 9 }
        },
        {
          text: "Wait and see how the public reacts over the next week before making any public statement or stopping ads.",
          scores: { decisionMaking: 5, leadership: 5, communication: 5, riskTolerance: 3, empathy: 4 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "dm-4",
      title: "The Privacy Tech-Apocalypse",
      narrative: "A surprise software update from Apple blocks browser cookie tracking, wiping out 80% of your Facebook retargeting audience data. Your customer acquisition costs double overnight.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
      difficulty: "Senior",
      choices: [
        {
          text: "Keep feeding the Facebook ad algorithm, increasing bids to compensate and hoping the AI optimizes around the data loss.",
          scores: { decisionMaking: 3, leadership: 3, communication: 4, riskTolerance: 8, empathy: 3 }
        },
        {
          text: "Pivot budget to opt-in lead generation (quizzes, value newsletters, interactive calculators) to build a robust, proprietary first-party email database.",
          scores: { decisionMaking: 10, leadership: 10, communication: 9, riskTolerance: 5, empathy: 8 }
        },
        {
          text: "Purchase custom, gray-market third-party scraping lists to manually upload matching user records directly to ad platforms.",
          scores: { decisionMaking: 2, leadership: 2, communication: 2, riskTolerance: 9, empathy: 1 }
        }
      ],
      optimalChoice: 1
    },
    {
      id: "dm-5",
      title: "The Underperforming Channel",
      narrative: "Your team has spent $75,000 on high-authority SEO blog content over the past 6 months with nearly zero signups. Meanwhile, a raw, low-budget TikTok series made by your intern has generated 2,000 registrations.",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=80",
      difficulty: "Executive",
      choices: [
        {
          text: "Continue the SEO spend. High-quality written content builds long-term authority, and pivoting too early wastes the $75k sunk cost.",
          scores: { decisionMaking: 4, leadership: 4, communication: 5, riskTolerance: 3, empathy: 4 }
        },
        {
          text: "Reallocate 80% of the SEO budget into raw, vertical video creation. Empower the intern to lead a micro-creative studio, while keeping written content to a minimal maintenance level.",
          scores: { decisionMaking: 10, leadership: 10, communication: 10, riskTolerance: 7, empathy: 9 }
        },
        {
          text: "Shut down the SEO efforts completely, fire the agency, and put the entire budget into paid TikTok influencer campaigns.",
          scores: { decisionMaking: 7, leadership: 7, communication: 8, riskTolerance: 9, empathy: 5 }
        }
      ],
      optimalChoice: 1
    }
  ]
};
