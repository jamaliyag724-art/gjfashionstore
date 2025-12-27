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
        <title>GJ Fashion - Premium Fashion for Men, Women & Kids | Online Fashion Store India</title>
        <meta
          name="description"
          content="Shop premium fashion at GJ Fashion. Discover the latest trends in men's, women's, and kids' clothing. Quality designs for everyday confidence. Free shipping across India."
        />
        <meta
          name="keywords"
          content="fashion online India, men's clothing, women's fashion, kids wear, premium fashion, GJ Fashion, online shopping, blazers, shirts, dresses"
        />
        <meta property="og:title" content="GJ Fashion - Premium Fashion for Everyone" />
        <meta
          property="og:description"
          content="Discover timeless elegance with premium quality designs at GJ Fashion. Shop now for the latest trends."
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
