"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Eye, 
  EyeOff,
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Power,
  RotateCcw,
  Zap,
  Lock,
  Unlock,
  KeyRound,
  AlertCircle
} from "lucide-react";

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<boolean>(false);
  const [shakeTrigger, setShakeTrigger] = useState<number>(0);

  // Controller states
  const [adminId, setAdminId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [vibrateFeedback, setVibrateFeedback] = useState<boolean>(true);
  const [lastCommandSent, setLastCommandSent] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevVolume = useRef<number>(0.5);
  const isResettingVolume = useRef<boolean>(false);

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("fomsu_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Handle password submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "fomsu2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("fomsu_auth", "true");
      setAuthError(false);
      if (vibrateFeedback && navigator.vibrate) {
        navigator.vibrate([80, 50, 80]);
      }
    } else {
      setAuthError(true);
      setShakeTrigger(prev => prev + 1);
      if (vibrateFeedback && navigator.vibrate) {
        navigator.vibrate([100, 100, 100]);
      }
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  // Initialize registration
  const registerSession = async () => {
    setIsConnecting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/remote/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error("Failed to register session");
      
      const data = await res.json();
      setAdminId(data.adminId);
      setIsActive(true);
      
      // Haptic feedback
      if (vibrateFeedback && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg("Connection failed. Make sure you are on the same network.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Poll status to see if another device registers
  useEffect(() => {
    if (!adminId || !isActive) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/remote/status?id=${adminId}`);
        if (res.ok) {
          const data = await res.json();
          if (!data.isActive) {
            setIsActive(false);
            if (vibrateFeedback && navigator.vibrate) {
              navigator.vibrate([500]); // long warning vibration
            }
          }
        }
      } catch (e) {
        console.error("Error polling status:", e);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [adminId, isActive, vibrateFeedback]);

  // Send control commands to server
  const sendCommand = async (command: string) => {
    if (!adminId || !isActive) return;

    // Local visual + haptic feedback
    setLastCommandSent(command);
    setTimeout(() => setLastCommandSent(null), 300);

    if (vibrateFeedback && navigator.vibrate) {
      navigator.vibrate(40);
    }

    try {
      const res = await fetch("/api/remote/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, command })
      });
      if (!res.ok) {
        if (res.status === 401) {
          setIsActive(false);
        }
      }
    } catch (e) {
      console.error("Error sending command:", e);
    }
  };

  // Initialize audio volume-hijack loop
  const startVolumeHijack = () => {
    if (!audioRef.current) return;
    
    try {
      const audio = audioRef.current;
      audio.volume = 0.5;
      prevVolume.current = 0.5;
      audio.loop = true;
      
      // Silent 1-second WAV
      audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAAD";
      
      audio.play()
        .then(() => {
          setAudioEnabled(true);
          console.log("[Volume Hijack] Audio loop playing successfully");
        })
        .catch(err => {
          console.error("[Volume Hijack] Playback blocked or failed:", err);
          setErrorMsg("Audio play blocked. Please interact and try again.");
        });
    } catch (e) {
      console.error("[Volume Hijack] Setup error:", e);
    }
  };

  // Listen to volumechange events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVolumeChange = () => {
      if (isResettingVolume.current) {
        isResettingVolume.current = false;
        return;
      }

      const newVolume = audio.volume;
      const oldVolume = prevVolume.current;

      console.log(`[Volume Hijack] Volume change: ${oldVolume} -> ${newVolume}`);

      if (newVolume > oldVolume) {
        sendCommand("NEXT");
      } else if (newVolume < oldVolume) {
        sendCommand("PREV");
      }

      // Lock and reset volume back to 0.5 to allow infinite clicking
      isResettingVolume.current = true;
      audio.volume = 0.5;
      prevVolume.current = 0.5;
    };

    audio.addEventListener("volumechange", handleVolumeChange);
    return () => {
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [adminId, isActive, vibrateFeedback]);

  // Main UI connection action
  const handleConnect = async () => {
    await registerSession();
    startVolumeHijack();
  };

  return (
    <main className="min-h-screen bg-[#04071a] text-slate-100 flex flex-col items-center justify-between p-4 relative overflow-hidden font-sans select-none">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-radial from-indigo-500/10 to-transparent -top-40 -left-20 animate-pulse duration-[8000ms]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-radial from-violet-500/10 to-transparent -bottom-40 -right-20 animate-pulse duration-[10000ms]" />
      </div>

      {/* Hidden audio element for hijacking volume change events */}
      <audio ref={audioRef} className="hidden" playsInline />

      {/* Header */}
      <header className="w-full z-10 flex items-center justify-between py-2 border-b border-white/5 bg-[#04071a]/60 backdrop-blur-md px-3 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-amber-400 tracking-wider">SUEZ UNIVERSITY</h1>
            <p className="text-[10px] text-slate-400">Remote Clicker</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5">
          {isAuthenticated && isActive ? (
            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full text-emerald-400 font-semibold animate-pulse">
              <Wifi className="w-3 h-3" /> ACTIVE
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-full text-rose-400 font-semibold">
              <WifiOff className="w-3 h-3" /> DISCONNECTED
            </span>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 w-full flex flex-col justify-center items-center z-10 py-6 max-w-md">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* Premium Login Screen */
            <motion.div
              key="login-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              animate-shake={authError ? "shake" : ""}
              variants={{
                shake: {
                  x: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.4 }
                }
              }}
              custom={shakeTrigger}
              className={`w-full bg-slate-900/60 border ${authError ? 'border-rose-500/40 glow-rose' : 'border-white/10'} rounded-2xl p-6 backdrop-blur-xl flex flex-col shadow-2xl transition-colors duration-300`}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Admin Authorization
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Faculty of Medicine, Suez University Graduation Project
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className={`w-full pl-9 pr-10 py-3 bg-slate-950/60 border ${authError ? 'border-rose-500/50 focus:ring-rose-500' : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:ring-4 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 active:scale-95 transition-all"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-xs text-rose-400 font-medium px-1"
                  >
                    <AlertCircle className="w-4 h-4" /> Incorrect password. Please try again.
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer text-sm"
                >
                  Unlock Clicker
                </button>
              </form>
            </motion.div>
          ) : !isActive ? (
            /* Logged Out / Connect View */
            <motion.div
              key="connect-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col items-center text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 animate-bounce duration-[3000ms]">
                <Power className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                Connect Remote Control
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Take control of the presentation. Connecting will automatically log out any other active remote devices.
              </p>

              {errorMsg && (
                <div className="w-full p-3 mb-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                disabled={isConnecting}
                onClick={handleConnect}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isConnecting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-5 h-5" /> Connect Now
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            /* Connected / Active Remote view */
            <motion.div
              key="control-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex-1 flex flex-col justify-between gap-4 h-full"
            >
              {/* Main Gesture/Tap Navigation Clicker */}
              <div className="flex-1 flex flex-col gap-4">
                {/* NEXT SLIDE - Giant button because it's 95% of presentation clicks */}
                <button
                  onClick={() => sendCommand("NEXT")}
                  className={`flex-1 min-h-[180px] bg-gradient-to-br from-indigo-600/90 to-purple-600/90 border border-indigo-400/30 rounded-2xl flex flex-col items-center justify-center relative active:scale-98 transition-all cursor-pointer shadow-lg shadow-indigo-600/10 ${
                    lastCommandSent === "NEXT" ? "ring-4 ring-emerald-500/50" : ""
                  }`}
                >
                  <div className="absolute top-4 left-4 text-xs font-semibold text-indigo-200 tracking-wider">
                    PRIMARY ACTION
                  </div>
                  <ChevronRight className="w-16 h-16 text-white animate-pulse" />
                  <span className="text-xl font-bold tracking-wide mt-2">Next Slide</span>
                  <span className="text-xs text-indigo-200/60 mt-1">Tap anywhere in this area</span>
                </button>

                {/* PREVIOUS SLIDE - Medium button */}
                <button
                  onClick={() => sendCommand("PREV")}
                  className={`h-24 bg-slate-900/80 border border-white/5 rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer ${
                    lastCommandSent === "PREV" ? "ring-4 ring-emerald-500/50" : ""
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 text-slate-300" />
                  <span className="text-md font-semibold text-slate-200">Previous Slide</span>
                </button>
              </div>

              {/* Utility Commands Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Fullscreen Toggle */}
                <button
                  onClick={() => sendCommand("FULLSCREEN")}
                  className="py-3 px-4 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-xs font-semibold text-slate-300 hover:bg-slate-900/60 cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-slate-400" /> Fullscreen
                </button>

                {/* Chrome UI Toggle */}
                <button
                  onClick={() => sendCommand("CHROME")}
                  className="py-3 px-4 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-xs font-semibold text-slate-300 hover:bg-slate-900/60 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-slate-400" /> Chrome UI
                </button>
              </div>

              {/* Hardware Volume control status and feedback controls */}
              <div className="w-full bg-slate-950/40 border border-white/5 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    {audioEnabled ? (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                        <span className="text-emerald-400 font-semibold">Volume Keys Linked</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-500 font-semibold">Volume Keys Disabled</span>
                      </>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-500">Press phone volume button</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <label className="text-[11px] text-slate-400 flex items-center gap-1">
                    Vibration Feedback
                  </label>
                  <input
                    type="checkbox"
                    checked={vibrateFeedback}
                    onChange={(e) => setVibrateFeedback(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 accent-indigo-500"
                  />
                </div>
              </div>

              {/* Force reconnect */}
              <button
                onClick={registerSession}
                className="w-full py-2 bg-slate-950/20 hover:bg-slate-950/40 text-slate-500 hover:text-slate-400 text-[10px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 rounded-lg border border-white/5"
              >
                <RotateCcw className="w-3 h-3" /> Reset / Take Over Control
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <footer className="w-full text-center py-2 text-[9px] text-slate-600 border-t border-white/5 mt-4 z-10">
        Suez University Faculty of Medicine • Graduation Project 2026
      </footer>
    </main>
  );
}
