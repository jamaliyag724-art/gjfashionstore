import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ProductQuickView } from './ProductQuickView';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${selectedSize}`,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const badgeColors = {
    hot: 'bg-destructive text-destructive-foreground',
    new: 'bg-sage text-primary-foreground',
    trending: 'bg-gold text-primary-foreground',
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group relative bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.altText || `${product.name} - GJ Fashion Store ${product.category} ${product.subcategory}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badge */}
          {product.badge && (
            <Badge
              className={`absolute top-3 left-3 ${badgeColors[product.badge]} uppercase text-xs font-semibold`}
            >
              {product.badge}
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="wishlist"
            size="icon"
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 bg-card/80 backdrop-blur-sm ${
              inWishlist ? 'text-rose' : 'text-muted-foreground'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
          </Button>

          {/* Quick View Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-primary/40 flex items-center justify-center"
          >
            <Button
              variant="secondary"
              onClick={() => setShowQuickView(true)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Quick View
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-gold fill-gold'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-card-foreground">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Size Selector */}
          <div className="flex gap-1 mb-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  selectedSize === size
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:border-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="gold"
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.article>

      {/* Quick View Modal */}
      <ProductQuickView
        product={product}
        open={showQuickView}
        onOpenChange={setShowQuickView}
      />
    </>
  );
}
