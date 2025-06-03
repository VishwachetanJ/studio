import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { MissionVisionValuesSection } from "@/components/home/MissionVisionValuesSection";
import { FounderSection } from "@/components/home/FounderSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <MissionVisionValuesSection />
        <FounderSection />
        <AchievementsSection />
      </main>
      <Footer />
    </div>
  );
}
