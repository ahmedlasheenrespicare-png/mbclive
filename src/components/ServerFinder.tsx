import { useState } from "react";
import { IconArrow, IconCheck, IconPlay, IconSparkles, IconZap } from "./Icons";
import { PRICING_PLANS } from "../data";

interface ServerFinderProps {
  onSelectPlan: (planId: string) => void;
  onOpenTrial: () => void;
}

export default function ServerFinder({ onSelectPlan, onOpenTrial }: ServerFinderProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    speed: "",
    content: "",
    device: "",
    screens: "",
  });

  const questions = [
    {
      key: "speed",
      title: "ما هي سرعة اتصال الإنترنت لديك تقريباً؟",
      subtitle: "نحدد ذلك لاقتراح السيرفر الأكثر استقراراً دون أي تقطيع",
      options: [
        { label: "سرعة عالية (أكثر من 30 ميجا)", value: "fast", icon: "⚡" },
        { label: "سرعة متوسطة (15 - 30 ميجا)", value: "medium", icon: "🚀" },
        { label: "سرعة عادية أو ضعيفة (4 - 15 ميجا)", value: "slow", icon: "📶" },
      ],
    },
    {
      key: "content",
      title: "ما هو المحتوى الأكثر أهمية بالنسبة لك؟",
      subtitle: "سنخصص لك السيرفر الذي يمتلك أعلى جودة في تخصصك",
      options: [
        { label: "مباريات كرة القدم والدوريات الكبرى (beIN & SSC)", value: "sports", icon: "⚽" },
        { label: "أفلام السينما ومسلسلات نتفليكس وشاهد VIP", value: "movies", icon: "🎬" },
        { label: "توازن شامل بين الرياضة والأفلام وقنوات العائلة", value: "all", icon: "🌟" },
      ],
    },
    {
      key: "device",
      title: "ما هو الجهاز الأساسي الذي ستشاهد عليه؟",
      subtitle: "لضمان توافق تطبيق التشغيل وإعدادات الـ 4K",
      options: [
        { label: "شاشة ذكية Smart TV (سامسونج أو LG)", value: "smarttv", icon: "📺" },
        { label: "جهاز Android TV Box أو Firestick أو Xiaomi", value: "android", icon: "🤖" },
        { label: "Apple TV أو iPhone / iPad أو كمبيوتر", value: "apple", icon: "🍏" },
      ],
    },
    {
      key: "screens",
      title: "كم عدد الأجهزة التي ترغب بتشغيلها معاً في نفس اللحظة؟",
      subtitle: "اختر لترشيح الباقة المفردة أو الباقة المزدوجة",
      options: [
        { label: "شاشة واحدة في نفس الوقت", value: "1", icon: "1️⃣" },
        { label: "شاشتان معاً في نفس اللحظة (Dual Screen)", value: "2", icon: "2️⃣" },
      ],
    },
  ];

  const handleSelectOption = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length); // Result screen
    }
  };

  const getRecommendation = () => {
    if (answers.screens === "2") {
      return PRICING_PLANS.find((p) => p.serverCode === "ultra") || PRICING_PLANS[1];
    }
    if (answers.speed === "slow") {
      return PRICING_PLANS.find((p) => p.serverCode === "moka") || PRICING_PLANS[3];
    }
    if (answers.content === "sports" || answers.speed === "fast") {
      return PRICING_PLANS.find((p) => p.serverCode === "nova") || PRICING_PLANS[0];
    }
    return PRICING_PLANS.find((p) => p.serverCode === "istar") || PRICING_PLANS[2];
  };

  const recommendedPlan = getRecommendation();

  return (
    <section id="server-finder" className="py-16 sm:py-24 bg-[#0a0e1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40" />
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 bg-red-600/15 border border-red-500/30 text-red-400 px-3.5 py-1 rounded-full text-[12.5px] font-black mb-3">
            <IconSparkles className="w-4 h-4 text-amber-400" /> مساعد الاختيار الذكي
          </span>
          <h2 className="text-[28px] sm:text-[38px] font-black text-white tracking-tight">
            أي سيرفر IPTV يناسبك تماماً؟
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-300">
            أجب عن 4 أسئلة سريعة لنرشح لك السيرفر المثالي لسرعة اتصالك وجهازك ومحتواك المفضل.
          </p>
        </div>

        {/* Wizard Box */}
        <div className="rounded-3xl border border-white/15 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          
          {step < questions.length ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-[12px] font-bold text-gray-400 mb-4">
                <span>السؤال {step + 1} من {questions.length}</span>
                <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-[20px] sm:text-[24px] font-black text-white mb-2">
                {questions[step].title}
              </h3>
              <p className="text-[14px] text-gray-400 mb-8">
                {questions[step].subtitle}
              </p>

              {/* Options */}
              <div className="grid gap-3.5 sm:gap-4">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(questions[step].key, opt.value)}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-red-600/15 hover:border-red-500/50 text-right transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-[15px] sm:text-[16.5px] font-bold text-white group-hover:text-red-400 transition-colors">
                        {opt.label}
                      </span>
                    </div>
                    <span className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 group-hover:border-red-500 group-hover:text-red-400 transition-all">
                      ←
                    </span>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 text-[13px] font-bold text-gray-400 hover:text-white transition-colors"
                >
                  ← العودة للسؤال السابق
                </button>
              )}
            </div>
          ) : (
            /* Result Box */
            <div className="text-center py-4">
              <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl shadow-green-600/30 mb-4 animate-bounce">
                <IconCheck className="w-8 h-8" />
              </span>
              <span className="block text-[13px] font-black text-emerald-400 uppercase tracking-widest">
                الترشيح المثالي لك
              </span>
              <h3 className="text-[26px] sm:text-[34px] font-black text-white mt-1">
                {recommendedPlan.serverName}
              </h3>
              <p className="text-[15px] text-gray-300 max-w-[560px] mx-auto mt-2.5">
                {recommendedPlan.description}
              </p>

              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 text-[13.5px] font-bold text-gray-200">
                <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-lg">
                  {recommendedPlan.channelsCount}
                </span>
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-lg">
                  {recommendedPlan.vodCount}
                </span>
                <span className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-lg">
                  {recommendedPlan.quality}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#pricing"
                  onClick={() => onSelectPlan(recommendedPlan.id)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 text-[15px] transition-all hover:scale-102"
                >
                  عرض باقات هذا السيرفر
                </a>
                <button
                  onClick={onOpenTrial}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-[14.5px] transition-all"
                >
                  <IconZap className="w-4 h-4 text-amber-400 inline ml-1.5" /> تجربة مجانية للسيرفر
                </button>
                <button
                  onClick={() => setStep(0)}
                  className="w-full text-center text-[13px] text-gray-400 hover:text-white mt-3 underline"
                >
                  إعادة الاختبار من البداية
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
