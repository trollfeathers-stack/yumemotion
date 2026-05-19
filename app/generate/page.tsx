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
  id: number;
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
      "Generate anime characters, scenes, and backgrounds from text prompts.",
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
      "Turn a still image into an anime-style animated video scene.",
    placeholder:
      "Describe the motion: blinking eyes, hair movement, camera push-in, aura effects...",
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
      "Generate a full anime-style video from a text scene description.",
    placeholder:
      "Example: anime hero walking through a futuristic city at night, cinematic camera motion, wind and rain...",
    paidOnly: true,
  },
  {
    key: "prompt-enhancer",
    label: "Prompt Enhancer",
    icon: "✨",
    category: "Create",
    credits: 1,
    description:
      "Turn a simple idea into a stronger, more detailed anime prompt.",
    placeholder: "Example: cool boy in rain",
  },
  {
    key: "hd-upscale",
    label: "HD Upscale",
    icon: "🔍",
    category: "Edit",
    credits: 4,
    description:
      "Improve image clarity and upscale your anime image to higher quality.",
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
      "Remove the background from your anime image and keep the subject clean.",
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
      "Create anime-style thumbnails for YouTube videos and Shorts covers.",
    placeholder:
      "Example: anime reaction thumbnail, bold composition, energetic expression, dramatic background...",
  },
];

export default function GeneratePage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sessionUserId, setSessionUserId] = useState("");
  const [selectedTool, setSelectedTool] =
    useState<ToolKey>("anime-image");

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

      setCheckingAuth(false);
    }

    checkUser();
  }, [router]);

  const currentTool =
    tools.find((tool) => tool.key === selectedTool) || tools[0];

  const createTools = tools.filter((tool) => tool.category === "Create");
  const editTools = tools.filter((tool) => tool.category === "Edit");

  const toolLocked =
    planName === "Free" &&
    (currentTool.key === "photo-anime-video" ||
      currentTool.key === "text-anime-video");

  function selectTool(toolKey: ToolKey) {
    setSelectedTool(toolKey);
    const newTool = tools.find((tool) => tool.key === toolKey);
    setPrompt("");
    setResultMessage("");
    setNotice("");
    setEnhancedPrompt("");


    if (newTool?.paidOnly && planName === "Free") {
      setNotice("This tool is available only on paid plans.");
    }
  }

  async function finishRun(tool: Tool) {
    const newCredits = credits - tool.credits;
    const newCreditsUsed = creditsUsed + tool.credits;

    let newImagesMade = imagesMade;
    let newVideosMade = videosMade;

    if (
      tool.key === "anime-image" ||
      tool.key === "thumbnail-generator"
    ) {
      newImagesMade += 1;
    }

    if (
      tool.key === "photo-anime-video" ||
      tool.key === "text-anime-video"
    ) {
      newVideosMade += 1;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        credits: newCredits,
        credits_used: newCreditsUsed,
        images_made: newImagesMade,
        videos_made: newVideosMade,
      })
      .eq("id", sessionUserId);

    if (error) {
      setNotice(error.message);
      setIsRunning(false);
      return;
    }

    setCredits(newCredits);
    setCreditsUsed(newCreditsUsed);
    setImagesMade(newImagesMade);
    setVideosMade(newVideosMade);

    let message = "";

    if (tool.key === "prompt-enhancer") {
      message = "Prompt enhanced successfully.";
    } else if (
      tool.key === "photo-anime-video" ||
      tool.key === "text-anime-video"
    ) {
      message = `${tool.label} generated successfully.`;
    } else {
      message = `${tool.label} completed successfully.`;
    }

    setResultMessage(message);

    setHistory((prev) => [
      {
        id: Date.now(),
        tool: tool.label,
        cost: tool.credits,
        result: message,
      },
      ...prev,
    ].slice(0, 6));

    setIsRunning(false);
  }

  function handleRunTool() {
    setNotice("");
    setResultMessage("");

    if (!sessionUserId) return;

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

    if (
      !currentTool.requiresUpload &&
      prompt.trim() === ""
    ) {
      setNotice("Please enter a prompt first.");
      return;
    }

    if (
      currentTool.requiresUpload &&
      currentTool.key !== "photo-anime-video" &&
      prompt.trim() === ""
    ) {
      setNotice(
        "You can type an optional instruction, or continue later after upload support is connected."
      );
      return;
    }

    if (
      currentTool.key === "photo-anime-video" &&
      prompt.trim() === ""
    ) {
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

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 animate-pulse mb-6"></div>
          <p className="text-gray-300">Loading YumeMotion workspace...</p>
        </div>
      </div>
    );
  }

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
            <p className="text-xs text-gray-400">Creator Workspace</p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <div className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20">
            {credits} Credits
          </div>

          <Link href="/dashboard">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Dashboard
            </button>
          </Link>

          <Link href="/pricing">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Pricing
            </button>
          </Link>

          <Link href="/profile">
            <button className="px-4 py-2 text-sm md:text-base rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
              Profile
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-4 md:px-8 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="rounded-3xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-xl">
            <div className="mb-6">
              <p className="text-gray-400 text-sm">Workspace</p>
              <h2 className="text-2xl font-black mt-2">Generate Tools</h2>
              <p className="text-gray-400 text-sm mt-2">
                Pick a tool from the sidebar.
              </p>
            </div>

            <div className="mb-6 rounded-2xl bg-black/40 border border-purple-500/20 p-4">
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
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      selectedTool === tool.key
                        ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/40"
                        : "bg-black/30 border-purple-500/20 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{tool.icon}</span>
                        <div>
                          <p className="font-semibold">{tool.label}</p>
                          <p className="text-xs text-gray-400">
                            {tool.credits} credits
                          </p>
                        </div>
                      </div>

                      {tool.paidOnly && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/20 text-purple-200">
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
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      selectedTool === tool.key
                        ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/40"
                        : "bg-black/30 border-purple-500/20 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{tool.icon}</span>
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

          {/* Main content */}
<section className="space-y-6">
  {/* Header */}
  <div className="rounded-3xl bg-gradient-to-r from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-6 md:p-8">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <p className="text-sm text-purple-300">
          Current Tool
        </p>

        <h2 className="text-4xl font-black mt-2 flex items-center gap-3">
          <span>{currentTool.icon}</span>
          {currentTool.label}
        </h2>

        <p className="text-gray-300 mt-4 max-w-2xl">
          {currentTool.description}
        </p>
      </div>

      <div className="rounded-2xl bg-black/40 border border-purple-500/20 px-6 py-5 min-w-[180px]">
        <p className="text-sm text-gray-400">Credit Cost</p>
        <h3 className="text-4xl font-black mt-2">
          {currentTool.credits}
        </h3>
      </div>
    </div>
  </div>
  

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-5">
                <p className="text-gray-400 text-sm">Credits</p>
                <h3 className="text-3xl font-black mt-2">{credits}</h3>
              </div>

              <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-5">
                <p className="text-gray-400 text-sm">Credits Used</p>
                <h3 className="text-3xl font-black mt-2">{creditsUsed}</h3>
              </div>

              <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-5">
                <p className="text-gray-400 text-sm">Images Created</p>
                <h3 className="text-3xl font-black mt-2">{imagesMade}</h3>
              </div>

              <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-5">
                <p className="text-gray-400 text-sm">Videos Created</p>
                <h3 className="text-3xl font-black mt-2">{videosMade}</h3>
              </div>
            </div>

            {/* Tool form */}
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-6 md:p-8 backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold">
                    {currentTool.label}
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Build the form now and connect the real API next.
                  </p>
                </div>

                {toolLocked && (
                  <button
                    onClick={() => router.push("/pricing")}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold shadow-lg shadow-purple-500/30"
                  >
                    Upgrade to Unlock
                  </button>
                )}
              </div>

              {currentTool.requiresUpload && (
  <div className="mt-8">
    <p className="text-sm text-gray-300 mb-3">
      Upload Image
    </p>

    <div className="rounded-2xl border border-dashed border-purple-500/30 bg-black/30 p-8 text-center">
      <p className="text-5xl mb-4">📤</p>
      <p className="text-lg font-semibold">
        Upload anime image or character image
      </p>
      <p className="text-gray-400 mt-2">
        Later this will accept JPG, PNG, and WebP files for AI processing.
      </p>

      <button className="mt-5 px-6 py-3 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all">
        Choose Image
      </button>
    </div>
  </div>
)}

              {currentTool.key === "anime-image" && (
  <div className="mt-8 grid md:grid-cols-3 gap-4">
    <div>
      <p className="text-sm text-gray-300 mb-3">Anime Style</p>
      <select
  value={animeStyle}
  onChange={(e) => setAnimeStyle(e.target.value)}
  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
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
  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
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
  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
>
        <option>Standard</option>
        <option>High Quality</option>
        <option>Ultra Detail</option>
      </select>
    </div>
  </div>
)}

{currentTool.key === "photo-anime-video" && (
  <div className="mt-8 grid md:grid-cols-3 gap-4">
    <div>
      <p className="text-sm text-gray-300 mb-3">Motion Style</p>
      <select
        value={motionStyle}
        onChange={(e) => setMotionStyle(e.target.value)}
        className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
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
        className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
      >
        <option>5 seconds</option>
        <option>8 seconds</option>
        <option>10 seconds</option>
      </select>
    </div>

    <div>
      <p className="text-sm text-gray-300 mb-3">Camera Movement</p>
      <select
        value={cameraMovement}
        onChange={(e) => setCameraMovement(e.target.value)}
        className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
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

{currentTool.key === "anime-image" && (
  <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-5">
    <p className="text-purple-300 font-semibold">Anime Image Settings</p>
    <p className="text-gray-400 mt-2 text-sm">
      Use detailed prompts for better anime results. Later these settings will be sent to the real image API.
    </p>

    <div className="grid sm:grid-cols-3 gap-4 mt-5">
      <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
        <p className="text-gray-400 text-sm">Base Cost</p>
        <h4 className="text-2xl font-black mt-1">2 Credits</h4>
      </div>

      <div className="mt-5 rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
  <p className="text-sm text-purple-300 font-semibold">
    Final Prompt Preview
  </p>

  <p className="text-gray-300 text-sm mt-2">
    {prompt
      ? `${prompt}, ${animeStyle}, ${aspectRatio}, ${quality}, anime style, masterpiece, best quality`
      : "Type a prompt to preview the final anime prompt."}
  </p>
</div>

      <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
        <p className="text-gray-400 text-sm">Best For</p>
        <h4 className="text-lg font-bold mt-1">{animeStyle}</h4>
      </div>

      <div className="rounded-xl bg-white/5 border border-purple-500/20 p-4">
        <p className="text-gray-400 text-sm">Output</p>
        <h4 className="text-lg font-bold mt-1">{aspectRatio}</h4>
      </div>
    </div>
  </div>
)}

              <div className="flex flex-wrap gap-3 mt-6">
                <div className="px-4 py-2 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-gray-300">
                  Plan: {planName}
                </div>

                <div className="px-4 py-2 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-gray-300">
                  Cost: {currentTool.credits} credits
                </div>

                {currentTool.paidOnly && (
                  <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-200">
                    Paid Tool
                  </div>
                )}
              </div>

              {notice && (
                <div className="mt-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4 text-purple-200">
                  {notice}
                </div>
              )}

              {resultMessage && (
                <div className="mt-6 rounded-2xl bg-green-500/10 border border-green-500/20 p-4 text-green-200">
                  {resultMessage}
                </div>
              )}

              {currentTool.key === "prompt-enhancer" && enhancedPrompt && (
  <div className="mt-6 rounded-2xl bg-black/40 border border-purple-500/20 p-5">
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
        onClick={() => navigator.clipboard.writeText(enhancedPrompt)}
        className="px-5 py-3 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all"
      >
        Copy Prompt
      </button>
    </div>

    <p className="text-gray-200 mt-5 leading-relaxed">
      {enhancedPrompt}
    </p>
  </div>
)}

<div className="mt-8">
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
    className="w-full h-40 bg-black/40 border border-purple-500/20 rounded-2xl p-5 outline-none focus:border-purple-500 resize-none text-white placeholder:text-gray-500"
  />
</div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleRunTool}
                  disabled={isRunning}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-70"
                >
                  {isRunning ? "Processing..." : `Run ${currentTool.label}`}
                </button>

                <button
                  onClick={() => {
                    setPrompt("");
                    setNotice("");
                    setResultMessage("");
                  }}
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-purple-500/20 hover:bg-white/10 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Recent history */}
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-6 md:p-8 backdrop-blur-xl">
              <h3 className="text-3xl font-bold">Recent Activity</h3>
              <p className="text-gray-400 mt-2">
                Your latest tool usage will appear here.
              </p>

              {history.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-black/30 border border-purple-500/20 p-6 text-gray-400">
                  No recent activity yet.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-black/30 border border-purple-500/20 p-5"
                    >
                      <p className="text-sm text-purple-300">
                        {item.tool}
                      </p>
                      <h4 className="text-xl font-bold mt-2">
                        {item.result}
                      </h4>
                      <p className="text-gray-400 mt-3">
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
    </div>
  );
}