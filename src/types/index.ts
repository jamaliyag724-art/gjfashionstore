export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  altText?: string;
  category: 'men' | 'women' | 'kids';
  subcategory: string;
  sizes: string[];
  rating: number;
  reviews: number;
  badge?: 'hot' | 'new' | 'trending';
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface WishlistItem {
  product: Product;
}

export interface Order {
  id: string;
  trackingId: string;
  product: Product;
  size: string;
  quantity: number;
  mobile: string;
  status: 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  customerName: string;
  address: string;
}

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export type Category = {
  id: string;
  name: string;
  image: string;
  href: string;
};
