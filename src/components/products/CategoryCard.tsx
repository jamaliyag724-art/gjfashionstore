import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Link
        to={category.href}
        className="group relative block aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300"
      >
        <img
          src={category.image}
          alt={`${category.name} fashion collection - GJ Fashion`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">
              {category.name}
            </h3>
            <span className="inline-flex items-center text-sm text-primary-foreground/80 group-hover:text-gold transition-colors">
              Shop Now
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
