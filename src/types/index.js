export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  condition: string;
  year: number;
  lowestAsk: number;
  highestBid: number;
  totalSales: number;
  sizes: string[];
  category: string;
  brand: string;
  lastUpdated: string;
  stock: number;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
} 