import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { auth, db } from "@/lib/firebase";

import { signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         updateProfile } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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

      toast.success("Login successful");
      console.log("LOGIN USER", userCred.user.uid);

    } else {
      // REGISTER
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save display name
      await updateProfile(userCred.user, { displayName: name });

      // Store user in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString()
      });

      toast.success("Account created");
      console.log("REGISTER USER", userCred.user.uid);
    }

  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
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
