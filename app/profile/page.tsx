"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [copied, setCopied] = useState(false);

  const [userName, setUserName] = useState("Creator");
  const [userEmail, setUserEmail] = useState("");

  const [credits, setCredits] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [videosMade, setVideosMade] = useState(0);
  const [imagesMade, setImagesMade] = useState(0);
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [planName, setPlanName] = useState("Free");
  const [monthlyCreditLimit, setMonthlyCreditLimit] = useState(20);

  const usagePercent =
    monthlyCreditLimit > 0
      ? Math.min((creditsUsed / monthlyCreditLimit) * 100, 100)
      : 0;

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUserEmail(session.user.email || "");
      setUserName(session.user.user_metadata?.full_name || "Creator");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select(
          "full_name, email, credits, referral_code, videos_made, images_made, credits_used, plan_name, monthly_credit_limit"
        )
        .eq("id", session.user.id)
        .single();

      if (!profileError && profile) {
        setUserName(profile.full_name || "Creator");
        setUserEmail(profile.email || session.user.email || "");
        setCredits(profile.credits || 0);
        setReferralCode(profile.referral_code || "");
        setVideosMade(profile.videos_made || 0);
        setImagesMade(profile.images_made || 0);
        setCreditsUsed(profile.credits_used || 0);
        setPlanName(profile.plan_name || "Free");
        setMonthlyCreditLimit(profile.monthly_credit_limit || 20);
      }

      setCheckingAuth(false);
    }

    checkUser();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center animate-fade-in-up">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 animate-spin-slow mb-6 shadow-2xl shadow-purple-500/30"></div>
          <p className="text-gray-300">Checking your account...</p>
        </div>
      </div>
    );
  }

  function copyReferralCode() {
    if (!referralCode) return;

    navigator.clipboard.writeText(referralCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl bg-black/70">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />

          <div>
            <h1 className="text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">User Profile</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/dashboard">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Dashboard
            </button>
          </Link>

          <Link href="/generate">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
              Generate
            </button>
          </Link>

          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm md:text-base rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 py-10">
        {/* Profile Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/50 to-pink-900/25 border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10 animate-fade-in-up">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.18),transparent_35%)]"></div>
          <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-pink-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-pink-500/40 blur-2xl animate-pulse"></div>

              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-4xl font-black shadow-lg shadow-purple-500/30 animate-float-small">
                {initials || "C"}
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-5">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
                Creator Account
              </div>

              <h2 className="text-4xl md:text-5xl font-black">
                Creator Profile
              </h2>

              <p className="text-gray-300 mt-3 max-w-2xl">
                Manage your YumeMotion account, credits, referral rewards, and
                creator plan.
              </p>
            </div>
          </div>
        </section>

        {/* Plan Card */}
        <section className="mt-8 rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-7 shadow-2xl shadow-purple-500/10 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-gray-400">Current Plan</p>
              <h3 className="text-4xl font-black mt-2">{planName}</h3>
              <p className="text-gray-400 mt-2">
                {creditsUsed} / {monthlyCreditLimit} credits used
              </p>
            </div>

            <Link href="/pricing">
              <button className="relative overflow-hidden px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30 group">
                <span className="relative z-10">Upgrade Plan</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
              </button>
            </Link>
          </div>

          <div className="mt-6">
            <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-purple-500/20">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-700"
                style={{ width: `${usagePercent}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7 backdrop-blur-xl hover:-translate-y-2 hover:border-pink-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 animate-fade-in-up">
            <p className="text-gray-400">Available Credits</p>
            <h3 className="text-5xl font-black mt-4">{credits}</h3>
            <p className="text-purple-300 mt-4 text-sm">Ready to create</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7 backdrop-blur-xl hover:-translate-y-2 hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 animate-fade-in-up">
            <p className="text-gray-400">Images Created</p>
            <h3 className="text-5xl font-black mt-4">{imagesMade}</h3>
            <p className="text-cyan-300 mt-4 text-sm">Anime image outputs</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7 backdrop-blur-xl hover:-translate-y-2 hover:border-purple-400/50 transition-all duration-300 shadow-lg shadow-purple-500/5 animate-fade-in-up">
            <p className="text-gray-400">Videos Created</p>
            <h3 className="text-5xl font-black mt-4">{videosMade}</h3>
            <p className="text-pink-300 mt-4 text-sm">Anime video outputs</p>
          </div>
        </section>

        {/* Profile Info */}
        <section className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5 animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-6">Account Details</h3>

            <div className="space-y-5">
              <div>
                <p className="text-gray-400 text-sm mb-2">Full Name</p>
                <input
                  type="text"
                  value={userName}
                  readOnly
                  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                />
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Email Address</p>
                <input
                  type="email"
                  value={userEmail}
                  readOnly
                  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                />
              </div>

              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30">
                Profile Connected
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5 animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-6">Credit Wallet</h3>

            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6 hover:border-pink-500/40 transition-all">
              <p className="text-gray-400">Available Credits</p>
              <h4 className="text-5xl font-black mt-3">{credits}</h4>
            </div>

            <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-6 hover:border-purple-400/50 transition-all">
              <p className="text-gray-400">Total Usage</p>
              <h4 className="text-4xl font-black mt-3">
                {creditsUsed} Credits Used
              </h4>

              <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden mt-5 border border-purple-500/20">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-700"
                  style={{ width: `${usagePercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Referral */}
        <section className="mt-10 rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10 animate-fade-in-up">
          <h3 className="text-3xl font-bold">🎁 Your Referral Code</h3>

          <p className="text-gray-300 mt-4">
            Share this code with friends. When they sign up, both of you earn
            bonus credits.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="px-6 py-4 rounded-2xl bg-black/40 border border-purple-500/20 text-xl tracking-widest font-bold shadow-lg shadow-purple-500/10">
              {referralCode || "Loading..."}
            </div>

            <button
              onClick={copyReferralCode}
              className="relative overflow-hidden px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30 group"
            >
              <span className="relative z-10">
                {copied ? "Copied!" : "Copy Code"}
              </span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
            </button>
          </div>
        </section>
      </main>

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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out both;
        }

        .animate-float-small {
          animation: float-small 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 2.8s linear infinite;
        }
      `}</style>
    </div>
  );
}