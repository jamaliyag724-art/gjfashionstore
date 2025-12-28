import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ProductSection } from '@/components/home/ProductSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { getTrendingProducts, getBestSellers, getNewArrivals } from '@/data/products';

const Index = () => {
  const trendingProducts = getTrendingProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <>
      <Helmet>
        <title>GJ Fashion Store – Trendy Men & Women Clothing India</title>
        <meta
          name="description"
          content="Shop trendy fashion at GJ Fashion Store India. Discover premium men and women clothing, stylish wear for every occasion. Free shipping & easy returns."
        />
        <meta
          name="keywords"
          content="men clothing online India, women fashion store, trendy fashion India, online fashion store India, men and women clothing, trendy fashion wear"
        />
        <meta property="og:title" content="GJ Fashion Store – Trendy Men & Women Clothing India" />
        <meta
          property="og:description"
          content="Shop trendy fashion at GJ Fashion Store India. Discover premium men and women clothing for every occasion."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://gjfashion.com" />
      </Helmet>

      <Layout>
        <HeroSection />
        <CategoriesSection />
        <ProductSection
          title="Trending Now"
          subtitle="Our most popular picks loved by customers"
          products={trendingProducts}
          viewAllHref="/shop?filter=trending"
        />
        <PromoBanner />
        <ProductSection
          title="Best Sellers"
          subtitle="Top-rated products you'll love"
          products={bestSellers}
          viewAllHref="/shop"
        />
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh styles just landed"
          products={newArrivals}
          viewAllHref="/shop?filter=new"
        />
        <TestimonialsSection />
      </Layout>
    </>
  );
};

export default Index;
