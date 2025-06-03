
import Link from 'next/link';
import { HandHeart, Users, Gift, Handshake, HomeIcon, Search, ShoppingCart, CalendarDays, Briefcase, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input"; 

const mainNavLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/#about", label: "About" },
  { href: "/#mission", label: "Mission" },
  { href: "/shop", label: "Shop", icon: ShoppingCart },
  { href: "/volunteer", label: "Volunteer", icon: Users },
  { href: "/donate", label: "Donate", icon: Gift },
  { href: "/partner", label: "Partner", icon: Handshake },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/careers", label: "Careers", icon: Briefcase },
  { href: "/#founder", label: "Founder" },
  { href: "/#achievements", label: "Gallery" },
  { href: "/signin", label: "Sign In", icon: LogIn },
  { href: "/signup", label: "Sign Up", icon: UserPlus },
];

export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <HandHeart className="h-12 w-12 text-primary group-hover:text-accent transition-colors duration-300" />
            <div>
              <h1 className="text-3xl font-headline text-primary group-hover:text-accent transition-colors duration-300">
                JAGRUTHI
              </h1>
              <p className="text-xs text-foreground/70 group-hover:text-accent/90 transition-colors duration-300 -mt-1">
                Voluntary Organization
              </p>
            </div>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <nav className="flex space-x-1 lg:space-x-2 items-center">
              {mainNavLinks.map((link) => (
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
            <div className="flex items-center space-x-2 border-l pl-3 lg:pl-4">
              <Input type="search" placeholder="Search..." className="h-9 w-32 lg:w-40" />
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>


          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="p-4">
                  <Link href="/" className="flex items-center space-x-2 mb-6 group">
                    <HandHeart className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                     <div>
                        <h1 className="text-2xl font-headline text-primary group-hover:text-accent transition-colors duration-300">
                        JAGRUTHI
                        </h1>
                        <p className="text-xs text-foreground/70 group-hover:text-accent/90 transition-colors duration-300 -mt-1">
                            Voluntary Organization
                        </p>
                    </div>
                  </Link>
                  <div className="flex items-center space-x-2 mb-4">
                    <Input type="search" placeholder="Search..." className="h-9 flex-grow" />
                    <Button variant="ghost" size="icon" aria-label="Search">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-2">
                    {mainNavLinks.map((link) => (
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
