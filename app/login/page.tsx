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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white/5 border border-purple-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-500/20 animate-fade-in-up">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 mb-8 group">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-14 h-14 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />

          <div>
            <h1 className="text-3xl font-bold">YumeMotion</h1>
            <p className="text-gray-400 text-sm">AI Anime Video Platform</p>
          </div>
        </Link>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            Creator Login
          </div>

          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Welcome Back
          </h2>

          <p className="text-gray-400 mb-10">
            Login to continue creating anime images and videos.
          </p>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-400 mb-2">Email Address</p>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
              />
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Password</p>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
              />
            </div>

            {message && (
              <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4 text-purple-200 animate-fade-in-up">
                {message}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="relative overflow-hidden w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <span className="relative z-10">
                {loading ? "Logging In..." : "Login"}
              </span>

              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
            </button>

            <p className="text-center text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-purple-400 hover:text-pink-300 transition-all">
                Sign Up
              </Link>
            </p>

            <div className="rounded-2xl bg-black/30 border border-purple-500/20 p-5">
              <p className="text-sm text-purple-300 font-semibold">
                What you get after login
              </p>

              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-3">
                  <p className="text-2xl">🎨</p>
                  <p className="text-xs text-gray-400 mt-1">Images</p>
                </div>

                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-3">
                  <p className="text-2xl">🎬</p>
                  <p className="text-xs text-gray-400 mt-1">Videos</p>
                </div>

                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-3">
                  <p className="text-2xl">🎁</p>
                  <p className="text-xs text-gray-400 mt-1">Rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out both;
        }
      `}</style>
    </div>
  );
}