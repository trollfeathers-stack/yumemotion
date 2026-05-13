"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20">
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/5 border border-purple-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-500/20 text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-5xl shadow-lg shadow-purple-500/30">
          ✨
        </div>

        <h1 className="text-4xl sm:text-5xl font-black mt-8">
          Welcome to YumeMotion
        </h1>

        <p className="text-gray-300 mt-4 text-lg">
          Your free creator account is ready. Start creating anime images and videos with AI.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mt-10">
          <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
            <p className="text-gray-400">Starting Credits</p>
            <h2 className="text-4xl font-black mt-3 text-purple-300">
              20
            </h2>
          </div>

          <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
            <p className="text-gray-400">Referral Bonus</p>
            <h2 className="text-4xl font-black mt-3 text-pink-300">
              +5
            </h2>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-6">
          <p className="text-gray-300">
            You can now open your dashboard, check your credits, and begin generating anime content.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30">
              Open dashboard
            </button>
          </Link>

          <Link href="/generate">
            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Start Generating
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}