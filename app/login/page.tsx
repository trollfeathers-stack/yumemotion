"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Login successful!");

    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-lg bg-white/5 border border-purple-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-14 h-14 object-contain"
          />

          <div>
            <h1 className="text-3xl font-bold">YumeMotion</h1>
            <p className="text-gray-400 text-sm">AI Anime Video Platform</p>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black mb-3">
          Welcome Back
        </h2>

        <p className="text-gray-400 mb-10">
          Login to continue creating anime images and videos.
        </p>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
          />

          {message && (
            <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4 text-purple-200">
              {message}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-purple-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}