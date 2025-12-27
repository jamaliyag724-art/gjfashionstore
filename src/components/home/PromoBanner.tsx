import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function PromoBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-gold to-gold-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-4">
            Limited Time Offer
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary mb-4">
            Flat 20% Off on Summer Wear
          </h2>
          <p className="text-primary/80 max-w-md mx-auto mb-8">
            Refresh your wardrobe with our exclusive summer collection. Use code: SUMMER20
          </p>
          <Link to="/shop">
            <Button variant="default" size="xl">
              Shop Summer Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
