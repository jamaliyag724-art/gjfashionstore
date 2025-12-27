import { Product, Category } from '@/types';

import mensBlazer from '@/assets/products/mens-blazer.jpg';
import mensShirt from '@/assets/products/mens-shirt.jpg';
import mensTrousers from '@/assets/products/mens-trousers.jpg';
import mensPolo from '@/assets/products/mens-polo.jpg';
import mensJacket from '@/assets/products/mens-jacket.jpg';
import womensTop from '@/assets/products/womens-top.jpg';
import womensDress from '@/assets/products/womens-dress.jpg';
import womensJeans from '@/assets/products/womens-jeans.jpg';
import womensBlazer from '@/assets/products/womens-blazer.jpg';
import kidsCasual from '@/assets/products/kids-casual.jpg';
import kidsDress from '@/assets/products/kids-dress.jpg';
import kidsPolo from '@/assets/products/kids-polo.jpg';

import menCategory from '@/assets/categories/men-category.jpg';
import womenCategory from '@/assets/categories/women-category.jpg';
import kidsCategory from '@/assets/categories/kids-category.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Formal Blazer',
    description: 'Make a bold impression with this classic formal blazer from GJ Fashion. Tailored for a sharp and confident look.',
    price: 4999,
    originalPrice: 6999,
    image: mensBlazer,
    category: 'men',
    subcategory: 'blazers',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5,
    reviews: 128,
    badge: 'hot',
    inStock: true,
  },
  {
    id: '2',
    name: 'Premium Cotton Shirt',
    description: 'Upgrade your everyday style with this premium cotton shirt, designed for comfort and confidence.',
    price: 1499,
    originalPrice: 1999,
    image: mensShirt,
    category: 'men',
    subcategory: 'shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 256,
    badge: 'trending',
    inStock: true,
  },
  {
    id: '3',
    name: 'Comfort Fit Trousers',
    description: 'Experience all-day comfort with these comfort fit trousers, ideal for office wear and casual styling.',
    price: 2499,
    image: mensTrousers,
    category: 'men',
    subcategory: 'trousers',
    sizes: ['30', '32', '34', '36', '38'],
    rating: 4.6,
    reviews: 89,
    inStock: true,
  },
  {
    id: '4',
    name: 'Navy Blue Polo Shirt',
    description: 'Premium navy blue polo shirt with modern relaxed fit, perfect for casual outings.',
    price: 1299,
    image: mensPolo,
    category: 'men',
    subcategory: 'shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 143,
    badge: 'new',
    inStock: true,
  },
  {
    id: '5',
    name: 'Brown Leather Jacket',
    description: 'Premium brown leather jacket with rugged modern style, a must-have for your wardrobe.',
    price: 7999,
    originalPrice: 9999,
    image: mensJacket,
    category: 'men',
    subcategory: 'jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 67,
    badge: 'hot',
    inStock: true,
  },
  {
    id: '6',
    name: 'Elegant Casual Top',
    description: 'Stay stylish and comfortable with this elegant womens top, designed for everyday wear.',
    price: 1199,
    originalPrice: 1599,
    image: womensTop,
    category: 'women',
    subcategory: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 312,
    badge: 'trending',
    inStock: true,
  },
  {
    id: '7',
    name: 'Floral Summer Dress',
    description: 'Beautiful floral summer dress with flowing fabric and soft feminine style.',
    price: 2999,
    originalPrice: 3999,
    image: womensDress,
    category: 'women',
    subcategory: 'dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.9,
    reviews: 198,
    badge: 'hot',
    inStock: true,
  },
  {
    id: '8',
    name: 'Slim Fit Denim Jeans',
    description: 'Stylish dark blue denim jeans with modern slim fit, perfect for any occasion.',
    price: 1999,
    image: womensJeans,
    category: 'women',
    subcategory: 'jeans',
    sizes: ['26', '28', '30', '32', '34'],
    rating: 4.7,
    reviews: 245,
    inStock: true,
  },
  {
    id: '9',
    name: 'Beige Blazer Jacket',
    description: 'Elegant beige blazer jacket with professional modern style, perfect for work.',
    price: 3999,
    originalPrice: 4999,
    image: womensBlazer,
    category: 'women',
    subcategory: 'blazers',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 87,
    badge: 'new',
    inStock: true,
  },
  {
    id: '10',
    name: 'Kids Trendy Casual Set',
    description: 'Let your kids shine with trendy kids wear, made with soft and skin-friendly fabric.',
    price: 999,
    originalPrice: 1299,
    image: kidsCasual,
    category: 'kids',
    subcategory: 'casual',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    rating: 4.9,
    reviews: 156,
    badge: 'trending',
    inStock: true,
  },
  {
    id: '11',
    name: 'Pink Floral Dress',
    description: 'Beautiful pink floral dress for little girls, cheerful and comfortable.',
    price: 1199,
    image: kidsDress,
    category: 'kids',
    subcategory: 'dresses',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    rating: 5,
    reviews: 203,
    badge: 'hot',
    inStock: true,
  },
  {
    id: '12',
    name: 'Smart Casual Polo',
    description: 'Smart casual polo shirt with chinos look for boys, confident and stylish.',
    price: 899,
    image: kidsPolo,
    category: 'kids',
    subcategory: 'shirts',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    rating: 4.7,
    reviews: 98,
    badge: 'new',
    inStock: true,
  },
];

export const categories: Category[] = [
  {
    id: 'men',
    name: 'Men',
    image: menCategory,
    href: '/shop?category=men',
  },
  {
    id: 'women',
    name: 'Women',
    image: womenCategory,
    href: '/shop?category=women',
  },
  {
    id: 'kids',
    name: 'Kids',
    image: kidsCategory,
    href: '/shop?category=kids',
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter((p) => p.badge === 'trending' || p.badge === 'hot');
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.badge === 'new');
};

export const getBestSellers = (): Product[] => {
  return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
};
