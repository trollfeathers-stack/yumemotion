"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-white/5 border border-purple-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-500/20 text-center animate-fade-in-up">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-5xl shadow-lg shadow-purple-500/30 animate-float-small">
            ✨
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mt-8">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            Account Created
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mt-6">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 animate-gradient">
              YumeMotion
            </span>
          </h1>

          <p className="text-gray-300 mt-4 text-lg">
            Your free creator account is ready. Start creating anime images and
            videos with AI.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6 hover:-translate-y-2 hover:border-purple-400/50 transition-all">
              <p className="text-gray-400">Starting Credits</p>
              <h2 className="text-4xl font-black mt-3 text-purple-300">20</h2>
            </div>

            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6 hover:-translate-y-2 hover:border-pink-500/40 transition-all">
              <p className="text-gray-400">Referral Bonus</p>
              <h2 className="text-4xl font-black mt-3 text-pink-300">+5</h2>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-6">
            <p className="text-gray-300">
              You can now open your dashboard, check your credits, and begin
              generating anime content.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <button className="relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30 group">
                <span className="relative z-10">Open Dashboard</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
              </button>
            </Link>

            <Link href="/generate">
              <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
                Start Generating
              </button>
            </Link>
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

        @keyframes float-small {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out both;
        }

        .animate-float-small {
          animation: float-small 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 250% 250%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}