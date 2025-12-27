import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - GJ Fashion | Premium Fashion Brand India</title>
        <meta
          name="description"
          content="Learn about GJ Fashion, India's premium fashion brand delivering modern elegance with quality designs for men, women, and kids."
        />
        <meta name="keywords" content="about GJ Fashion, Indian fashion brand, premium clothing" />
        <link rel="canonical" href="https://gjfashion.com/about" />
      </Helmet>

      <Layout>
        <div className="pt-24 pb-20 min-h-screen">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                About GJ Fashion
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                GJ Fashion is built to deliver modern elegance with premium quality designs
                for everyday confidence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Our Story
                </h2>
                <p className="text-muted-foreground mb-4">
                  Founded with a vision to make premium fashion accessible to everyone,
                  GJ Fashion has grown into one of India's most trusted online fashion
                  destinations.
                </p>
                <p className="text-muted-foreground mb-4">
                  We believe that great style shouldn't come with a hefty price tag.
                  That's why we work directly with skilled artisans and manufacturers
                  to bring you quality clothing at affordable prices.
                </p>
                <p className="text-muted-foreground">
                  From classic formal wear to trendy casual outfits, our collection
                  caters to men, women, and kids who appreciate quality and style.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-card p-6 rounded-2xl shadow-elegant text-center">
                  <p className="font-display text-4xl font-bold text-gold mb-2">1000+</p>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-elegant text-center">
                  <p className="font-display text-4xl font-bold text-gold mb-2">500+</p>
                  <p className="text-muted-foreground">Products</p>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-elegant text-center">
                  <p className="font-display text-4xl font-bold text-gold mb-2">50+</p>
                  <p className="text-muted-foreground">Cities Served</p>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-elegant text-center">
                  <p className="font-display text-4xl font-bold text-gold mb-2">4.8★</p>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-20 max-w-3xl mx-auto"
            >
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
                Our Values
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Quality First
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Premium materials and craftsmanship in every piece
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💚</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Sustainable
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Eco-friendly practices and responsible sourcing
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Customer Focus
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your satisfaction is our top priority
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
