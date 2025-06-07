
import Link from 'next/link';
import { HandHeart, Users, Gift, Handshake, HomeIcon, Search, ShoppingCart, CalendarDays, Briefcase, LogIn, UserPlus, BookOpenCheck, HelpingHand, Leaf, Award, Sprout, Lightbulb, FileText, UserCog, ChevronDown, Target, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Full list for mobile navigation and potential future "More" dropdowns
const allNavLinks = [
  { href: "/", label: "Home", icon: HomeIcon, category: "main" },
  { href: "/#about", label: "About", category: "main" },
  { href: "/#mission", label: "Mission", icon: Target, category: "main" },
  { href: "/education-hub", label: "Education Hub", icon: BookOpenCheck, category: "programs" },
  { href: "/counseling-hub", label: "Counseling Hub", icon: Lightbulb, category: "programs" },
  { href: "/rural-youth-empowerment", label: "Youth Hub", icon: Users, category: "programs" },
  { href: "/womens-empowerment", label: "Women's Hub", icon: HelpingHand, category: "programs" },
  { href: "/environmental-sustainability", label: "Eco Hub", icon: Leaf, category: "programs" },
  { href: "/farmers-welfare", label: "Farmers Welfare", icon: Sprout, category: "programs" },
  { href: "/shop", label: "Shop", icon: ShoppingCart, category: "engage" },
  { href: "/wall-of-fame", label: "Wall of Fame", icon: Award, category: "engage" },
  { href: "/volunteer", label: "Volunteer", icon: Users, category: "engage" },
  { href: "/donate", label: "Donate", icon: Gift, category: "engage" },
  { href: "/partner", label: "Partner", icon: Handshake, category: "engage" },
  { href: "/events", label: "Events", icon: CalendarDays, category: "engage" },
  { href: "/careers", label: "Careers", icon: Briefcase, category: "engage" },
  { href: "/#founder", label: "Founder", category: "main" },
  { href: "/#achievements", label: "Gallery", category: "main" },
  // Admin links could be conditionally shown based on user role in a real app
  { href: "/admin", label: "Admin Dashboard", icon: UserCog, category: "admin" },
];

const aboutDropdownLinks = [
  { href: "/#about", label: "Our Focus" },
  { href: "/#mission", label: "Mission & Vision" },
  { href: "/#founder", label: "Founder" },
  { href: "/#achievements", label: "Gallery" },
  { href: "/wall-of-fame", label: "Wall of Fame" },
];

const ourWorkHubs = [
  { href: "/education-hub", label: "Education Hub" },
  { href: "/counseling-hub", label: "Counseling Hub" },
  { href: "/rural-youth-empowerment", label: "Youth Empowerment Hub" },
  { href: "/womens-empowerment", label: "Women's Empowerment Hub" },
  { href: "/environmental-sustainability", label: "Environmental Hub" },
  { href: "/farmers-welfare", label: "Farmers Welfare Hub" },
];

const joinUsDropdownLinks = [
  { href: "/volunteer", label: "Volunteer" },
  { href: "/partner", label: "Partner With Us" },
  { href: "/events", label: "Events" },
  { href: "/careers", label: "Careers" },
];


export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <HandHeart className="h-10 w-10 sm:h-12 sm:w-12 text-primary group-hover:text-primary/80 transition-colors duration-300" />
            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-3xl font-headline text-primary group-hover:text-primary/80 transition-colors duration-300">
                JAGRUTHI
              </h1>
              <p className="text-xs text-foreground/70 group-hover:text-primary/70 transition-colors duration-300 -mt-1">
                Voluntary Organization
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider"
            >
              HOME
            </Link>
            {/* ABOUT Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider p-0 hover:bg-transparent">
                  ABOUT
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card border-border shadow-lg w-56">
                {aboutDropdownLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="text-sm text-foreground hover:bg-muted hover:text-primary w-full cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* OUR WORK Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider p-0 hover:bg-transparent">
                  OUR WORK
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card border-border shadow-lg w-56">
                {ourWorkHubs.map((hub) => (
                  <DropdownMenuItem key={hub.href} asChild>
                    <Link href={hub.href} className="text-sm text-foreground hover:bg-muted hover:text-primary w-full cursor-pointer">
                      {hub.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link
                href="/shop"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider"
              >
                SHOP
            </Link>

            {/* JOIN US Dropdown (formerly MORE) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider p-0 hover:bg-transparent">
                  JOIN US
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card border-border shadow-lg w-56">
                {joinUsDropdownLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="text-sm text-foreground hover:bg-muted hover:text-primary w-full cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

             <Link
                href="/donate"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider whitespace-nowrap"
              >
                SUPPORT US
            </Link>
          </nav>

          {/* Desktop Right-Side Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <div className="relative">
              <Input type="search" placeholder="Search..." className="h-9 w-32 lg:w-40 pr-8" />
              <Button variant="ghost" size="icon" aria-label="Search" className="absolute right-0 top-0 h-9 w-9">
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            <Link href="/signin" legacyBehavior>
              <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" legacyBehavior>
              <Button className="text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 py-2">
                Join Us
              </Button>
            </Link>
          </div>


          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-primary" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <Link href="/" className="flex items-center space-x-2 group">
                      <HandHeart className="h-8 w-8 text-primary" />
                       <div>
                          <h1 className="text-xl font-headline text-primary">
                          JAGRUTHI
                          </h1>
                          <p className="text-xs text-foreground/70 -mt-1">
                              Voluntary Organization
                          </p>
                      </div>
                    </Link>
                  </div>
                  <div className="p-4 flex-grow overflow-y-auto">
                    <div className="relative mb-4">
                      <Input type="search" placeholder="Search..." className="h-9 w-full pr-10" />
                       <Button variant="ghost" size="icon" aria-label="Search" className="absolute right-0 top-0 h-9 w-9">
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <nav className="flex flex-col space-y-1">
                      {allNavLinks.filter(link => link.category !== 'admin').map((link) => ( // Filter out admin for general mobile nav
                        <Link
                          key={link.label}
                          href={link.href}
                          className="text-md text-foreground hover:text-primary font-medium flex items-center space-x-3 p-3 rounded-md hover:bg-muted transition-colors"
                        >
                          {link.icon && <link.icon className="h-5 w-5 text-primary/80" />}
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="p-4 border-t mt-auto space-y-2">
                     <Link href="/signin" legacyBehavior>
                        <Button variant="outline" className="w-full text-foreground">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup" legacyBehavior>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Join Us
                        </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

