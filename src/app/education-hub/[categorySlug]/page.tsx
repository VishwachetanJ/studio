
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AddResourceForm } from "@/components/forms/AddResourceForm";
import { Separator } from "@/components/ui/separator";

// Define a mapping from slug to display name
const categoryDetails: Record<string, { name: string; description: string }> = {
  school: { name: "School (1st - 12th Class)", description: "Find resources tailored for students from 1st to 12th grade, covering various subjects." },
  diploma: { name: "Diploma Courses", description: "Explore materials and guides for various diploma level programs." },
  vocational: { name: "Vocational Courses", description: "Access information on skill-based vocational training and career-oriented courses." },
  undergraduate: { name: "Undergraduate Courses", description: "Discover resources to support your learning in various undergraduate degree programs." },
  postgraduate: { name: "Postgraduate Courses", description: "Dive into advanced study materials for postgraduate and master's level education." },
};

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.categorySlug;
  const categoryInfo = categoryDetails[categorySlug] || { name: "Resources", description: "Explore educational materials." };

  return {
    title: `${categoryInfo.name} | Educational Resources | Jagruthi`,
    description: `Access free educational content for ${categoryInfo.name.toLowerCase()} provided by Jagruthi. ${categoryInfo.description}`,
  };
}

export default function EducationCategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params;
  const categoryInfo = categoryDetails[categorySlug] || { name: "Selected Category", description: "Information for this category will be available soon." };

  // In a real application, this 'isAdminView' flag would be determined by
  // authenticating the user and checking their roles/permissions.
  // For this prototype, it's set to false to hide the form from general view.
  // To test the form, you can temporarily set this to true.
  const isAdminView = false; 

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8">
          <Link href="/education-hub" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Education Hub
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            {categoryInfo.description}
          </p>
        </div>

        <div className="bg-card p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-accent mb-6 text-center">
            Learning Materials & Resources
          </h2>
          <div className="text-center text-foreground/70 space-y-4">
            <p>
              Detailed course listings, tutorials, and learning materials for {categoryInfo.name.toLowerCase()} will be available here soon.
            </p>
            <p>
              We are actively working on curating and organizing the best free educational resources to support your learning journey.
            </p>
            <p className="font-medium text-primary">
              In the meantime, you can use AI-powered search and learning tools like Perplexity, NotebookLM, and Gamma AI to find and organize relevant study materials for your specific needs.
            </p>
            <p className="mt-6">
              Please check back soon for updates!
            </p>
          </div>
        </div>

        {/* Conditional rendering for the Add Resource Form */}
        {isAdminView && (
          <>
            <Separator className="my-12" />
            <AddResourceForm categoryName={categoryInfo.name} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

// This function ensures Next.js knows about the possible slugs at build time
// for static generation, if desired.
export async function generateStaticParams() {
  return Object.keys(categoryDetails).map((slug) => ({
    categorySlug: slug,
  }));
}
