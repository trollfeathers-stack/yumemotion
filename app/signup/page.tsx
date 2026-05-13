"use client";
import Link from "next/link";
export default function SignupPage() {
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
            <p className="text-gray-400 text-sm">
              AI Anime Video Platform
            </p>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-black mb-3">
          Create Your Account
        </h2>

        <p className="text-gray-400 mb-10">
          Start generating anime videos with cinematic AI.
        </p>

        {/* Form */}
        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
          />

          <div>
            <input
              type="text"
              placeholder="Referral Code (Optional)"
              className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
            />

            <p className="text-sm text-purple-300 mt-2">
              +5 bonus credits if referral code is valid
            </p>
          </div>

          <Link href="/success">

  <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30">
    Create Free Account
  </button>
</Link>

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