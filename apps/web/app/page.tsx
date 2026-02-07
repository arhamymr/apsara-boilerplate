import * as React from "react";
import { HeroSection } from "@/components/sections/landing/hero-section";
import { FeaturesSection } from "@/components/sections/landing/features-section";
import { TechStackSection } from "@/components/sections/landing/tech-stack-section";
import { QuickstartSection } from "@/components/sections/landing/quickstart-section";
import { CTASection } from "@/components/sections/landing/cta-section";
import { MainNav } from "@/components/navigation/main-nav";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <MainNav />
      <main className="flex-1">
        <div className="flex flex-col">
          <HeroSection />
          <TechStackSection />
          <FeaturesSection />
          <QuickstartSection />
          <CTASection />
        </div>
      </main>
      <Footer />
    </>


  );
}
