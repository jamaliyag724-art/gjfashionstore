import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "@/store/useStore";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useStore((state) => state.login);

  // ---------- PHP LOGIN API ----------
  async function loginUser(email: string, password: string) {
    const res = await fetch("http://localhost/backend/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return await res.json();
  }

  // ---------- PHP REGISTER API ----------
  async function registerUser(name: string, email: string, password: string) {
    const res = await fetch("http://localhost/backend/api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    return await res.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ---------- FORM VALIDATION ----------
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

   try {

  // ========== LOGIN ==========
  if (isLogin) {
    const result = await loginUser(email, password);

    if (!result.success) {
      toast.error(result.message || "Invalid email or password");
      setLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(result.user));
    login(result.user.name, result.user.email);

    toast.success("Login successful!");
    setTimeout(() => navigate("/"), 1000);
    return;
  }
 // ============ REGISTER (PHP Backend) ============
try {
  const res = await fetch("http://localhost/backend/api/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await res.json();

  if (!result.success) {
    toast.error(result.message || "Registration failed");
    setLoading(false);
    return;
  }

  toast.success("Account created successfully!");

  setTimeout(() => {
    setIsLogin(true); // switch to Login tab
  }, 1200);

} catch (err) {
  console.error(err);
  toast.error("Server error — please try again.");
} finally {
  setLoading(false);
}


  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>

            <CardDescription>
              {isLogin
                ? "Sign in to your GJ Fashion Store account"
                : "Join GJ Fashion Store today"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Create Account"}
              </Button>

              <p
                className="text-center text-sm cursor-pointer text-primary hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already registered? Login"}
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
