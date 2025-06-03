
import { AnimatedBackground } from "./AnimatedBackground";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-headline text-primary mb-6">
          Welcome to JAGRUTHI
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mb-8">
          Empowering rural youth, educating children and women, promoting environmental sustainability, and championing women's rights for a brighter future.
        </p>
      </div>
    </section>
  );
}
