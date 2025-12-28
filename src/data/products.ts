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
    description: 'Elevate your style with this classic formal blazer by GJ Fashion Store. Crafted with premium fabric for a sharp, confident look. Perfect for business meetings, weddings, and formal events. Features structured shoulders, modern slim fit, and durable stitching. Available in multiple sizes.',
    price: 4999,
    originalPrice: 6999,
    image: mensBlazer,
    altText: 'Men black classic formal blazer by GJ Fashion Store',
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
    description: 'Upgrade your wardrobe with this premium cotton shirt from GJ Fashion Store. Made with 100% breathable cotton for all-day comfort. Modern slim fit design suitable for office wear and casual outings. Easy to maintain and long-lasting quality. Perfect for Indian summers.',
    price: 1499,
    originalPrice: 1999,
    image: mensShirt,
    altText: 'Men white premium cotton formal shirt by GJ Fashion Store',
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
    description: 'Experience all-day comfort with these premium trousers by GJ Fashion Store. Designed with stretch fabric for easy movement. Smart tailored fit perfect for office and casual wear. Wrinkle-resistant and easy to care. Ideal for the modern Indian professional.',
    price: 2499,
    image: mensTrousers,
    altText: 'Men beige comfort fit formal trousers by GJ Fashion Store',
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
    description: 'Stay cool and stylish with this navy blue polo shirt from GJ Fashion Store. Premium pique cotton fabric with breathable design. Relaxed fit for casual comfort. Features classic collar and ribbed cuffs. Perfect for weekend outings and college wear.',
    price: 1299,
    image: mensPolo,
    altText: 'Men navy blue polo t-shirt by GJ Fashion Store',
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
    description: 'Make a statement with this premium brown leather jacket by GJ Fashion Store. Genuine leather with rugged modern styling. Features zippered pockets and comfortable lining. Perfect for winters and evening outings. A timeless addition to any wardrobe.',
    price: 7999,
    originalPrice: 9999,
    image: mensJacket,
    altText: 'Men brown premium leather jacket by GJ Fashion Store',
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
    description: 'Look effortlessly chic with this elegant casual top from GJ Fashion Store. Soft lightweight fabric for all-day comfort. Trendy modern design with flattering fit. Easy to pair with jeans, skirts, or palazzos. Perfect for work, college, or casual outings.',
    price: 1199,
    originalPrice: 1599,
    image: womensTop,
    altText: 'Women pink elegant casual top by GJ Fashion Store',
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
    description: 'Embrace summer vibes with this beautiful floral dress by GJ Fashion Store. Flowing lightweight fabric with feminine silhouette. Features delicate floral prints and comfortable fit. Perfect for brunches, dates, and casual outings. Easy to style and care for.',
    price: 2999,
    originalPrice: 3999,
    image: womensDress,
    altText: 'Women floral summer dress by GJ Fashion Store',
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
    description: 'Rock your casual look with these slim fit denim jeans from GJ Fashion Store. Premium stretch denim for comfortable movement. Modern slim fit with classic 5-pocket design. Versatile dark blue wash for any occasion. A wardrobe essential for every woman.',
    price: 1999,
    image: womensJeans,
    altText: 'Women dark blue slim fit denim jeans by GJ Fashion Store',
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
    description: 'Power dress with this elegant beige blazer by GJ Fashion Store. Sophisticated design with professional appeal. Structured fit for a polished look. Perfect for office meetings and formal events. Pair with trousers or jeans for versatile styling.',
    price: 3999,
    originalPrice: 4999,
    image: womensBlazer,
    altText: 'Women beige formal blazer jacket by GJ Fashion Store',
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
    description: 'Let your little ones shine with this trendy casual set from GJ Fashion Store. Made with soft, skin-friendly cotton fabric. Vibrant colors with fun modern design. Comfortable for all-day play and activities. Easy to wash and maintain.',
    price: 999,
    originalPrice: 1299,
    image: kidsCasual,
    altText: 'Kids colorful trendy casual wear set by GJ Fashion Store',
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
    description: 'Adorable pink floral dress for little princesses by GJ Fashion Store. Soft breathable fabric for comfort. Beautiful floral prints with cheerful design. Perfect for parties, birthdays, and special occasions. Easy to wear and care for.',
    price: 1199,
    image: kidsDress,
    altText: 'Kids pink floral party dress by GJ Fashion Store',
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
    description: 'Dress your boy smart with this casual polo shirt from GJ Fashion Store. Premium cotton with breathable design. Classic polo style with modern fit. Perfect for school, outings, and casual events. Comfortable and easy to maintain.',
    price: 899,
    image: kidsPolo,
    altText: 'Kids navy blue smart casual polo shirt by GJ Fashion Store',
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
