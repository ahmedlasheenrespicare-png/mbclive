import { useEffect, useState } from "react";
import { IconChat, IconChevronDown, IconZap } from "./Icons";
import { getWhatsAppUrl } from "../data";

interface FloatingActionsProps {
  onOpenTrial: () => void;
}

/* تلميح أنيق يظهر عند المرور على الزر (يسار الزر — بعيد عن حافة الشاشة) */
function FabTooltip({ text }: { text: string }) {
  return (
    <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-full ms-3 whitespace-nowrap rounded-xl border border-white/15 bg-slate-900/95 px-3.5 py-2 text-[12.5px] font-black text-white opacity-0 translate-x-2 shadow-2xl transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
      {text}
    </span>
  );
}

export default function FloatingActions({ onOpenTrial }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* دخول متتابع بعد تحميل الصفحة — بنفس روح أنيميشن الكروت */
  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 500);
    return () => window.clearTimeout(t);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 start-6 z-40 flex flex-col items-start gap-3.5">

      {/* الرجوع للأعلى — يظهر بعد النزول في الصفحة */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="group animate-fab-in relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/90 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-slate-800 active:scale-95"
          aria-label="الرجوع للأعلى"
        >
          <IconChevronDown className="h-5 w-5 rotate-180" />
          <FabTooltip text="الرجوع للأعلى" />
        </button>
      )}

      {/* تجربة مجانية — أيقونة البرق */}
      <button
        onClick={onOpenTrial}
        className={`group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white shadow-2xl shadow-red-600/40 ring-2 ring-white/25 transition-all duration-300 hover:scale-110 active:scale-95 ${
          entered ? "animate-card-in" : "opacity-0"
        }`}
        style={{ animationDelay: "0ms" }}
        aria-label="تجربة مجانية 6 ساعات"
      >
        <IconZap className="h-5 w-5 text-yellow-300 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        <FabTooltip text="تجربة مجانية 6 ساعات" />
      </button>

      {/* واتساب — الزر الرئيسي الأكبر مع نبضة انتباه ناعمة */}
      <a
        href={getWhatsAppUrl("مرحبًا ستريم ماستر، أريد الاستفسار عن اشتراكات الـ IPTV")}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-2xl shadow-green-600/40 ring-2 ring-white/25 transition-all duration-300 hover:scale-110 active:scale-95 ${
          entered ? "animate-card-in" : "opacity-0"
        }`}
        style={{ animationDelay: "140ms" }}
        aria-label="تواصل عبر واتساب"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping-slow" />
        <IconChat className="relative h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
        <FabTooltip text="تواصل عبر واتساب" />
      </a>
    </div>
  );
}
