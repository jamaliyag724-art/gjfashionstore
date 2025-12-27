import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Search, CheckCircle, Truck, Box, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Order } from '@/types';

const statusSteps = [
  { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { key: 'packed', label: 'Packed', icon: Box },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState('');
  const [mobile, setMobile] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const { getOrderByTracking } = useStore();

  const handleTrack = () => {
    if (!trackingId || !mobile) {
      toast.error('Please enter both tracking ID and mobile number');
      return;
    }

    if (mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    const foundOrder = getOrderByTracking(trackingId.trim(), mobile);
    setSearched(true);
    
    if (foundOrder) {
      setOrder(foundOrder);
      toast.success('Order found!');
    } else {
      setOrder(null);
      toast.error('No order found with these details');
    }
  };

  const getCurrentStep = (status: string) => {
    return statusSteps.findIndex((s) => s.key === status);
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order - GJ Fashion</title>
        <meta
          name="description"
          content="Track your GJ Fashion order status. Enter your tracking ID and mobile number to see real-time order updates."
        />
        <meta name="keywords" content="track order, GJ Fashion order tracking, delivery status" />
        <link rel="canonical" href="https://gjfashion.com/track-order" />
      </Helmet>

      <Layout>
        <div className="pt-24 pb-20 min-h-screen bg-gradient-cream">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center mb-12"
            >
              <Package className="h-16 w-16 text-gold mx-auto mb-6" />
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Track Your Order
              </h1>
              <p className="text-muted-foreground">
                Enter your tracking ID and mobile number to view your order status
              </p>
            </motion.div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto bg-card p-6 rounded-2xl shadow-elegant mb-12"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Tracking ID</label>
                  <Input
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    placeholder="e.g., GJF-ABC123"
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
                <Button variant="gold" className="w-full" size="lg" onClick={handleTrack}>
                  <Search className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </motion.div>

            {/* Order Result */}
            {searched && order && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto"
              >
                {/* Order Card */}
                <div className="bg-card p-6 rounded-2xl shadow-elegant mb-8">
                  <div className="flex gap-4">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-card-foreground">
                        {order.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Size: {order.size}</p>
                      <p className="text-sm text-muted-foreground">Qty: {order.quantity}</p>
                      <p className="text-lg font-bold text-gold mt-1">
                        ₹{order.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong>Tracking ID:</strong> {order.trackingId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Ordered on:</strong>{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-card p-6 rounded-2xl shadow-elegant">
                  <h2 className="font-display text-xl font-semibold text-card-foreground mb-6">
                    Order Status
                  </h2>
                  <div className="relative">
                    {statusSteps.map((step, index) => {
                      const currentStep = getCurrentStep(order.status);
                      const isCompleted = index <= currentStep;
                      const isCurrent = index === currentStep;
                      const Icon = step.icon;

                      return (
                        <div key={step.key} className="flex gap-4 relative">
                          {/* Line */}
                          {index < statusSteps.length - 1 && (
                            <div
                              className={`absolute left-5 top-10 w-0.5 h-12 ${
                                index < currentStep ? 'bg-gold' : 'bg-border'
                              }`}
                            />
                          )}
                          {/* Icon */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                              isCompleted
                                ? 'bg-gold text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            } ${isCurrent ? 'ring-4 ring-gold/30' : ''}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          {/* Text */}
                          <div className="pb-12">
                            <p
                              className={`font-medium ${
                                isCompleted ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {step.label}
                            </p>
                            {isCurrent && (
                              <p className="text-sm text-gold">Current Status</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {searched && !order && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-muted-foreground">
                  No order found. Please check your tracking ID and mobile number.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TrackOrder;
