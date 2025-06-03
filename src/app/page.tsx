
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeAuthSection } from "@/components/home/HomeAuthSection";
import { AboutSection } from "@/components/home/AboutSection";
import { MissionVisionValuesSection } from "@/components/home/MissionVisionValuesSection";
import { FounderSection } from "@/components/home/FounderSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Combined Hero and Auth Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 md:items-stretch">
            <div className="md:w-2/3 flex"> {/* HeroSection wrapper: takes 2/3 space */}
              <HeroSection />
            </div>
            <div className="md:w-1/3 flex"> {/* HomeAuthSection wrapper: takes 1/3 space */}
              <HomeAuthSection />
            </div>
          </div>
        </div>

        {/* Other sections remain below */}
        <AboutSection />
        <MissionVisionValuesSection />
        <FounderSection />
        <AchievementsSection />
      </main>
      <Footer />
    </div>
  );
}

