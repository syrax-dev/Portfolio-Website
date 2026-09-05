import React, { useState } from "react";
import {
  Terminal,
  Keyboard,
  Download,
  Copy,
  Check,
  ArrowUpRight,
  Wifi,
  Battery,
  Bell,
  Sparkles,
  FolderGit2,
} from "lucide-react";
import { cockpit } from "../data/profile";
import archMascot from "../assets/arch-mascot.png";

const REPO_URL = cockpit.repo || "https://github.com/syrax-dev/Arch-Hyprland-Dotfiles";
const CLONE_CMD = `git clone https://github.com/syrax-dev/Arch-Hyprland-Dotfiles.git
cd Arch-Hyprland-Dotfiles && ./install.sh`;

// Exact Catppuccin 8 color circles from Syrax's terminal
const PALETTE = [
  { name: "Gray", hex: "#6c7086" },
  { name: "Sky", hex: "#89dceb" },
  { name: "Teal", hex: "#94e2d5" },
  { name: "Blue", hex: "#89b4fa" },
  { name: "Yellow", hex: "#f9e2af" },
  { name: "Green", hex: "#a6e3a1" },
  { name: "Red", hex: "#f38ba8" },
  { name: "Mauve", hex: "#cba6f7" },
];

export default function ArchCockpit() {
  const [activeTab, setActiveTab] = useState("specs");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(CLONE_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl bg-black overflow-hidden flex flex-col transition-all">
      {/* ============================================================ */}
      {/* 1. WAYBAR STATUS BAR (Matched to Syrax's live desktop)       */}
      {/* ============================================================ */}
      <div className="bg-black px-2.5 sm:px-3.5 py-2 flex items-center justify-between text-[10px] sm:text-xs font-mono select-none">
        {/* Left: Caffeine Toggle & Clock */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-white/[0.06] text-ink font-semibold">
            <span className="text-[11px] sm:text-xs">☕</span>
            <span className="hidden xs:inline">04:43 AM</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-muted pl-1">
            <span className="text-[#cba6f7]">syraxdev@arch</span>
            <span>•</span>
            <span className="text-accent/90">hyprland.conf</span>
          </div>
        </div>

        {/* Center: Live Workspace Pill Array */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-white/[0.04] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((ws) => (
            <span
              key={ws}
              className={`rounded-full flex items-center justify-center font-bold text-[8px] sm:text-[9px] transition-all ${
                ws === 3
                  ? "bg-accent/20 text-accent px-1 sm:px-1.5 py-0.5"
                  : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 hover:bg-white/40"
              }`}
            >
              {ws === 3 ? ">_" : ""}
            </span>
          ))}
        </div>

        {/* Right: Network Speed, Battery, & Notifications */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-muted">
          <div className="flex items-center gap-1 text-[#cba6f7]">
            <Wifi size={11} />
            <span className="hidden xs:inline">290.9Kbps</span>
          </div>
          <div className="flex items-center gap-1 text-[#a6e3a1]">
            <Battery size={11} />
            <span>33%</span>
          </div>
          <div className="relative cursor-pointer hover:text-ink text-[#f9e2af]">
            <Bell size={11} />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. COCKPIT TAB SWITCHER                                      */}
      {/* ============================================================ */}
      <div className="bg-black px-3 sm:px-6 flex items-center justify-between overflow-x-auto select-none no-scrollbar">
        <div className="flex items-center gap-1 sm:gap-2 py-2">
          {[
            { id: "specs", label: "Fastfetch & Specs", icon: Terminal },
            { id: "keybinds", label: "Keybindings", icon: Keyboard },
            { id: "install", label: "Install Script", icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/[0.08] text-white font-semibold"
                    : "text-muted hover:text-ink hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={12} className="sm:w-[13px] sm:h-[13px]" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* External Repo Badge */}
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-muted hover:text-accent transition-colors shrink-0"
        >
          <FolderGit2 size={12} />
          <span>syrax-dev/Arch-Hyprland-Dotfiles</span>
          <ArrowUpRight size={11} />
        </a>
      </div>

      {/* ============================================================ */}
      {/* 3. TAB CONTENT VIEWER                                        */}
      {/* ============================================================ */}
      <div className="p-3 sm:p-6 md:p-7 min-h-[300px] flex flex-col justify-center bg-black">
        {/* ------------------------------------------------------------ */}
        {/* TAB 1: FASTFETCH & SYSTEM SPECS (NULLISH / MATTE TERMINAL)   */}
        {/* ------------------------------------------------------------ */}
        {activeTab === "specs" && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10">
            {/* Mascot Image */}
            <div className="shrink-0 flex items-center justify-center">
              <img
                src={archMascot}
                alt="SyraxDev Arch Dragon Mascot"
                className="w-20 h-20 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                loading="eager"
              />
            </div>

            {/* Terminal Fastfetch Software Output */}
            <div className="w-full max-w-lg bg-black rounded-lg p-3 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto">
              <p className="text-white/85 font-semibold text-xs tracking-wider mb-1">SyraxDev</p>
              <div className="text-white/20 text-[10px] sm:text-[11px] select-none font-mono whitespace-nowrap">
                ┌──────────────────────────────────────────┐
              </div>

              <div className="py-1 space-y-1 text-white/75 text-[10px] xs:text-[11px] sm:text-xs">
                <p>
                  <span className="text-[#f38ba8]/85 font-medium"> OS</span>
                  <span className="text-white/30"> : </span>
                  <span>Arch Linux x86_64</span>
                </p>
                <p>
                  <span className="text-[#f38ba8]/85 font-medium"> Kernel</span>
                  <span className="text-white/30"> : </span>
                  <span>Linux 6.18.49-1-lts</span>
                </p>
                <p>
                  <span className="text-[#a6e3a1]/85 font-medium">󰏖 Packages</span>
                  <span className="text-white/30"> : </span>
                  <span>1143 (pacman), 2 (appimage)</span>
                </p>
                <p>
                  <span className="text-[#f9e2af]/85 font-medium">󰖲 WM</span>
                  <span className="text-white/30"> : </span>
                  <span>Hyprland 0.56.2 (Wayland)</span>
                </p>
                <p>
                  <span className="text-[#f9e2af]/85 font-medium"> Terminal</span>
                  <span className="text-white/30"> : </span>
                  <span>kitty 0.48.2</span>
                </p>
                <p>
                  <span className="text-[#89dceb]/85 font-medium"> User</span>
                  <span className="text-white/30"> : </span>
                  <span className="text-white/90">syraxdev@arch</span>
                </p>
                <p>
                  <span className="text-[#89b4fa]/85 font-medium"> Shell</span>
                  <span className="text-white/30"> : </span>
                  <span>zsh (starship + zoxide)</span>
                </p>
                <p>
                  <span className="text-[#cba6f7]/85 font-medium">󰉼 Theme</span>
                  <span className="text-white/30"> : </span>
                  <span>Catppuccin Mocha</span>
                </p>
                <p>
                  <span className="text-[#f38ba8]/85 font-medium">󱦟 OS Age</span>
                  <span className="text-white/30"> : </span>
                  <span>2 years</span>
                </p>
                <p>
                  <span className="text-[#f38ba8]/85 font-medium">󱫐 Uptime</span>
                  <span className="text-white/30"> : </span>
                  <span>8 hours</span>
                </p>
              </div>

              <div className="text-white/20 text-[10px] sm:text-[11px] select-none font-mono whitespace-nowrap">
                └──────────────────────────────────────────┘
              </div>

              {/* 8 Catppuccin Palette Dots (Matte & Muted) */}
              <div className="flex items-center gap-1.5 pt-2 sm:pt-2.5 mt-1">
                {PALETTE.map((c) => (
                  <span
                    key={c.name}
                    title={c.name}
                    className="w-2 h-2 rounded-full opacity-65 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* TAB 2: KEYBOARD-DRIVEN WORKFLOW (Keybindings)                */}
        {/* ------------------------------------------------------------ */}
        {activeTab === "keybinds" && (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5 font-mono text-xs">
            {[
              { keys: "SUPER + Return", action: "Kitty Terminal" },
              { keys: "SUPER + A", action: "Rofi Launcher" },
              { keys: "SUPER + B", action: "Zen Browser" },
              { keys: "SUPER + E", action: "Thunar Files" },
              { keys: "SUPER + W", action: "Cycle Wallpapers" },
              { keys: "SUPER + M", action: "Toggle Waybar" },
              { keys: "SUPER + L", action: "Lock (hyprlock)" },
              { keys: "SUPER + Q", action: "Close Window" },
              { keys: "SUPER + N", action: "Clipboard History" },
              { keys: "SUPER + F", action: "Toggle Fullscreen" },
              { keys: "SUPER + V", action: "Toggle Floating" },
              { keys: "SUPER + 1..0", action: "Workspaces 1–10" },
            ].map((item) => (
              <div
                key={item.keys}
                className="p-2.5 sm:p-3 rounded-md border border-line bg-black/40 flex flex-col justify-between gap-1 hover:border-accent/30 transition-colors"
              >
                <span className="text-[10px] sm:text-[11px] font-semibold text-accent/90">
                  {item.keys}
                </span>
                <span className="text-[11px] text-muted truncate">
                  {item.action}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* TAB 3: QUICK INSTALLER SCRIPT                                */}
        {/* ------------------------------------------------------------ */}
        {activeTab === "install" && (
          <div className="max-w-3xl mx-auto w-full space-y-3 sm:space-y-4 font-mono text-xs">
            <div className="bg-black/80 border border-line rounded-lg p-3 sm:p-4 text-ink">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <p className="text-muted text-[11px] font-sans">
                  Clone the repository and execute the installer script:
                </p>
                <button
                  onClick={handleCopy}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.08] hover:bg-accent/20 hover:text-accent text-muted text-[11px] transition-all cursor-pointer"
                  title="Copy installation command"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <pre className="text-accent text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre leading-relaxed bg-black/50 p-2.5 rounded border border-white/5">
                {CLONE_CMD}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 text-[11px]">
              <div className="p-3 rounded border border-line bg-black/40">
                <span className="text-ink font-semibold">./install.sh --full</span>
                <p className="text-muted mt-0.5">Installs all 164 packages, SDDM theme, and reflector services.</p>
              </div>
              <div className="p-3 rounded border border-line bg-black/40">
                <span className="text-ink font-semibold">--no-packages</span>
                <p className="text-muted mt-0.5">Skips package downloads and only symlinks configs into ~/.config/.</p>
              </div>
              <div className="p-3 rounded border border-line bg-black/40">
                <span className="text-ink font-semibold">--services</span>
                <p className="text-muted mt-0.5">Enables NetworkManager, Bluetooth, SDDM, and tuned performance daemons.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 4. COCKPIT FOOTER & GITHUB CTA                               */}
      {/* ============================================================ */}
      <div className="bg-black px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono text-center sm:text-left">
        <div className="flex items-center gap-2 text-muted text-[11px] sm:text-xs">
          <Sparkles size={13} className="text-accent shrink-0" />
          <span>Configured for daily productivity, coding, and Wayland gaming</span>
        </div>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-accent hover:text-white font-medium transition-colors group shrink-0"
        >
          <span>Explore Dotfiles on GitHub</span>
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </div>
  );
}

