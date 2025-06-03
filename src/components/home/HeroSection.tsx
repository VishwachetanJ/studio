
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full h-full flex flex-col justify-center bg-gradient-to-br from-primary/10 via-background to-background p-6 rounded-lg shadow-md">
      <h2 className="text-3xl sm:text-4xl font-headline text-primary mb-4 text-left">
        Welcome to JAGRUTHI
      </h2>
      <p className="text-md sm:text-lg text-foreground/80 text-left">
        Empowering rural youth, educating children and women, promoting environmental sustainability, and championing women's rights for a brighter future.
      </p>
      {/* <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold mt-6">
        Get Involved
      </Button> */}
    </section>
  );
}
