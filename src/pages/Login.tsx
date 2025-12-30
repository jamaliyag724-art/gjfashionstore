import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

// Valid routes for the app
const validRoutes = ['/', '/shop', '/cart', '/wishlist', '/track-order', '/login', '/about', '/contact'];

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<{ name: string; email: string; password: string }[]>([]);
  const { login, user } = useStore();

    // Auto-fill email if user previously signed up
    if (users.length > 0) {
      setEmail(users[users.length - 1].email);
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user?.isLoggedIn) {
      const returnUrl = sessionStorage.getItem('gj-return-url') || '/';
      sessionStorage.removeItem('gj-return-url');
      // Validate return URL
      const safeUrl = validRoutes.includes(returnUrl) ? returnUrl : '/';
      window.location.href = safeUrl;
    }
  }, [user]);
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password || (!isLogin && !name)) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    if (isLogin) {
      // 🔐 Firebase Login
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      login(
        userCred.user.displayName || "User",
        userCred.user.email || ""
      );

      toast.success("Welcome back!");
    } else {
      // 🆕 Firebase Register
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save extra data in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        createdAt: new Date()
      });

      login(name, email);
      toast.success("Account created successfully!");
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};


    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isLogin && !name) {
      toast.error('Please enter your name');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (isLogin) {
      // Login flow
      const existingUser = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (!existingUser) {
        // Check if email exists but password wrong
        const emailExists = registeredUsers.some((u) => u.email === email);
        if (emailExists) {
          toast.error('Incorrect password. Please try again.');
        } else {
          toast.error('No account found with this email. Please sign up first.');
        }
        return;
      }
      
      login(existingUser.name, existingUser.email);
      toast.success('Welcome back!');
    } else {
      // Register flow
      const emailExists = registeredUsers.some((u) => u.email === email);
      if (emailExists) {
        toast.error('An account with this email already exists. Please login instead.');
        setIsLogin(true);
        return;
      }
      
      // Store new user with password
      const newUser = { name, email, password };
      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem('gj-registered-users', JSON.stringify(updatedUsers));
      setRegisteredUsers(updatedUsers);
      
      login(name, email);
      toast.success('Account created successfully!');
    }
  };

 

  if (user?.isLoggedIn) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Register'} - GJ Fashion Store</title>
        <meta
          name="description"
          content="Login or create an account at GJ Fashion Store to track your orders and enjoy a personalized shopping experience."
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
                    <TabsTrigger value="login" onClick={() => handleTabChange(true)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" onClick={() => handleTabChange(false)}>
                      <UserPlus className="h-4 w-4 mr-2" />
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
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

                    {isLogin && registeredUsers.length > 0 && (
                      <p className="text-center text-sm text-muted-foreground mt-4">
                        Email auto-filled from your last registration
                      </p>
                    )}
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
