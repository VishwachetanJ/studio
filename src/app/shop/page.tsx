
"use client"; // Make this a client component

import type { Metadata } from 'next'; // Keep for potential future use if metadata becomes dynamic
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard, type Product } from "@/components/shop/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageSquare, Globe, Users, Repeat, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// export const metadata: Metadata = { // Metadata is typically for server components
//   title: 'Shop | Jagruthi Connect',
//   description: 'Purchase fresh products directly from our farmers and support local communities.',
// };

const initialSampleProducts: Product[] = [
  { id: '1', name: 'Organic Mangoes (Box)', farmerName: 'Farmer Raju', price: 15.99, imageUrl: 'https://placehold.co/400x300.png', imageHint: 'mangoes fruit', description: 'Fresh, juicy organic mangoes, handpicked from our farms.', subscribable: true },
  { id: '2', name: 'Farm Fresh Eggs (Dozen)', farmerName: 'Farmer Lakshmi', price: 4.50, imageUrl: 'https://placehold.co/400x300.png', imageHint: 'eggs farm', description: 'Nutritious and delicious free-range eggs.', subscribable: true },
  { id: '3', name: 'Local Honey (Jar)', farmerName: 'Farmer Suresh', price: 8.00, imageUrl: 'https://placehold.co/400x300.png', imageHint: 'honey jar', description: 'Pure, raw honey sourced locally from happy bees.' },
  { id: '4', name: 'Handmade Soap', farmerName: 'Asha Self-Help Group', price: 6.25, imageUrl: 'https://placehold.co/400x300.png', imageHint: 'handmade soap', description: 'Artisanal soap made with natural ingredients.' },
  { id: '5', name: 'Seasonal Vegetables Basket', farmerName: 'Community Farm', price: 22.50, imageUrl: 'https://placehold.co/400x300.png', imageHint: 'vegetable basket', description: 'A curated basket of fresh, seasonal vegetables.', subscribable: true },
  { id: '6', name: 'Millet Flour (1kg)', farmerName: 'Farmer Govind', price: 3.75, imageUrl: 'https://placehold.co/400x300.png', imageHint: 'flour bag', description: 'Healthy and nutritious millet flour, stone-ground.' },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(initialSampleProducts); // Initialize with sample data
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching products from an API
    // In a real application, you would replace this with an actual API call:
    // e.g., fetch('/api/products').then(res => res.json()).then(data => setProducts(data)).catch(err => setError(err.message)).finally(() => setIsLoading(false));
    
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, we'll just use the sampleProducts.
        // When the backend is ready, this will be replaced by an actual fetch call.
        // For demonstration, if an API existed that returned an empty array:
        // const response = await fetch('/api/products'); // Fictional API
        // if (!response.ok) throw new Error('Failed to fetch products');
        // const data = await response.json();
        // setProducts(data);

        setProducts(initialSampleProducts); // Continue using sample data for now
        // If you want to test the "no products" state, uncomment the line below:
        // setProducts([]);

      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
        setProducts([]); // Clear products on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Shop Our Farmers' Products
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Support local farmers and artisans by purchasing their fresh produce and handmade goods. Every purchase makes a difference!
          </p>
        </div>

        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-accent">How to Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/70">
            <p>
              We're working on bringing you a full online shopping experience soon! In the meantime, you can place your orders through the following channels:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <span><strong>Social Media:</strong> Connect with us on Facebook, Instagram, or WhatsApp to inquire and place orders. (Links in footer)</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span><strong>By Phone:</strong> Call us at <a href="tel:+91XXXXXXXXXX" className="text-accent hover:underline">+91-XXX-XXX-XXXX</a> during business hours.</span>
              </li>
               <li className="flex items-center">
                <Globe className="h-5 w-5 mr-3 text-primary" />
                <span><strong>Website Orders:</strong> Online cart and checkout coming soon! Real-time inventory updates are in progress.</span>
              </li>
              <li className="flex items-center">
                <Repeat className="h-5 w-5 mr-3 text-primary" />
                <span><strong>Subscriptions:</strong> Some products are available for regular subscription. Look for the "Subscribe" option on product cards.</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              We appreciate your patience and support as we grow our platform. Sign up for our newsletter in the footer to get updates on new products and features!
            </p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-3xl font-headline text-center text-primary mb-10">
            Our Products
          </h2>
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="ml-4 text-lg text-foreground/70">Loading products...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-10">
              <p className="text-lg text-destructive">{error}</p>
              <p className="text-foreground/70">Please try again later.</p>
            </div>
          )}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-foreground/70">No products currently available. Please check back soon!</p>
            </div>
          )}
          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
