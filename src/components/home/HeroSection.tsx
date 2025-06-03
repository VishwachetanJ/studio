import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline text-primary mb-6">
          Welcome to JAGRUTHI
        </h2>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
          Empowering rural youth, educating children and women, promoting environmental sustainability, and championing women's rights for a brighter future.
        </p>
        {/* <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
          Get Involved
        </Button> */}
      </div>
    </section>
  );
}
