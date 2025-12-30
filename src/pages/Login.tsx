import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { auth, db } from "@/lib/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (isLogin) {
        // LOGIN USER
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        toast.success("Welcome back 👋");
        navigate("/");
      } else {
        // REGISTER USER
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Add display name to Firebase user profile
        await updateProfile(userCred.user, { displayName: name });

        // Save user in Firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
          name,
          email,
          createdAt: new Date(),
        });

        toast.success("Account created 🎉");
        navigate("/");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-3xl font-bold text-center">
        {isLogin ? "Login" : "Create Account"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {!isLogin && (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />
        )}

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p
          className="text-center text-sm cursor-pointer text-blue-600"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already registered? Login"}
        </p>
      </form>
    </div>
  );
}
