"use client";

import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      subtitle: "For testing YumeMotion",
      credits: "20 credits",
      features: [
        "Anime image generation",
        "Basic anime styles",
        "Limited downloads",
        "Referral bonus support",
      ],
      button: "Start Free",
      link: "/signup",
      highlighted: false,
    },
    {
      name: "Starter",
      price: "$4.99",
      subtitle: "For casual creators",
      credits: "300 credits/month",
      features: [
        "Everything in Free",
        "More anime styles",
        "Faster generation",
        "Image + video creation",
      ],
      button: "Upgrade Starter",
      link: "/dashboard",
      highlighted: false,
    },
    {
      name: "Creator",
      price: "$9.99",
      subtitle: "Best for Shorts creators",
      credits: "1,000 credits/month",
      features: [
        "Everything in Starter",
        "Priority generation",
        "HD anime video exports",
        "Creator dashboard analytics",
      ],
      button: "Choose Creator",
      link: "/dashboard",
      highlighted: true,
    },
    {
      name: "Pro",
      price: "$19.99",
      subtitle: "For serious AI anime creators",
      credits: "2,500 credits/month",
      features: [
        "Everything in Creator",
        "Premium video effects",
        "Commercial usage support",
        "Early access to new tools",
      ],
      button: "Go Pro",
      link: "/dashboard",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
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
            <h1 className="text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">Pricing</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/dashboard">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Dashboard
            </button>
          </Link>

          <Link href="/signup">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
              Start Free
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 py-14">
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
            Credit-Based AI Anime Creation
          </div>

          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              Creator Plan
            </span>
          </h2>

          <p className="text-gray-300 mt-6 text-lg">
            Start free, earn bonus credits through referrals, and upgrade when you need more anime image and video generations.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-14">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-7 border backdrop-blur-xl ${
                plan.highlighted
                  ? "bg-gradient-to-b from-purple-900/60 to-pink-900/20 border-purple-400 shadow-2xl shadow-purple-500/20 scale-[1.02]"
                  : "bg-white/5 border-purple-500/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-sm font-bold shadow-lg shadow-purple-500/30">
                  Most Popular
                </div>
              )}

              <h3 className="text-3xl font-black mt-4">{plan.name}</h3>
              <p className="text-gray-400 mt-2">{plan.subtitle}</p>

              <div className="mt-8">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="text-gray-400"> / month</span>
              </div>

              <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-4">
                <p className="text-purple-300 font-bold">{plan.credits}</p>
              </div>

              <ul className="mt-7 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-gray-300">
                    <span className="text-purple-400">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.link}>
                <button
                  className={`w-full mt-8 py-4 rounded-2xl font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] shadow-lg shadow-purple-500/30"
                      : "bg-white/5 border border-purple-500/20 hover:bg-white/10"
                  }`}
                >
                  {plan.button}
                </button>
              </Link>
            </div>
          ))}
        </section>

        {/* Credit Info */}
        <section className="mt-14 rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl">
          <h3 className="text-3xl font-bold">How Credits Work</h3>

          <div className="grid gap-5 mt-6">
  <div className="rounded-3xl bg-gradient-to-r from-pink-500/15 to-purple-600/10 border border-pink-500/30 p-7 shadow-lg shadow-pink-500/10">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-pink-300 text-sm font-semibold">🎨 Anime Image</p>
        <h4 className="text-4xl font-black mt-2">2 Credits</h4>
      </div>
      <span className="text-4xl">✨</span>
    </div>
  </div>

  <div className="rounded-3xl bg-gradient-to-r from-purple-500/15 to-blue-600/10 border border-purple-500/30 p-7 shadow-lg shadow-purple-500/10">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-purple-300 text-sm font-semibold">🖼️ Photo → Anime Video</p>
        <h4 className="text-4xl font-black mt-2">40 Credits</h4>
      </div>
      <span className="text-4xl">🎬</span>
    </div>
  </div>

  <div className="rounded-3xl bg-gradient-to-r from-cyan-500/15 to-purple-600/10 border border-cyan-500/30 p-7 shadow-lg shadow-cyan-500/10">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-cyan-300 text-sm font-semibold">✍️ Text → Anime Video</p>
        <h4 className="text-4xl font-black mt-2">80 Credits</h4>
      </div>
      <span className="text-4xl">⚡</span>
    </div>
  </div>

  <div className="rounded-3xl bg-gradient-to-r from-yellow-500/15 to-pink-600/10 border border-yellow-500/30 p-7 shadow-lg shadow-yellow-500/10">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-yellow-300 text-sm font-semibold">🎁 Referral Bonus</p>
        <h4 className="text-4xl font-black mt-2">+5 Credits</h4>
      </div>
      <span className="text-4xl">🚀</span>
    </div>
  </div>
</div>
        </section>
      </main>
    </div>
  );
}