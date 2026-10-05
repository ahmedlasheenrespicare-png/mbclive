import { useState } from "react";
import { CHANNEL_CATEGORIES } from "../data";
import { IconFlame, IconTv } from "./Icons";

export default function ChannelShowcase() {
  const [activeTab, setActiveTab] = useState("sports");

  const currentCategory = CHANNEL_CATEGORIES.find((c) => c.id === activeTab) || CHANNEL_CATEGORIES[0];

  return (
    <section id="channels" className="py-16 sm:py-24 bg-[#070a12] relative overflow-hidden">
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-red-600/15 border border-red-500/30 text-red-400 px-3.5 py-1 rounded-full text-[12.5px] font-black mb-3">
            <IconTv className="w-4 h-4 text-amber-400" /> مكتبة القنوات والبث المباشر
          </span>
          <h2 className="text-[28px] sm:text-[40px] font-black text-white tracking-tight">
            أكثر من 16,500 قناة بين يديك
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-300">
            تصفح أبرز الباقات الرياضية، السينمائية، والعربية المتوفرة داخل اشتراكك.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {CHANNEL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-[14px] font-bold transition-all ${
                  activeTab === cat.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-black"
                    : "bg-slate-900 border border-white/10 text-gray-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Channels Grid Card */}
        <div className="rounded-3xl border border-white/15 bg-slate-900/90 p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
              <h3 className="text-[18px] sm:text-[22px] font-black text-white">
                {currentCategory.name}
              </h3>
            </div>
            <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-[12px] font-bold">
              {currentCategory.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentCategory.channels.map((ch, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-purple-600 text-white shadow-md text-sm font-black">
                  {idx + 1}
                </div>
                <span className="text-[14px] sm:text-[14.5px] font-bold text-gray-200 group-hover:text-white transition-colors">
                  {ch}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
