/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Career } from "../types";

export const careers: Career[] = [
  {
    id: "project-manager",
    title: "Project Manager",
    description: "Lead teams, solve critical delivery blockers, manage budgets, and ship impact on time.",
    icon: "ClipboardList",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    milestones: [
      {
        year: 1,
        title: "Junior Associate",
        description: "You successfully coordinated your first cross-functional sprint and shipped a key user feature on time.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 3,
        title: "Senior Project Manager",
        description: "You managed the launch of a high-visibility mobile app redesign used by over 5 million daily active users.",
        image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 5,
        title: "Program Director",
        description: "You lead a portfolio of 4 concurrent products with a $5M annual budget, aligning 35 engineers and designers.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 10,
        title: "VP of Operations",
        description: "You sit at the executive table, designing company-wide delivery frameworks and directly scaling global product delivery.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Uncover hidden business patterns, construct high-impact dashboards, and drive key strategic decisions.",
    icon: "BarChart3",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    milestones: [
      {
        year: 1,
        title: "Junior Analyst",
        description: "You cleaned a massive raw dataset and built an automated dashboard that saved the sales team 10 hours a week.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 3,
        title: "Senior BI Specialist",
        description: "You designed an attribution model that proved a 25% waste in marketing spend, redirecting $500k to high-ROI channels.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 5,
        title: "Analytics Manager",
        description: "You built and mentored a team of 6 analysts, scaling the data pipeline to handle real-time streaming telemetry.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 10,
        title: "Chief Data Officer",
        description: "You helm the entire enterprise's data governance and AI strategy, driving board-level decisions with predictive intelligence.",
        image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    description: "Build products from scratch, pitch to venture capitalists, hire top talent, and scale a startup to exit.",
    icon: "Rocket",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    milestones: [
      {
        year: 1,
        title: "Solo Founder",
        description: "You built your MVP in your garage and secured your first 100 paying customers through sheer cold-outreach persistence.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 3,
        title: "Venture-Backed CEO",
        description: "You delivered an electric pitch to Silicon Valley VCs, closing a $1.5M Seed Round to expand your engineering team.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 5,
        title: "Growth-Stage Scaleup Founder",
        description: "Your product reached product-market fit, expanding your operations to 40 employees and passing $8M in annual recurring revenue.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 10,
        title: "Serial Founder / Investor",
        description: "After a successful $50M acquisition, you launch your second venture while advising and funding the next generation of founders.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    description: "Craft viral campaigns, master performance marketing channels, and capture global audience attention.",
    icon: "Megaphone",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    milestones: [
      {
        year: 1,
        title: "Growth Associate",
        description: "You managed a small $5k ad spend that yielded a 4.5x ROI and drove a viral social media trend with 1M organic views.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 3,
        title: "Growth Marketing Lead",
        description: "You optimized the entire customer acquisition funnel, reducing CAC by 35% while expanding into paid TikTok and YouTube ads.",
        image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 5,
        title: "VP of Growth & Brand",
        description: "You designed a cohesive brand campaign that drove an organic uplift of 150%, coordinating a $2M budget across 8 channels.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80"
      },
      {
        year: 10,
        title: "Chief Marketing Officer (CMO)",
        description: "You oversee a global marketing budget of $20M, spearheading full-funnel customer acquisition strategies that define the brand.",
        image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=80"
      }
    ]
  }
];
