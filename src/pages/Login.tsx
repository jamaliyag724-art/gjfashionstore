import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/store/useStore";

// Valid routes
const validRoutes = [
  "/",
  "/shop",
  "/cart",
  "/wishlist",
  "/track-order",
  "/login",
  "/about",
  "/contact"
];

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, user } = useStore();

  // 🔁 Redirect if already logged in
  useEffect(() => {
    if (user?.isLoggedIn) {
      const returnUrl = sessionStorage.getItem("gj-return-url") || "/";
      sessionStorage.removeItem("gj-return-url");
      window.location.href = validRoutes.includes(returnUrl)
        ? returnUrl
        : "/";
    }
  }, [user]);

  // 🔄 Tab switch
  const handleTabChange = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setPassword("");
  };

  // 🔐 Firebase Auth Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
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
        // REGISTER
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Save user profile to Firestore
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

  if (user?.isLoggedIn) return null;

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Register"} - GJ Fashion Store</title>
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
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
                  Welcome to GJ Fashion
                </h1>
                <p className="text-muted-foreground">
                  {isLogin
                    ? "Sign in to your account"
                    : "Create a new account"}
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-elegant">
                <Tabs value={isLogin ? "login" : "register"} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="login"
                      onClick={() => handleTabChange(true)}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      onClick={() => handleTabChange(false)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative mt-1">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      variant="gold"
                      size="lg"
                      className="w-full"
                      type="submit"
                    >
                      {isLogin ? "Sign In" : "Create Account"}
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
