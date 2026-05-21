"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ToolKey =
  | "anime-image"
  | "photo-anime-video"
  | "text-anime-video"
  | "prompt-enhancer"
  | "hd-upscale"
  | "background-remover"
  | "thumbnail-generator";

type Tool = {
  key: ToolKey;
  label: string;
  icon: string;
  category: "Create" | "Edit";
  credits: number;
  description: string;
  placeholder: string;
  requiresUpload?: boolean;
  paidOnly?: boolean;
};

type HistoryItem = {
  id: string;
  tool: string;
  cost: number;
  result: string;
};

const tools: Tool[] = [
  {
    key: "anime-image",
    label: "Anime Image",
    icon: "🎨",
    category: "Create",
    credits: 2,
    description:
      "Generate anime characters, scenes, backgrounds, and creator-ready visuals from text prompts.",
    placeholder:
      "Example: cool anime boy standing in neon Tokyo rain, cinematic lighting, detailed background...",
  },
  {
    key: "photo-anime-video",
    label: "Photo → Anime Video",
    icon: "🖼️",
    category: "Create",
    credits: 40,
    description:
      "Turn a still image into an anime-style animated video scene with motion and camera effects.",
    placeholder:
      "Describe motion: blinking eyes, hair moving, camera push-in, glowing aura, rain atmosphere...",
    requiresUpload: true,
    paidOnly: true,
  },
  {
    key: "text-anime-video",
    label: "Text → Anime Video",
    icon: "🎬",
    category: "Create",
    credits: 80,
    description:
      "Generate a full anime-style video concept from a text scene description.",
    placeholder:
      "Example: anime hero walking through a futuristic neon city at night, rain, glowing sword, cinematic camera motion...",
    paidOnly: true,
  },
  {
    key: "prompt-enhancer",
    label: "Prompt Enhancer",
    icon: "✨",
    category: "Create",
    credits: 1,
    description: "Turn a simple idea into a stronger, detailed anime prompt.",
    placeholder: "Example: cool boy in rain",
  },
  {
    key: "hd-upscale",
    label: "HD Upscale",
    icon: "🔍",
    category: "Edit",
    credits: 4,
    description: "Improve anime image clarity and upscale it for sharper output.",
    placeholder: "Optional: describe what quality you want improved...",
    requiresUpload: true,
  },
  {
    key: "background-remover",
    label: "Background Remover",
    icon: "🧼",
    category: "Edit",
    credits: 3,
    description:
      "Remove the background from an anime image and keep the subject clean.",
    placeholder: "Optional: transparent PNG anime character",
    requiresUpload: true,
  },
  {
    key: "thumbnail-generator",
    label: "Thumbnail Generator",
    icon: "🖼️",
    category: "Edit",
    credits: 6,
    description:
      "Create anime-style YouTube thumbnails, Shorts covers, and creator visuals.",
    placeholder:
      "Example: anime reaction thumbnail, bold composition, dramatic face expression, colorful background...",
  },
];

export default function GeneratePage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sessionUserId, setSessionUserId] = useState("");
  const [selectedTool, setSelectedTool] = useState<ToolKey>("anime-image");

  const [userName, setUserName] = useState("Creator");
  const [planName, setPlanName] = useState("Free");
  const [credits, setCredits] = useState(0);
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [imagesMade, setImagesMade] = useState(0);
  const [videosMade, setVideosMade] = useState(0);

  const [prompt, setPrompt] = useState("");
  const [animeStyle, setAnimeStyle] = useState("Cyberpunk Anime");
  const [aspectRatio, setAspectRatio] = useState("Portrait 9:16");
  const [quality, setQuality] = useState("Standard");

  const [motionStyle, setMotionStyle] = useState("Cinematic");
  const [videoDuration, setVideoDuration] = useState("5 seconds");
  const [cameraMovement, setCameraMovement] = useState("Slow Push In");

  const [sceneType, setSceneType] = useState("Cinematic Scene");
  const [animationMood, setAnimationMood] = useState("Dramatic");

  const [isRunning, setIsRunning] = useState(false);
  const [notice, setNotice] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const currentTool =
    tools.find((tool) => tool.key === selectedTool) || tools[0];

  const createTools = tools.filter((tool) => tool.category === "Create");
  const editTools = tools.filter((tool) => tool.category === "Edit");

  const toolLocked =
    planName === "Free" &&
    (currentTool.key === "photo-anime-video" ||
      currentTool.key === "text-anime-video");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setSessionUserId(session.user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select(
          "full_name, email, credits, credits_used, images_made, videos_made, plan_name"
        )
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUserName(
          profile.full_name ||
            session.user.user_metadata?.full_name ||
            "Creator"
        );
        setPlanName(profile.plan_name || "Free");
        setCredits(profile.credits || 0);
        setCreditsUsed(profile.credits_used || 0);
        setImagesMade(profile.images_made || 0);
        setVideosMade(profile.videos_made || 0);
      }

      const { data: savedGenerations } = await supabase
        .from("generations")
        .select("id, type, title, cost")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (savedGenerations) {
        setHistory(
          savedGenerations.map((item) => ({
            id: item.id,
            tool: item.title,
            cost: item.cost,
            result: `${item.title} completed successfully.`,
          }))
        );
      }

      setCheckingAuth(false);
    }

    checkUser();
  }, [router]);

  function selectTool(toolKey: ToolKey) {
    const newTool = tools.find((tool) => tool.key === toolKey);

    setSelectedTool(toolKey);
    setPrompt("");
    setResultMessage("");
    setNotice("");
    setEnhancedPrompt("");

    if (newTool?.paidOnly && planName === "Free") {
      setNotice("This tool is available only on paid plans.");
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function finishRun(tool: Tool) {
    const newCredits = credits - tool.credits;
    const newCreditsUsed = creditsUsed + tool.credits;

    let newImagesMade = imagesMade;
    let newVideosMade = videosMade;

    if (tool.key === "anime-image" || tool.key === "thumbnail-generator") {
      newImagesMade += 1;
    }

    if (tool.key === "photo-anime-video" || tool.key === "text-anime-video") {
      newVideosMade += 1;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        credits: newCredits,
        credits_used: newCreditsUsed,
        images_made: newImagesMade,
        videos_made: newVideosMade,
      })
      .eq("id", sessionUserId);

    if (profileError) {
      setNotice(profileError.message);
      setIsRunning(false);
      return;
    }

    const title = tool.label;

    const { data: newGeneration } = await supabase
      .from("generations")
      .insert({
        user_id: sessionUserId,
        type: tool.key,
        title,
        cost: tool.credits,
      })
      .select("id, type, title, cost")
      .single();

    setCredits(newCredits);
    setCreditsUsed(newCreditsUsed);
    setImagesMade(newImagesMade);
    setVideosMade(newVideosMade);

    let message = `${tool.label} completed successfully.`;

    if (tool.key === "prompt-enhancer") {
      message = "Prompt enhanced successfully.";
    }

    if (tool.key === "photo-anime-video" || tool.key === "text-anime-video") {
      message = `${tool.label} generated successfully.`;
    }

    setResultMessage(message);

    setHistory((currentHistory) => [
      {
        id: newGeneration?.id || String(Date.now()),
        tool: title,
        cost: tool.credits,
        result: message,
      },
      ...currentHistory,
    ]);

    setIsRunning(false);
  }

  function handleRunTool() {
    setNotice("");
    setResultMessage("");
    setEnhancedPrompt("");

    if (!sessionUserId) {
      router.push("/login");
      return;
    }

    if (toolLocked) {
      setNotice("Upgrade your plan to unlock video tools.");
      return;
    }

    if (credits < currentTool.credits) {
      setNotice(
        `Not enough credits. ${currentTool.label} requires ${currentTool.credits} credits.`
      );
      return;
    }

    if (!currentTool.requiresUpload && prompt.trim() === "") {
      setNotice("Please enter a prompt first.");
      return;
    }

    if (currentTool.key === "photo-anime-video" && prompt.trim() === "") {
      setNotice(
        "Add a short motion description first, like: blinking eyes, hair moving, camera zoom in."
      );
      return;
    }

    setIsRunning(true);

    const selectedNow = currentTool;

    setTimeout(() => {
      if (selectedNow.key === "prompt-enhancer") {
        const improvedPrompt = `masterpiece, best quality, anime style, ${prompt}, cinematic lighting, detailed background, expressive character design, dramatic atmosphere, ultra detailed, clean composition`;
        setEnhancedPrompt(improvedPrompt);
      }

      finishRun(selectedNow);
    }, 2200);
  }

  async function clearHistory() {
    if (!sessionUserId) return;

    const { error } = await supabase
      .from("generations")
      .delete()
      .eq("user_id", sessionUserId);

    if (!error) {
      setHistory([]);
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center animate-fade-in-up">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 animate-spin-slow mb-6 shadow-2xl shadow-purple-500/30"></div>
          <p className="text-gray-300">Loading YumeMotion workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      <nav className="relative z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-purple-500/20 backdrop-blur-xl bg-black/70">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="YumeMotion Logo"
            className="w-11 h-11 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">YumeMotion</h1>
            <p className="text-xs text-gray-400">Creator Workspace</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <div className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 shadow-lg shadow-purple-500/10">
            {credits} Credits
          </div>

          <Link href="/dashboard">
            <button className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Dashboard
            </button>
          </Link>

          <Link href="/pricing">
            <button className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Pricing
            </button>
          </Link>

          <Link href="/profile">
            <button className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:border-purple-400/60 transition-all">
              Profile
            </button>
          </Link>

          <button
            onClick={handleSignOut}
            className="px-3 md:px-4 py-2 text-sm md:text-base rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="relative z-10 px-3 sm:px-4 md:px-8 py-4 md:py-6">
        {/* Android/Mobile Tool Selector */}
        <section className="lg:hidden mb-5 rounded-3xl bg-white/5 border border-purple-500/20 p-4 backdrop-blur-xl shadow-2xl shadow-purple-500/10 animate-fade-in-up">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-gray-400 text-xs">Mobile Workspace</p>
              <h2 className="text-xl font-black">Choose Tool</h2>
            </div>

            <div className="px-3 py-2 rounded-xl bg-black/40 border border-purple-500/20 text-xs text-purple-300">
              {planName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) => (
              <button
                key={tool.key}
                onClick={() => selectTool(tool.key)}
                className={`text-left p-3 rounded-2xl border transition-all ${
                  selectedTool === tool.key
                    ? "bg-gradient-to-r from-pink-500/25 to-purple-500/20 border-pink-500/50 shadow-lg shadow-pink-500/10"
                    : "bg-black/30 border-purple-500/20 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tool.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {tool.label}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {tool.credits} credits
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block rounded-3xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-xl shadow-2xl shadow-purple-500/10 animate-fade-in-left">
            <div className="mb-6">
              <p className="text-gray-400 text-sm">Workspace</p>
              <h2 className="text-2xl font-black mt-2">Generate Tools</h2>
              <p className="text-gray-400 text-sm mt-2">
                Pick a tool from the sidebar.
              </p>
            </div>

            <div className="mb-6 rounded-2xl bg-black/40 border border-purple-500/20 p-4 hover:border-purple-400/50 transition-all">
              <p className="text-sm text-gray-400">Logged in as</p>
              <h3 className="text-xl font-bold mt-2">{userName}</h3>
              <p className="text-purple-300 mt-2">Plan: {planName}</p>
            </div>

            <div>
              <p className="text-sm text-purple-300 font-semibold mb-3">
                Create
              </p>

              <div className="space-y-2">
                {createTools.map((tool) => (
                  <button
                    key={tool.key}
                    onClick={() => selectTool(tool.key)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      selectedTool === tool.key
                        ? "bg-gradient-to-r from-pink-500/25 to-purple-500/20 border-pink-500/50 shadow-lg shadow-pink-500/10 scale-[1.02]"
                        : "bg-black/30 border-purple-500/20 hover:bg-white/5 hover:translate-x-1 hover:border-purple-400/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xl ${
                            selectedTool === tool.key ? "animate-bounce-soft" : ""
                          }`}
                        >
                          {tool.icon}
                        </span>
                        <div>
                          <p className="font-semibold">{tool.label}</p>
                          <p className="text-xs text-gray-400">
                            {tool.credits} credits
                          </p>
                        </div>
                      </div>

                      {tool.paidOnly && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/20">
                          Paid
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-purple-300 font-semibold mb-3">
                Edit
              </p>

              <div className="space-y-2">
                {editTools.map((tool) => (
                  <button
                    key={tool.key}
                    onClick={() => selectTool(tool.key)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      selectedTool === tool.key
                        ? "bg-gradient-to-r from-pink-500/25 to-purple-500/20 border-pink-500/50 shadow-lg shadow-pink-500/10 scale-[1.02]"
                        : "bg-black/30 border-purple-500/20 hover:bg-white/5 hover:translate-x-1 hover:border-purple-400/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xl ${
                          selectedTool === tool.key ? "animate-bounce-soft" : ""
                        }`}
                      >
                        {tool.icon}
                      </span>
                      <div>
                        <p className="font-semibold">{tool.label}</p>
                        <p className="text-xs text-gray-400">
                          {tool.credits} credits
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="space-y-5 md:space-y-6 animate-fade-in-up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/50 to-pink-900/20 border border-purple-500/20 p-5 md:p-8 shadow-2xl shadow-purple-500/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.18),transparent_35%)]"></div>
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-pink-500/20 blur-3xl animate-pulse"></div>

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 md:gap-6">
                <div>
                  <p className="text-sm text-purple-300">Selected AI Tool</p>

                  <h2 className="text-3xl md:text-4xl font-black mt-2 flex items-center gap-3">
                    <span className="animate-bounce-soft">
                      {currentTool.icon}
                    </span>
                    {currentTool.label}
                  </h2>

                  <p className="text-gray-300 mt-4 max-w-2xl text-sm md:text-base">
                    {currentTool.description}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/40 border border-purple-500/20 px-5 py-4 md:px-6 md:py-5 min-w-[150px] hover:scale-105 transition-all">
                  <p className="text-sm text-gray-400">Credits Required</p>
                  <h3 className="text-3xl md:text-4xl font-black mt-2">
                    {currentTool.credits}
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-4 md:p-5 hover:-translate-y-1 hover:border-pink-500/40 transition-all">
                <p className="text-gray-400 text-xs md:text-sm">Credits</p>
                <h3 className="text-2xl md:text-3xl font-black mt-2">
                  {credits}
                </h3>
              </div>

              <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-4 md:p-5 hover:-translate-y-1 hover:border-purple-400/50 transition-all">
                <p className="text-gray-400 text-xs md:text-sm">Used</p>
                <h3 className="text-2xl md:text-3xl font-black mt-2">
                  {creditsUsed}
                </h3>
              </div>

              <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-4 md:p-5 hover:-translate-y-1 hover:border-cyan-400/40 transition-all">
                <p className="text-gray-400 text-xs md:text-sm">Images</p>
                <h3 className="text-2xl md:text-3xl font-black mt-2">
                  {imagesMade}
                </h3>
              </div>

              <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-4 md:p-5 hover:-translate-y-1 hover:border-pink-400/40 transition-all">
                <p className="text-gray-400 text-xs md:text-sm">Videos</p>
                <h3 className="text-2xl md:text-3xl font-black mt-2">
                  {videosMade}
                </h3>
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-5 md:p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {currentTool.label}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm md:text-base">
                    Configure your AI generation settings below.
                  </p>
                </div>

                {toolLocked && (
                  <button
                    onClick={() => router.push("/pricing")}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30"
                  >
                    Upgrade to Unlock
                  </button>
                )}
              </div>

              {currentTool.requiresUpload && (
                <div className="mt-7 md:mt-8 animate-fade-in-up">
                  <p className="text-sm text-gray-300 mb-3">Upload Image</p>

                  <div className="rounded-2xl border border-dashed border-purple-500/30 bg-black/30 p-6 md:p-8 text-center hover:border-pink-500/50 hover:bg-white/[0.04] transition-all">
                    <p className="text-4xl md:text-5xl mb-4 animate-float-small">
                      📤
                    </p>
                    <p className="text-base md:text-lg font-semibold">
                      Upload anime image or character image
                    </p>
                    <p className="text-gray-400 mt-2 text-sm md:text-base">
                      Upload support will be connected later for real AI processing.
                    </p>

                    <button className="mt-5 w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:scale-105 transition-all">
                      Choose Image
                    </button>
                  </div>
                </div>
              )}

              {currentTool.key === "anime-image" && (
                <div className="mt-7 md:mt-8 grid gap-4 md:grid-cols-3 animate-fade-in-up">
                  <div>
                    <p className="text-sm text-gray-300 mb-3">Anime Style</p>
                    <select
                      value={animeStyle}
                      onChange={(e) => setAnimeStyle(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>Cyberpunk Anime</option>
                      <option>Shonen Battle</option>
                      <option>Dark Fantasy</option>
                      <option>Romance Anime</option>
                      <option>School Anime</option>
                      <option>Samurai Anime</option>
                      <option>Neon City</option>
                      <option>Fantasy Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-300 mb-3">Aspect Ratio</p>
                    <select
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>Portrait 9:16</option>
                      <option>Square 1:1</option>
                      <option>Landscape 16:9</option>
                      <option>Story 4:5</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-300 mb-3">Quality</p>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>Standard</option>
                      <option>High Quality</option>
                      <option>Ultra Detail</option>
                    </select>
                  </div>
                </div>
              )}

              {currentTool.key === "photo-anime-video" && (
                <div className="mt-7 md:mt-8 grid gap-4 md:grid-cols-3 animate-fade-in-up">
                  <div>
                    <p className="text-sm text-gray-300 mb-3">Motion Style</p>
                    <select
                      value={motionStyle}
                      onChange={(e) => setMotionStyle(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>Cinematic</option>
                      <option>Soft Anime Motion</option>
                      <option>Action Energy</option>
                      <option>Rain Atmosphere</option>
                      <option>Emotional Scene</option>
                      <option>Neon Glow</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-300 mb-3">Duration</p>
                    <select
                      value={videoDuration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>5 seconds</option>
                      <option>8 seconds</option>
                      <option>10 seconds</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-300 mb-3">
                      Camera Movement
                    </p>
                    <select
                      value={cameraMovement}
                      onChange={(e) => setCameraMovement(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>Slow Push In</option>
                      <option>Slow Zoom Out</option>
                      <option>Left To Right Pan</option>
                      <option>Handheld Cinematic</option>
                      <option>Still Camera</option>
                      <option>Dynamic Action Camera</option>
                    </select>
                  </div>
                </div>
              )}

              {currentTool.key === "text-anime-video" && (
                <div className="mt-7 md:mt-8 grid gap-4 md:grid-cols-3 animate-fade-in-up">
                  <div>
                    <p className="text-sm text-gray-300 mb-3">Scene Type</p>
                    <select
                      value={sceneType}
                      onChange={(e) => setSceneType(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>Cinematic Scene</option>
                      <option>Action Battle</option>
                      <option>Emotional Moment</option>
                      <option>Romance Scene</option>
                      <option>Dark Fantasy</option>
                      <option>Cyberpunk City</option>
                      <option>School Anime Scene</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-300 mb-3">Duration</p>
                    <select
                      value={videoDuration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>5 seconds</option>
                      <option>8 seconds</option>
                      <option>10 seconds</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-300 mb-3">Mood</p>
                    <select
                      value={animationMood}
                      onChange={(e) => setAnimationMood(e.target.value)}
                      className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-4 md:px-5 py-4 outline-none focus:border-purple-500 hover:border-purple-400/50 transition-all"
                    >
                      <option>Dramatic</option>
                      <option>Calm</option>
                      <option>Epic</option>
                      <option>Romantic</option>
                      <option>Dark</option>
                      <option>Energetic</option>
                      <option>Mysterious</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="mt-7 md:mt-8 animate-fade-in-up">
                <p className="text-sm text-gray-300 mb-3">
                  {currentTool.key === "prompt-enhancer"
                    ? "Your Simple Prompt"
                    : currentTool.key === "anime-image"
                    ? "Anime Image Prompt"
                    : currentTool.key === "photo-anime-video"
                    ? "Motion Prompt"
                    : currentTool.key === "text-anime-video"
                    ? "Scene Prompt"
                    : "Prompt / Instructions"}
                </p>

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={currentTool.placeholder}
                  className="w-full h-36 md:h-40 bg-black/40 border border-purple-500/20 rounded-2xl p-4 md:p-5 outline-none focus:border-purple-500 resize-none text-white placeholder:text-gray-500 hover:border-purple-400/50 transition-all text-sm md:text-base"
                />
              </div>

              {currentTool.key === "anime-image" && (
                <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-4 md:p-5 animate-fade-in-up">
                  <p className="text-purple-300 font-semibold">
                    Anime Image Settings
                  </p>

                  <p className="text-gray-400 mt-2 text-sm">
                    Use detailed prompts for better anime results. Later these
                    settings will be sent to the real image API.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Base Cost</p>
                      <h4 className="text-2xl font-black mt-1">2 Credits</h4>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Style</p>
                      <h4 className="text-base md:text-lg font-bold mt-1">
                        {animeStyle}
                      </h4>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Output</p>
                      <h4 className="text-base md:text-lg font-bold mt-1">
                        {aspectRatio}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                    <p className="text-sm text-purple-300 font-semibold">
                      Final Prompt Preview
                    </p>

                    <p className="text-gray-300 text-sm mt-2 break-words">
                      {prompt
                        ? `${prompt}, ${animeStyle}, ${aspectRatio}, ${quality}, anime style, masterpiece, best quality`
                        : "Type a prompt to preview the final anime prompt."}
                    </p>
                  </div>
                </div>
              )}

              {currentTool.key === "photo-anime-video" && (
                <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-4 md:p-5 animate-fade-in-up">
                  <p className="text-purple-300 font-semibold">
                    Photo → Anime Video Settings
                  </p>

                  <p className="text-gray-400 mt-2 text-sm">
                    Upload an anime image, choose motion settings, and describe
                    how the scene should move.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Base Cost</p>
                      <h4 className="text-2xl font-black mt-1">40 Credits</h4>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Motion</p>
                      <h4 className="text-base md:text-lg font-bold mt-1">
                        {motionStyle}
                      </h4>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Duration</p>
                      <h4 className="text-base md:text-lg font-bold mt-1">
                        {videoDuration}
                      </h4>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Camera</p>
                      <h4 className="text-base md:text-lg font-bold mt-1">
                        {cameraMovement}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                    <p className="text-sm text-purple-300 font-semibold">
                      Final Motion Prompt Preview
                    </p>

                    <p className="text-gray-300 text-sm mt-2 break-words">
                      {prompt
                        ? `${prompt}, ${motionStyle}, ${videoDuration}, ${cameraMovement}, anime motion, cinematic lighting, smooth animation`
                        : "Type a motion description to preview the final image-to-video prompt."}
                    </p>
                  </div>
                </div>
              )}

              {currentTool.key === "text-anime-video" && (
                <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-4 md:p-5 animate-fade-in-up">
                  <p className="text-purple-300 font-semibold">
                    Text → Anime Video Settings
                  </p>

                  <p className="text-gray-400 mt-2 text-sm">
                    Describe an anime scene and choose the scene type, mood, and
                    duration.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Base Cost</p>
                      <h4 className="text-2xl font-black mt-1">80 Credits</h4>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Scene Type</p>
                      <h4 className="text-base md:text-lg font-bold mt-1">
                        {sceneType}
                      </h4>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
                      <p className="text-gray-400 text-sm">Mood</p>
                      <h4 className="text-base md:text-lg font-bold mt-1">
                        {animationMood}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                    <p className="text-sm text-purple-300 font-semibold">
                      Final Video Prompt Preview
                    </p>

                    <p className="text-gray-300 text-sm mt-2 break-words">
                      {prompt
                        ? `${prompt}, ${sceneType}, ${animationMood} mood, ${videoDuration}, ${cameraMovement}, anime video, cinematic lighting, smooth animation`
                        : "Type a scene description to preview the final text-to-video prompt."}
                    </p>
                  </div>
                </div>
              )}

              {notice && (
                <div className="mt-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4 text-purple-200 animate-fade-in-up">
                  {notice}
                </div>
              )}

              {resultMessage && (
                <div className="mt-6 rounded-2xl bg-green-500/10 border border-green-500/20 p-4 text-green-200 animate-fade-in-up">
                  {resultMessage}
                </div>
              )}

              {currentTool.key === "prompt-enhancer" && enhancedPrompt && (
                <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-4 md:p-5 animate-fade-in-up">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm text-purple-300 font-semibold">
                        Enhanced Anime Prompt
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Copy this and use it inside Anime Image or Video tools.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(enhancedPrompt)
                      }
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:scale-105 transition-all"
                    >
                      Copy Prompt
                    </button>
                  </div>

                  <p className="text-gray-200 mt-5 leading-relaxed text-sm md:text-base break-words">
                    {enhancedPrompt}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleRunTool}
                  disabled={isRunning}
                  className="relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-70 group"
                >
                  <span className="relative z-10">
                    {isRunning ? "Processing..." : `Run ${currentTool.label}`}
                  </span>

                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                </button>

                <button
                  onClick={() => {
                    setPrompt("");
                    setNotice("");
                    setResultMessage("");
                    setEnhancedPrompt("");
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:scale-[1.02] transition-all"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-5 md:p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    Recent Activity
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm md:text-base">
                    Your latest tool usage appears here.
                  </p>
                </div>

                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="w-full md:w-auto px-5 py-3 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 hover:scale-105 transition-all"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-black/30 border border-purple-500/20 p-6 text-gray-400 text-sm md:text-base">
                  No recent activity yet.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-black/30 border border-purple-500/20 p-5 hover:-translate-y-1 hover:border-purple-400/50 transition-all"
                    >
                      <p className="text-sm text-purple-300">{item.tool}</p>
                      <h4 className="text-lg md:text-xl font-bold mt-2">
                        {item.result}
                      </h4>
                      <p className="text-gray-400 mt-3 text-sm">
                        Credit Cost: {item.cost}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
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

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-22px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-soft {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
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

        .animate-fade-in-left {
          animation: fade-in-left 0.7s ease-out both;
        }

        .animate-bounce-soft {
          animation: bounce-soft 2s ease-in-out infinite;
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