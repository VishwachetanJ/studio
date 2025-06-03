
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedBackground } from "./AnimatedBackground";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-start text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline text-primary mb-6">
          Welcome to JAGRUTHI
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mb-8">
          Empowering rural youth, educating children and women, promoting environmental sustainability, and championing women's rights for a brighter future.
        </p>
        <Link href="/#about" legacyBehavior passHref>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <a>Learn More</a>
          </Button>
        </Link>
      </div>
    </section>
  );
}
