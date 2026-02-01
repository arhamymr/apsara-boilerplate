import * as React from "react";
import { HeroSection } from "@/components/sections/landing/hero-section";
import { FeaturesSection } from "@/components/sections/landing/features-section";
import { TechStackSection } from "@/components/sections/landing/tech-stack-section";
import { QuickstartSection } from "@/components/sections/landing/quickstart-section";
import { CTASection } from "@/components/sections/landing/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TechStackSection />
       <FeaturesSection />
      <QuickstartSection />
      <CTASection />
    </div>
  );
}
