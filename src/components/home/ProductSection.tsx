import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showViewAll?: boolean;
  viewAllHref?: string;
}

export function ProductSection({
  title,
  subtitle,
  products,
  showViewAll = true,
  viewAllHref = '/shop',
}: ProductSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {showViewAll && (
            <Link to={viewAllHref}>
              <Button variant="ghost" className="gap-2 mt-4 md:mt-0">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
