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
      glow: "from-purple-500/15 to-pink-500/10",
      border: "border-purple-500/20",
      icon: "🌙",
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
      glow: "from-pink-500/15 to-purple-500/10",
      border: "border-pink-500/25",
      icon: "✨",
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
      glow: "from-pink-500/25 to-purple-600/20",
      border: "border-purple-400",
      icon: "🚀",
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
      glow: "from-cyan-500/15 to-purple-600/10",
      border: "border-cyan-500/25",
      icon: "👑",
    },
  ];

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
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />

          <div>
            <h1 className="text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">Pricing</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Link href="/dashboard">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Dashboard
            </button>
          </Link>

          <Link href="/signup">
            <button className="relative overflow-hidden px-4 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-purple-500/30 group">
              <span className="relative z-10">Start Free</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 py-14">
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6 shadow-lg shadow-purple-500/10">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            Credit-Based AI Anime Creation
          </div>

          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 animate-gradient">
              Creator Plan
            </span>
          </h2>

          <p className="text-gray-300 mt-6 text-lg">
            Start free, earn bonus credits through referrals, and upgrade when
            you need more anime image and video generations.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-14">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-7 border backdrop-blur-xl bg-gradient-to-b ${plan.glow} ${
                plan.border
              } hover:-translate-y-3 transition-all duration-300 shadow-2xl ${
                plan.highlighted
                  ? "shadow-purple-500/30 scale-[1.03]"
                  : "shadow-purple-500/5"
              } animate-fade-in-up`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-sm font-bold shadow-lg shadow-purple-500/30 animate-float-small">
                  Most Popular
                </div>
              )}

              <div className="absolute -right-5 -top-5 w-24 h-24 rounded-full bg-white/5 blur-2xl"></div>

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-black/40 border border-purple-500/20 flex items-center justify-center text-3xl mb-6">
                  {plan.icon}
                </div>

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
                    className={`relative overflow-hidden w-full mt-8 py-4 rounded-2xl font-semibold transition-all group ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] shadow-lg shadow-purple-500/30"
                        : "bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/50"
                    }`}
                  >
                    <span className="relative z-10">{plan.button}</span>
                    {plan.highlighted && (
                      <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                    )}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Safety Note */}
        <section className="mt-14 rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 animate-fade-in-up">
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold">
                Built To Protect Creator Credits
              </h3>

              <p className="text-gray-300 mt-4">
                Every generation uses credits so users understand the value of
                AI creation. Video tools cost more credits because video APIs
                are more expensive than image generation.
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 border border-purple-500/20 p-6 text-center">
              <p className="text-4xl mb-3 animate-float-small">🛡️</p>
              <p className="text-purple-300 font-semibold">
                No unlimited generation
              </p>
            </div>
          </div>
        </section>

        {/* Credit Info */}
        <section className="mt-14 rounded-3xl bg-white/5 border border-purple-500/20 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5 animate-fade-in-up">
          <h3 className="text-3xl font-bold">How Credits Work</h3>

          <div className="grid gap-5 mt-6">
            <div className="rounded-3xl bg-gradient-to-r from-pink-500/15 to-purple-600/10 border border-pink-500/30 p-7 shadow-lg shadow-pink-500/10 hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-pink-300 text-sm font-semibold">
                    🎨 Anime Image
                  </p>
                  <h4 className="text-4xl font-black mt-2">2 Credits</h4>
                </div>
                <span className="text-4xl animate-float-small">✨</span>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-purple-500/15 to-blue-600/10 border border-purple-500/30 p-7 shadow-lg shadow-purple-500/10 hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">
                    🖼️ Photo → Anime Video
                  </p>
                  <h4 className="text-4xl font-black mt-2">40 Credits</h4>
                </div>
                <span className="text-4xl animate-float-small">🎬</span>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-cyan-500/15 to-purple-600/10 border border-cyan-500/30 p-7 shadow-lg shadow-cyan-500/10 hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-cyan-300 text-sm font-semibold">
                    ✍️ Text → Anime Video
                  </p>
                  <h4 className="text-4xl font-black mt-2">80 Credits</h4>
                </div>
                <span className="text-4xl animate-float-small">⚡</span>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-yellow-500/15 to-pink-600/10 border border-yellow-500/30 p-7 shadow-lg shadow-yellow-500/10 hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-yellow-300 text-sm font-semibold">
                    🎁 Referral Bonus
                  </p>
                  <h4 className="text-4xl font-black mt-2">+5 Credits</h4>
                </div>
                <span className="text-4xl animate-float-small">🚀</span>
              </div>
            </div>
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