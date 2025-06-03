import Link from 'next/link';
import { HandHeart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <HandHeart className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
            <h1 className="text-3xl font-headline text-primary group-hover:text-accent transition-colors duration-300">
              Jagruthi Connect
            </h1>
          </Link>
          {/* Navigation items can be added here if needed in future */}
          {/* <nav className="flex space-x-4">
            <Link href="#about" className="text-foreground hover:text-primary font-medium">About</Link>
            <Link href="#mission" className="text-foreground hover:text-primary font-medium">Mission</Link>
            <Link href="#founder" className="text-foreground hover:text-primary font-medium">Founder</Link>
            <Link href="#achievements" className="text-foreground hover:text-primary font-medium">Gallery</Link>
          </nav> */}
        </div>
      </div>
    </header>
  );
}
