"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export default function DashboardPage() {
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
  .select("full_name, email, credits, referral_code, videos_made, images_made, credits_used, plan_name, monthly_credit_limit")
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 animate-pulse mb-6"></div>
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
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl">

        <Link href="/" className="flex items-center gap-3">
  <img
    src="/logo.png"
    alt="YumeMotion Logo"
    className="w-12 h-12 object-contain"
  />

  <div>
    <h1 className="text-2xl font-bold">
      YumeMotion
    </h1>

    <p className="text-xs text-gray-400">
      Creator Dashboard
    </p>
  </div>
</Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">

  <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">  
    {credits} Credits
  </div>

<div className="text-xs md:text-sm text-gray-400 max-w-[180px] truncate">
  {userEmail}
</div>

  <Link href="/generate">
    <button className="px-4 md:px-4 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
      Generate
    </button>
  </Link>


  <Link href="/profile">
    <button className="px-4 md:px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
      Profile
    </button>
  </Link>

  <button
  onClick={handleSignOut}
  className="px-4 md:px-4 py-2 text-sm md:text-base rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all"
>
  Sign Out
</button>

</div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 py-10">

        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/30 border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>
              <h2 className="text-4xl font-black">
                Good Morning, {userName} 👋
              </h2>

              <div className="mt-4">
  <p className="text-gray-300 text-lg">
    You have {credits} credits remaining.
  </p>

  <p className="text-purple-300 mt-2">
    Current Plan: {planName}
  </p>
</div>
</div>

            <Link href="/pricing">
  <button className="px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30">
    Upgrade Plan
  </button>
</Link>

          </div>

          {/* Progress */}
          <div className="mt-10">

            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Credits Used This Month</span>
              <span>{creditsUsed} / {monthlyCreditLimit} Credits Used</span>
            </div>

            <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden">

              <div className="h-full w-[40%] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>

            </div>
          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7 backdrop-blur-xl">
            <p className="text-gray-400">
              Videos Created
            </p>

            <h3 className="text-5xl font-black mt-4">
              {videosMade}
            </h3>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7 backdrop-blur-xl">
            <p className="text-gray-400">
              Images Created
            </p>

            <h3 className="text-5xl font-black mt-4">
              {imagesMade}
            </h3>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-7 backdrop-blur-xl">
            <p className="text-gray-400">
              Credits Used
            </p>

            <h3 className="text-5xl font-black mt-4">
              {creditsUsed}
            </h3>
          </div>

          

        </div>

        {/* Create Shortcut */}
<div className="mt-10 rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-8 backdrop-blur-xl">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
    <div>
      <h3 className="text-3xl font-bold">
        Start Creating Anime Content
      </h3>

      <p className="text-gray-300 mt-3 max-w-2xl">
        Generate anime images, cinematic videos, character scenes, and motion effects from one powerful creator page.
      </p>
    </div>

    <Link href="/generate">
      <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30">
        Open Generator
      </button>
    </Link>
  </div>

  <div className="grid md:grid-cols-3 gap-6 mt-8">
    <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
      <p className="text-4xl mb-4">🎨</p>
      <h4 className="text-xl font-bold">Anime Images</h4>
      <p className="text-gray-400 mt-2">Create characters, backgrounds, and action poses.</p>
    </div>

    <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
      <p className="text-4xl mb-4">🎬</p>
      <h4 className="text-xl font-bold">Anime Videos</h4>
      <p className="text-gray-400 mt-2">Turn anime ideas into cinematic short-form videos.</p>
    </div>

    <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6">
      <p className="text-4xl mb-4">⚡</p>
      <h4 className="text-xl font-bold">Motion Effects</h4>
      <p className="text-gray-400 mt-2">Add rain, camera movement, aura, walking, and glow effects.</p>
    </div>
  </div>
</div>

        {/* Referral Section */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-8">

          <h3 className="text-3xl font-bold">
            🎁 Referral Rewards
          </h3>

          <p className="text-gray-300 mt-4">
            Invite your friends and earn bonus credits together.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">

            <div className="px-6 py-4 rounded-2xl bg-black/40 border border-purple-500/20 text-xl tracking-widest font-bold">
              {referralCode}
            </div>

            <button
  onClick={copyReferralCode}
  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30"
>
  {copied ? "Copied!" : "Copy Referral Code"}
</button>

          </div>

        </div>

      </main>
    </div>
  );
}