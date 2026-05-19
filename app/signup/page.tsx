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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-xl bg-white/5 border border-purple-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
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
          Create Your Account
        </h2>

        <p className="text-gray-400 mb-10">
          Start generating anime videos with cinematic AI.
        </p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
          />

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

          <div>
            <input
              type="text"
              placeholder="Referral Code (Optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            />

            <p className="text-sm text-purple-300 mt-2">
              +5 bonus credits if referral code is valid
            </p>
          </div>

          {message && (
            <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4 text-purple-200">
              {message}
            </div>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Free Account"}
          </button>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}