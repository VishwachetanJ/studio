import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  farmerName: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out h-full">
      <CardHeader className="p-0">
        <div className="aspect-w-16 aspect-h-9 w-full">
           <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className="object-cover w-full h-48"
            data-ai-hint={product.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2">From: {product.farmerName}</CardDescription>
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        {product.description && <p className="text-xs text-foreground/70 mt-2 line-clamp-2">{product.description}</p>}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
