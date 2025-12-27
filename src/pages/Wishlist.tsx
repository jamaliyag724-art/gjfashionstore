import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (product: typeof wishlist[0]['product']) => {
    addToCart(product, product.sizes[0]);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist - GJ Fashion</title>
        <meta name="description" content="View your saved items in your GJ Fashion wishlist." />
      </Helmet>

      <Layout>
        <div className="pt-24 pb-20 min-h-screen">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </motion.div>

            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {wishlist.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card rounded-xl overflow-hidden shadow-elegant"
                    >
                      <div className="aspect-[3/4] relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeFromWishlist(item.product.id);
                            toast.info('Removed from wishlist');
                          }}
                          className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-card-foreground">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <Button
                          variant="gold"
                          className="w-full"
                          onClick={() => handleAddToCart(item.product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Save items you love by clicking the heart icon on products.
                </p>
                <Link to="/shop">
                  <Button variant="gold" size="lg">
                    Browse Products
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Wishlist;
