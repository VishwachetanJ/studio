
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Award as AwardIcon } from 'lucide-react'; // Renamed to avoid conflict if Award component existed

export const metadata: Metadata = {
  title: 'Wall of Fame | Jagruthi',
  description: 'Celebrating individuals who have made significant contributions to societal upliftment and positive change.',
};

interface Honoree {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  contribution: string;
  shortBio: string;
}

const honorees: Honoree[] = [
  {
    id: '1',
    name: 'Mahatma Gandhi',
    imageUrl: 'https://placehold.co/400x500.png',
    imageHint: 'Gandhi portrait',
    contribution: 'Led India to independence through nonviolent civil disobedience.',
    shortBio: 'An icon of peace and nonviolence, his philosophy of Satyagraha inspired civil rights movements across the world.',
  },
  {
    id: '2',
    name: 'Dr. B.R. Ambedkar',
    imageUrl: 'https://placehold.co/400x500.png',
    imageHint: 'Ambedkar portrait',
    contribution: 'Architect of the Indian Constitution, champion of social justice and equality.',
    shortBio: 'A jurist, economist, politician and social reformer who fought against social discrimination and advocated for the rights of marginalized communities.',
  },
  {
    id: '3',
    name: 'Savitribai Phule',
    imageUrl: 'https://placehold.co/400x500.png',
    imageHint: 'Savitribai Phule portrait',
    contribution: 'Pioneer of women\'s education in India.',
    shortBio: 'An Indian social reformer, educationalist, and poet, she is regarded as the first female teacher of India. She played a vital role in improving women\'s rights.',
  },
  {
    id: '4',
    name: 'Nelson Mandela',
    imageUrl: 'https://placehold.co/400x500.png',
    imageHint: 'Nelson Mandela portrait',
    contribution: 'Anti-apartheid revolutionary and former President of South Africa.',
    shortBio: 'A global icon of democracy and social justice, he played a crucial role in dismantling apartheid and fostering reconciliation in South Africa.',
  },
];

export default function WallOfFamePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8">
          <Link href="/" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <AwardIcon className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Wall of Fame
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Honoring the visionaries and changemakers who dedicated their lives to the upliftment of society and inspired generations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {honorees.map((honoree) => (
            <Card key={honoree.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
              <div className="relative w-full h-64 sm:h-72">
                <Image
                  src={honoree.imageUrl}
                  alt={honoree.name}
                  fill
                  className="object-cover"
                  data-ai-hint={honoree.imageHint}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="font-headline text-2xl text-accent">{honoree.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 text-center pt-0">
                <CardDescription className="font-semibold text-primary">{honoree.contribution}</CardDescription>
                <p className="text-sm text-foreground/70 line-clamp-4">{honoree.shortBio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <p className="text-md text-muted-foreground">
                This is a growing tribute. We welcome suggestions for individuals who have made remarkable contributions.
            </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
