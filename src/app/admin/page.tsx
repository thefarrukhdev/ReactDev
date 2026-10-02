"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    // Auto-generate ID: lowercase, replace spaces with hyphens
    setId(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/components/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, id, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ " + data.message);
        setName("");
        setId("");
        setCode("");
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessage("❌ Request failed: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-transparent text-slate-100 overflow-hidden">
      <Navbar onSearch={() => {}} />
      <div className="flex-1 overflow-y-auto p-8 flex justify-center">
        <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl h-fit">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Component Studio</h1>
          <p className="text-gray-400 mb-8">Paste raw React component code here to instantly scaffold it into your platform architecture.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm text-gray-300">Component Name</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Magic Button"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm text-gray-300">Component ID (Folder Name)</label>
                <input 
                  required
                  type="text" 
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. magic-button"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Raw React Code (TSX)</label>
              <textarea 
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={"const MyComponent = () => { ... } \n\nexport default MyComponent;"}
                className="w-full h-[350px] bg-black/50 border border-white/10 rounded-lg p-4 text-gray-300 font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-sm">{message}</span>
              <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 transition-all shadow-lg shadow-purple-500/25"
              >
                {loading ? "Generating Architecture..." : "Generate Component"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
