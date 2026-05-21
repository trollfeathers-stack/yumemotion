"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup() {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          referral_code: referralCode,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      let startingCredits = 20;
      let referrerId: string | null = null;
      let referrerCredits = 0;

      if (referralCode.trim()) {
        const { data: referrerProfile, error: referralError } = await supabase
          .from("profiles")
          .select("id, credits")
          .eq("referral_code", referralCode.trim())
          .single();

        if (referralError || !referrerProfile) {
          setMessage("Invalid referral code. Please check the code and try again.");
          setLoading(false);
          return;
        }

        referrerId = referrerProfile.id;
        referrerCredits = referrerProfile.credits || 0;
        startingCredits = 25;
      }

      const newReferralCode =
        "YUME-" + Math.random().toString(36).substring(2, 12).toUpperCase();

      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        full_name: fullName,
        email: email,
        credits: startingCredits,
        referral_code: newReferralCode,
        videos_made: 0,
        images_made: 0,
        credits_used: 0,
        plan_name: "Free",
        monthly_credit_limit: 20,
      });

      if (profileError) {
        setMessage(profileError.message);
        setLoading(false);
        return;
      }

      if (referrerId) {
        await supabase
          .from("profiles")
          .update({
            credits: referrerCredits + 5,
          })
          .eq("id", referrerId);

        await supabase.from("referrals").insert({
          referrer_id: referrerId,
          referred_user_id: user.id,
          referral_code: referralCode.trim(),
          bonus_credits: 5,
        });
      }
    }

    setMessage("Account created successfully!");
    setLoading(false);

    setTimeout(() => {
      router.push("/success");
    }, 1000);
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

      <div className="relative z-10 w-full max-w-xl bg-white/5 border border-purple-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-500/20 animate-fade-in-up">
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
            New Creator Account
          </div>

          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Create Your Account
          </h2>

          <p className="text-gray-400 mb-10">
            Start with free credits and build anime images, videos, and creator visuals.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-2xl bg-black/30 border border-purple-500/20 p-4 text-center">
              <p className="text-2xl">🎨</p>
              <p className="text-xs text-gray-400 mt-1">Images</p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-purple-500/20 p-4 text-center">
              <p className="text-2xl">🎬</p>
              <p className="text-xs text-gray-400 mt-1">Videos</p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-purple-500/20 p-4 text-center">
              <p className="text-2xl">🎁</p>
              <p className="text-xs text-gray-400 mt-1">Referrals</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-400 mb-2">Full Name</p>
              <input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
              />
            </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
              />
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Referral Code</p>
              <input
                type="text"
                placeholder="Optional referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
              />

              <p className="text-sm text-purple-300 mt-2">
                +5 bonus credits if referral code is valid
              </p>
            </div>

            {message && (
              <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4 text-purple-200 animate-fade-in-up">
                {message}
              </div>
            )}

            <button
              onClick={handleSignup}
              disabled={loading}
              className="relative overflow-hidden w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <span className="relative z-10">
                {loading ? "Creating Account..." : "Create Free Account"}
              </span>

              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
            </button>

            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 hover:text-pink-300 transition-all">
                Login
              </Link>
            </p>

            <div className="rounded-2xl bg-black/30 border border-purple-500/20 p-5">
              <p className="text-sm text-purple-300 font-semibold">
                Free account includes
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-3">
                  <p className="text-gray-300 text-sm">20 starter credits</p>
                </div>

                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-3">
                  <p className="text-gray-300 text-sm">Referral bonuses</p>
                </div>

                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-3">
                  <p className="text-gray-300 text-sm">Anime image tools</p>
                </div>

                <div className="rounded-xl bg-white/5 border border-purple-500/20 p-3">
                  <p className="text-gray-300 text-sm">Creator dashboard</p>
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