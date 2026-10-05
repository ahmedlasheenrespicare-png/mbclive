import { useState } from "react";
import { IconCart, IconChat, IconCheck, IconFlame, IconShieldCheck, IconSparkles, IconZap } from "./Icons";
import { CURRENCIES, getWhatsAppUrl, PRICING_PLANS, PricingPlan } from "../data";

interface PricingProps {
  currentCurrency: string;
  onCurrencyChange: (code: string) => void;
  onAddToCart: (plan: PricingPlan, months: "3" | "6" | "12" | "24", price: number) => void;
  highlightedPlanId?: string;
}

export default function Pricing({
  currentCurrency,
  onCurrencyChange,
  onAddToCart,
  highlightedPlanId,
}: PricingProps) {
  const [duration, setDuration] = useState<"3" | "6" | "12" | "24">("12");

  const curr = CURRENCIES[currentCurrency] || CURRENCIES.SAR;

  const durationLabels: Record<"3" | "6" | "12" | "24", { name: string; discount?: string }> = {
    "3": { name: "3 شهور" },
    "6": { name: "6 شهور", discount: "خصم 15%" },
    "12": { name: "12 شهر (سنة)", discount: "الأكثر توفيراً 🔥" },
    "24": { name: "24 شهر (سنتين)", discount: "خصم 50% VIP" },
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#070a12] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-50" />
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-red-600/15 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-[13px] font-black mb-3.5">
            <IconFlame className="w-4 h-4 text-amber-400" /> باقات وعروض 2026
          </span>
          <h2 className="text-[30px] sm:text-[44px] font-black text-white tracking-tight">
            اختر باقتك وسيرفرك المفضل
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[17px] text-gray-300">
            سيرفرات IPTV أصلية غير مضغوطة مع تفعيل فوري خلال دقائق وضمان ثبات كامل طوال مدة اشتراكك.
          </p>

          {/* Controls: Duration Selector & Currency Switcher */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Duration Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/15">
              {(["3", "6", "12", "24"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-[13px] sm:text-[14px] font-black transition-all ${
                    duration === d
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {durationLabels[d].name}
                  {durationLabels[d].discount && d === "12" && (
                    <span className="hidden sm:inline-block mr-1 text-[10px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-black">
                      موصى به
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Currency Picker */}
            <div className="flex items-center gap-2 bg-slate-900 border border-white/15 rounded-2xl px-3 py-2">
              <span className="text-[12px] text-gray-400 font-bold">العملة:</span>
              <select
                aria-label="العملة"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="bg-transparent text-white font-black text-[13px] focus:outline-none cursor-pointer"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white font-bold">
                    {c.symbol} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const priceObj = plan.prices[duration];
            const currentPrice = priceObj[curr.code] || priceObj.SAR;
            const isHighlighted = highlightedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 ${
                  plan.isPopular || isHighlighted
                    ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-red-500 shadow-2xl shadow-red-600/20 scale-[1.02] z-10"
                    : plan.isVip
                    ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-500/80 shadow-2xl shadow-amber-500/15"
                    : "bg-slate-900/80 border border-white/15 hover:border-white/30"
                }`}
              >
                {/* Popular / VIP Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[11.5px] font-black px-4 py-1 rounded-full shadow-lg uppercase tracking-wider">
                      🔥 الأكثر طلباً وشهرة
                    </span>
                  </div>
                )}
                {plan.isVip && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[11.5px] font-black px-4 py-1 rounded-full shadow-lg uppercase tracking-wider">
                      👑 باقة الـ VIP لشاشتين
                    </span>
                  </div>
                )}

                <div>
                  {/* Tag */}
                  <span className="inline-block text-[12px] font-black text-gray-400 mb-2">
                    {plan.tag}
                  </span>

                  {/* Plan Name */}
                  <h3 className="text-[20px] sm:text-[22px] font-black text-white leading-tight">
                    {plan.serverName}
                  </h3>

                  <p className="mt-2 text-[13px] text-gray-400 leading-[1.6]">
                    {plan.description}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-5 py-4 border-y border-white/10 text-right">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[36px] sm:text-[42px] font-black text-white tracking-tight">
                        {currentPrice}
                      </span>
                      <span className="text-[18px] font-black text-red-400">
                        {curr.symbol}
                      </span>
                      <span className="text-[12px] text-gray-400 font-bold mr-1">
                        / {durationLabels[duration].name}
                      </span>
                    </div>
                    <span className="text-[11.5px] font-bold text-emerald-400 block mt-1">
                      ✓ تفعيل فوري بدون رسوم إضافية
                    </span>
                  </div>

                  {/* Specs Pill List */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11.5px] font-bold">
                    <div className="bg-white/5 p-2 rounded-lg text-center text-gray-300">
                      📺 {plan.channelsCount}
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg text-center text-gray-300">
                      🎬 {plan.vodCount}
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg text-center text-gray-300">
                      ⚡ {plan.quality}
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg text-center text-gray-300">
                      🛡️ {plan.devices}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-5 space-y-2.5 text-[13px] text-gray-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <IconCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Actions */}
                <div className="mt-8 pt-4 border-t border-white/10 space-y-2.5">
                  <a
                    href={getWhatsAppUrl(
                      `مرحبًا ستريم ماستر، أود الاشتراك في ${plan.serverName} لمدة ${durationLabels[duration].name} بسعر ${currentPrice} ${curr.symbol}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl font-black text-[14px] flex items-center justify-center gap-2 transition-all shadow-md ${
                      plan.isPopular || isHighlighted
                        ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30"
                        : plan.isVip
                        ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:brightness-110"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <IconChat className="w-4 h-4" /> اشترك الآن عبر واتساب
                  </a>

                  <button
                    onClick={() => onAddToCart(plan, duration, currentPrice)}
                    className="w-full py-2.5 px-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-gray-200 text-[12.5px] font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <IconCart className="w-3.5 h-3.5" /> أضف إلى السلة
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-right">
            <span className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <IconShieldCheck className="w-8 h-8" />
            </span>
            <div>
              <h4 className="text-[17px] font-black text-white">ضمان كامل واسترجاع للأموال</h4>
              <p className="text-[13.5px] text-gray-300">
                نضمن لك ثبات السيرفر طوال مدة اشتراكك مع دعم فني متواصل وحل فوري لأي استفسار.
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppUrl("مرحبًا ستريم ماستر، لدي استفسار حول الضمان وطرق الدفع")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-xl text-[13.5px] transition-all"
          >
            تحدث مع الدعم الفني
          </a>
        </div>
      </div>
    </section>
  );
}
