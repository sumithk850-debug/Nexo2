"use client";

import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ModelsSection } from "@/components/ModelsSection";
import { FaqSection } from "@/components/FaqSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
      <AnnouncementBanner />
      <Nav />
      <main className="flex-1">
        <Suspense fallback={<div className="h-[90vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div></div>}>
          <Hero />
        </Suspense>
        <FeaturesSection />
        <ModelsSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}