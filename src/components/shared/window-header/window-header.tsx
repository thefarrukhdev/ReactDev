"use client";

export default function WindowHeader({ title }: { title: string }) {
  return (
    <div className="relative px-6 py-4 border-b border-white/10 backdrop-blur-md flex items-center gap-3 rounded-t-2xl overflow-hidden">
      {/* 💧 Liquid background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-600/10 opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />

      {/* 🔴🟡🟢 Window dots */}
      <div className="relative z-10 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-md shadow-red-500/30 opacity-90 hover:opacity-100 transition-opacity duration-500" />
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md shadow-yellow-500/30 opacity-90 hover:opacity-100 transition-opacity duration-500 delay-100" />
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-md shadow-green-500/30 opacity-90 hover:opacity-100 transition-opacity duration-500 delay-200" />
      </div>

      <span className="relative z-10 text-sm font-medium text-white/90 tracking-wide ml-1">
        {title}
      </span>
    </div>
  );
}
