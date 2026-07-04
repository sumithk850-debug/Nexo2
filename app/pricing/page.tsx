"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Try NEXO with no commitment",
    features: [
      "NEXO Nexio 1.1 access",
      "NEXO Spadec 3.5 access",
      "50 messages / day",
      "Standard speed",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Galex",
    price: "$5",
    period: "/ 3 months",
    subPrice: "~$1.67/mo",
    desc: "Balanced power for daily use",
    features: [
      "NEXO Galex 4.0 access",
      "500 messages / day",
      "Image generation",
      "Priority speed",
    ],
    cta: "Get Galex",
    highlight: false,
  },
  {
    name: "Brainex",
    price: "$11",
    period: "/ month",
    desc: "Deep research, unlimited use",
    features: [
      "NEXO Brainex 10.8 access",
      "Unlimited messages",
      "Deep research mode",
      "File upload & analysis",
      "176 words/sec ultra speed",
      "Birthday wishes feature",
    ],
    cta: "Get Brainex",
    highlight: true,
  },
  {
    name: "Craft",
    price: "$23",
    period: "/ month",
    subPrice: "or $300/yr — save 35%",
    desc: "Maximum power for builders",
    features: [
      "NEXO Craft V3 access",
      "Everything in Brainex",
      "Ultra coding mode",
      "Advanced image creation",
      "API access",
      "Priority support",
    ],
    cta: "Get Craft",
    highlight: false,
  },
];

export default function PricingPage() {
  const [comingSoonPlan, setComingSoonPlan] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-void">
      <Nav />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan">
            Pricing
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
            Priced for Sri Lanka
          </h1>
          <p className="mt-4 text-ink-muted">
            Start free. Upgrade only when a model actually earns it. Cancel
            anytime.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.highlight
                  ? "border-cyan/50 bg-panel-raised"
                  : "border-edge bg-panel"
              }`}
            >
              {plan.highlight && (
