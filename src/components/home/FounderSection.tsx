import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FounderSection() {
  return (
    <section id="founder" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-headline text-center text-primary mb-12">
          Our Founder's Vision
        </h2>
        <Card className="overflow-hidden shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/3">
              <Image
                src="https://placehold.co/600x800.png"
                alt="Founder of Jagruthi"
                width={600}
                height={800}
                className="object-cover h-full w-full"
                data-ai-hint="portrait person"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">
                  A Message from Our Founder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  "It has always been my dream to create an organization that serves as a beacon of hope and a catalyst for change. Jagruthi was born from a deep-seated belief in the potential of every individual, regardless of their background. Our journey began with a simple yet profound vision: to build a society where empowerment and opportunity are accessible to all."
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Our founder, (Placeholder Founder's Name), envisioned a world where rural youth are equipped with skills for a modern economy, where children and women have unfettered access to education, where our environment is cherished and protected, and where women stand as equal partners in progress. This vision fuels our every endeavor at Jagruthi.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  "We strive to create a ripple effect of positive change, starting from the grassroots, ensuring that no one is left behind in the journey towards a better, more equitable future. Join us as we work to turn this vision into reality, one community, one individual at a time."
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
