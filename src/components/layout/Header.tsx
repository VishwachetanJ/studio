import Link from 'next/link';
import { HandHeart, Users, Gift, Handshake, HomeIcon } from 'lucide-react'; // Added HomeIcon
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon }, // Added Home link
  { href: "/#about", label: "About" },
  { href: "/#mission", label: "Mission" },
  { href: "/volunteer", label: "Volunteer", icon: Users },
  { href: "/donate", label: "Donate", icon: Gift },
  { href: "/partner", label: "Partner", icon: Handshake },
  { href: "/#founder", label: "Founder" },
  { href: "/#achievements", label: "Gallery" },
];

export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <HandHeart className="h-12 w-12 text-primary group-hover:text-accent transition-colors duration-300" />
            <h1 className="text-3xl font-headline text-primary group-hover:text-accent transition-colors duration-300">
              Jagruthi Connect
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-3 lg:space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-2 py-1 rounded-md text-sm"
              >
                {link.icon && <link.icon className="inline-block h-4 w-4 mr-1" />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="p-4">
                  <Link href="/" className="flex items-center space-x-2 mb-6">
                    <HandHeart className="h-10 w-10 text-primary" />
                    <h1 className="text-2xl font-headline text-primary">
                      Jagruthi Connect
                    </h1>
                  </Link>
                  <nav className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-lg text-foreground hover:text-primary font-medium flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
                      >
                        {link.icon && <link.icon className="h-5 w-5" />}
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
