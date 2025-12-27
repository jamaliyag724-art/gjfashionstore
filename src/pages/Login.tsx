import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isLogin && !name) {
      toast.error('Please enter your name');
      return;
    }

    // Simple validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Simulate login/register
    login(name || email.split('@')[0], email);
    toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
    navigate('/');
  };

  if (user?.isLoggedIn) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Register'} - GJ Fashion</title>
        <meta
          name="description"
          content="Login or create an account at GJ Fashion to track your orders and enjoy a personalized shopping experience."
        />
      </Helmet>

      <Layout>
        <div className="pt-24 pb-20 min-h-screen bg-gradient-cream flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Welcome to GJ Fashion
                </h1>
                <p className="text-muted-foreground">
                  {isLogin ? 'Sign in to your account' : 'Create a new account'}
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-elegant">
                <Tabs value={isLogin ? 'login' : 'register'} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" onClick={() => setIsLogin(false)}>
                      Register
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label className="text-sm font-medium text-foreground">Full Name</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Password</label>
                      <div className="relative mt-1">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button variant="gold" className="w-full" size="lg" type="submit">
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </Button>
                  </form>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
