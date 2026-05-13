"use client";

import Link from "next/link";
import { useState } from "react";
export default function ProfilePage() {
    const referralCode = "YUME-X9K7Q2M8P4";
  const [copied, setCopied] = useState(false);

  function copyReferralCode() {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl">
        <Link href="/dashboard" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">User Profile</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/dashboard">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Dashboard
            </button>
          </Link>

          <Link href="/">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all">
              Sign Out
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 py-10">
        {/* Profile Header */}
        <section className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/30 border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-4xl font-black shadow-lg shadow-purple-500/30">
              YM
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-4xl font-black">Creator Profile</h2>
              <p className="text-gray-300 mt-3">
                Manage your YumeMotion account, credits, and referral rewards.
              </p>
            </div>
          </div>
        </section>

        {/* Profile Info */}
        <section className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl">
            <h3 className="text-3xl font-bold mb-6">Account Details</h3>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 text-sm mb-2">Full Name</p>
                <input
                  type="text"
                  defaultValue="Creator"
                  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Email Address</p>
                <input
                  type="email"
                  defaultValue="creator@yumemotion.com"
                  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
                />
              </div>

              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30">
                Save Changes
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl">
            <h3 className="text-3xl font-bold mb-6">Credit Wallet</h3>

            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
              <p className="text-gray-400">Available Credits</p>
              <h4 className="text-5xl font-black mt-3">125</h4>
            </div>

            <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-6">
              <p className="text-gray-400">Monthly Usage</p>
              <h4 className="text-4xl font-black mt-3">75 / 200</h4>

              <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden mt-5">
                <div className="h-full w-[40%] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Referral */}
        <section className="mt-10 rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-8">
          <h3 className="text-3xl font-bold">🎁 Your Referral Code</h3>

          <p className="text-gray-300 mt-4">
            Share this code with friends. When they sign up, both of you earn bonus credits.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="px-6 py-4 rounded-2xl bg-black/40 border border-purple-500/20 text-xl tracking-widest font-bold">
              {referralCode}
            </div>

            <button
  onClick={copyReferralCode}
  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30"
>
  {copied ? "Copied!" : "Copy Code"}
</button>
          </div>
        </section>
      </main>
    </div>
  );
}