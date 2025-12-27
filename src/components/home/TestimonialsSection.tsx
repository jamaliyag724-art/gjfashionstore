import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    review: 'Amazing quality! The blazer I ordered fits perfectly and looks premium. GJ Fashion is now my go-to for formal wear.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    review: 'Fast delivery and excellent customer service. The cotton shirts are so comfortable for everyday wear.',
    rating: 5,
  },
  {
    name: 'Anita Patel',
    review: "Love the women's collection! The floral dress I bought received so many compliments. Will definitely order again.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Loved by 1,000+ Happy Customers
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            See what our customers have to say about their GJ Fashion experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-2xl shadow-elegant"
            >
              <Quote className="h-8 w-8 text-gold mb-4" />
              <p className="text-foreground mb-4">{testimonial.review}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="font-medium text-foreground">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
