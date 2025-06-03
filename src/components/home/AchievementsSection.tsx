import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const achievements = [
  { src: "https://placehold.co/600x400.png", alt: "Community Event", caption: "Successful Community Health Camp", hint: "community event" },
  { src: "https://placehold.co/600x400.png", alt: "Children Studying", caption: "New Learning Center Inauguration", hint: "children studying" },
  { src: "https://placehold.co/600x400.png", alt: "Women Empowerment Program", caption: "Vocational Training for Women", hint: "women empowerment" },
  { src: "https://placehold.co/600x400.png", alt: "Tree Plantation Drive", caption: "Annual Green Initiative", hint: "tree plantation" },
  { src: "https://placehold.co/600x400.png", alt: "Farmer Training", caption: "Modern Farming Workshop", hint: "farmer help" },
  { src: "https://placehold.co/600x400.png", alt: "Award Ceremony", caption: "Recognized for Community Service", hint: "award ceremony" },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-12 sm:py-16 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-headline text-center text-primary mb-12">
          Our Achievements
        </h2>
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4"> {/* Added -mx-4 px-4 for edge padding if needed with scroll */}
          {achievements.map((achievement, index) => (
            <div key={index} className="flex-none w-72 sm:w-80 md:w-96"> {/* Adjusted width for better display */}
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 h-full flex flex-col">
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={achievement.src}
                    alt={achievement.alt}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={achievement.hint}
                  />
                </div>
                <CardContent className="p-4 flex-grow flex items-center justify-center">
                  <p className="text-center font-medium text-foreground/80 group-hover:text-primary transition-colors">
                    {achievement.caption}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
