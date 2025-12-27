import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart, addOrder, user } = useStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const total = getCartTotal();
  const shipping = total > 999 ? 0 : 99;
  const grandTotal = total + shipping;

  const handlePlaceOrder = () => {
    if (!customerName || !mobile || !address) {
      toast.error('Please fill in all fields');
      return;
    }

    if (mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    // Create orders for each cart item
    const trackingIds: string[] = [];
    cart.forEach((item) => {
      const trackingId = addOrder({
        product: item.product,
        size: item.size,
        quantity: item.quantity,
        mobile,
        status: 'confirmed',
        customerName,
        address,
      });
      trackingIds.push(trackingId);
    });

    clearCart();
    setShowCheckout(false);
    
    toast.success('Order placed successfully!', {
      description: `Your tracking ID: ${trackingIds[0]}`,
      duration: 5000,
    });
    
    navigate('/track-order');
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart - GJ Fashion</title>
        <meta name="description" content="Review your shopping cart and proceed to checkout at GJ Fashion." />
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
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </motion.div>

            {cart.length > 0 ? (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 bg-card p-4 rounded-xl shadow-elegant"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-semibold text-card-foreground">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                          <p className="text-lg font-bold text-gold mt-1">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.size,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.size, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card p-6 rounded-xl shadow-elegant sticky top-24">
                    <h2 className="font-display text-xl font-semibold text-card-foreground mb-6">
                      Order Summary
                    </h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>₹{total.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                      </div>
                      {shipping > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Free shipping on orders above ₹999
                        </p>
                      )}
                      <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-card-foreground">
                        <span>Total</span>
                        <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <Button
                      variant="gold"
                      className="w-full"
                      size="lg"
                      onClick={() => setShowCheckout(true)}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link to="/shop">
                  <Button variant="gold" size="lg">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Checkout Dialog */}
        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Checkout</DialogTitle>
              <DialogDescription>
                Enter your details to complete the order
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Delivery Address</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address"
                  className="mt-1"
                />
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-lg font-bold text-foreground mb-4">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <Button variant="gold" className="w-full" size="lg" onClick={handlePlaceOrder}>
                  Place Order (Cash on Delivery)
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Layout>
    </>
  );
};

export default Cart;
