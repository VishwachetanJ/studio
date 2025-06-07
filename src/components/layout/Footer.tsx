
"use client";

import { Facebook, Instagram, MessageSquare, Youtube, Twitter, Ghost, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { NewsletterSignUpForm } from '@/components/forms/NewsletterSignUpForm';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', 'aria-label': 'Facebook page for Jagruthi' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', 'aria-label': 'Instagram profile for Jagruthi' },
    { name: 'Snapchat', icon: Ghost, href: 'https://snapchat.com', 'aria-label': 'Snapchat profile for Jagruthi' },
    { name: 'WhatsApp', icon: MessageSquare, href: 'https://whatsapp.com', 'aria-label': 'WhatsApp contact for Jagruthi' },
    { name: 'X', icon: Twitter, href: 'https://x.com', 'aria-label': 'X (formerly Twitter) profile for Jagruthi' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', 'aria-label': 'YouTube channel for Jagruthi' },
  ];

  const placeholderAddress = "123 Jagruthi Lane, Empowerment City, Telangana, India - 500001";
  const placeholderPhone = "+91 98765 43210";
  const placeholderEmail = "info@jagruthi.org";
  // Replace with your actual Google Maps embed URL
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.0900000000004!2d78.47363881487647!3d17.40649998806856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97c16c8dba9d%3A0x4f2d9ac05818154a!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1678886400000";


  return (
    <footer className="bg-card text-card-foreground py-8 mt-auto border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-primary" />
              Our Location & Contact
            </h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md mb-6">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="300"
                style={{ border:0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jagruthi Location"
              ></iframe>
            </div>
            <div className="space-y-2 text-sm text-foreground/80">
              <p className="flex items-start">
                <MapPin className="mr-3 h-1 w-1 mt-1 flex-shrink-0 text-accent" />
                <span>{placeholderAddress}</span>
              </p>
              <p className="flex items-center">
                <Phone className="mr-3 h-4 w-4 text-accent" />
                <a href={`tel:${placeholderPhone}`} className="hover:text-primary">{placeholderPhone}</a>
              </p>
              <p className="flex items-center">
                <Mail className="mr-3 h-4 w-4 text-accent" />
                <a href={`mailto:${placeholderEmail}`} className="hover:text-primary">{placeholderEmail}</a>
              </p>
            </div>
          </div>
          
          <div>
            <div className="mb-8">
              <NewsletterSignUpForm />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-3">Connect With Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((social) => (
                  <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']}>
                    <social.icon className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Jagruthi Voluntary Organization. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Made with <span className="text-red-500">&hearts;</span> for a better tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
}
