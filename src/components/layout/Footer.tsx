import { Facebook, Instagram, MessageSquare, Youtube, Twitter, Ghost } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', 'aria-label': 'Facebook page for Jagruthi' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', 'aria-label': 'Instagram profile for Jagruthi' },
    { name: 'Snapchat', icon: Ghost, href: 'https://snapchat.com', 'aria-label': 'Snapchat profile for Jagruthi' },
    { name: 'WhatsApp', icon: MessageSquare, href: 'https://whatsapp.com', 'aria-label': 'WhatsApp contact for Jagruthi' }, // Using MessageSquare as a proxy for WhatsApp
    { name: 'X', icon: Twitter, href: 'https://x.com', 'aria-label': 'X (formerly Twitter) profile for Jagruthi' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', 'aria-label': 'YouTube channel for Jagruthi' },
  ];

  return (
    <footer className="bg-card text-card-foreground py-8 mt-auto border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((social) => (
            <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']}>
              <social.icon className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors duration-300" />
            </Link>
          ))}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Jagruthi Voluntary Organization. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Made with <span className="text-red-500">&hearts;</span> for a better tomorrow.
        </p>
      </div>
    </footer>
  );
}
