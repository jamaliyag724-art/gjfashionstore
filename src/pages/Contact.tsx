import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Message sent successfully!', {
      description: "We'll get back to you within 24 hours."
    });
    setName('');
    setEmail('');
    setMessage('');
    setLoading(false);
  };
  return <>
      <Helmet>
        <title>Contact Us - GJ Fashion | Customer Support</title>
        <meta name="description" content="Get in touch with GJ Fashion. Contact our customer support team for orders, returns, or any questions about our fashion collection." />
        <meta name="keywords" content="contact GJ Fashion, customer support, fashion help" />
        <link rel="canonical" href="https://gjfashion.com/contact" />
      </Helmet>

      <Layout>
        <div className="pt-24 pb-20 min-h-screen bg-gradient-cream">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-center mb-16">
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Have a question or feedback? We'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Info */}
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.2
            }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Email</h3>
                      <p className="text-muted-foreground">gaurangjamaliya67@gmail.com.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    
                    <div>
                      
                      
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Address</h3>
                      <p className="text-muted-foreground text-right">sindhu-bhavan , Ahmedabad , India-380059<br />
                        ​   
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-card rounded-2xl shadow-elegant">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">
                    Business Hours
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Monday - Saturday: 9:00 AM - 8:00 PM IST<br />
                    Sunday: 10:00 AM - 6:00 PM IST
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.3
            }}>
                <div className="bg-card p-8 rounded-2xl shadow-elegant">
                  <h2 className="font-display text-2xl font-bold text-card-foreground mb-6">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="mt-1" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="mt-1" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Message</label>
                      <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help you?" rows={5} className="mt-1" />
                    </div>

                    <Button variant="gold" className="w-full" size="lg" type="submit" disabled={loading}>
                      {loading ? 'Sending...' : <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>;
};
export default Contact;