import type { CSSProperties } from "react";

/* =========================================================================
   جدارية الشعارات — تكوين مركزي وصفوف مائلة بحركة مستمرة
   الشعارات محلية (public/images/logos) وخلفية كل كارت حسب سطوع اللوجو
========================================================================= */

interface Brand {
  name: string;
  file: string;
  dark: boolean; // true = اللوجو فاتح → كارت غامق
  glow: string; // لون التوهج عند المرور
}

/* الصف الأول: عربي ورياضة */
const ROW_ARABIC: Brand[] = [
  { name: "beIN Sports", file: "images/logos/bein.png", dark: false, glow: "rgba(139, 92, 246, 0.5)" },
  { name: "SSC 1", file: "images/logos/ssc.png", dark: false, glow: "rgba(245, 158, 11, 0.5)" },
  { name: "Alkass", file: "images/logos/alkass.png", dark: false, glow: "rgba(59, 130, 246, 0.5)" },
  { name: "Abu Dhabi Sports", file: "images/logos/adsports.png", dark: true, glow: "rgba(16, 185, 129, 0.5)" },
  { name: "MBC", file: "images/logos/mbc.png", dark: false, glow: "rgba(245, 158, 11, 0.5)" },
  { name: "شاهد VIP", file: "images/logos/shahid.png", dark: false, glow: "rgba(20, 184, 166, 0.5)" },
  { name: "Rotana", file: "images/logos/rotana.png", dark: true, glow: "rgba(236, 72, 153, 0.5)" },
  { name: "OSN", file: "images/logos/osn.png", dark: false, glow: "rgba(239, 68, 68, 0.5)" },
];

/* الصف الثاني: منصات عالمية */
const ROW_GLOBAL: Brand[] = [
  { name: "Netflix", file: "images/logos/netflix.png", dark: false, glow: "rgba(229, 9, 20, 0.55)" },
  { name: "Apple TV+", file: "images/logos/appletv.png", dark: false, glow: "rgba(71, 85, 105, 0.5)" },
  { name: "Paramount+", file: "images/logos/paramount.png", dark: false, glow: "rgba(0, 100, 255, 0.5)" },
  { name: "HBO", file: "images/logos/hbo.png", dark: false, glow: "rgba(148, 163, 184, 0.5)" },
  { name: "National Geographic", file: "images/logos/natgeo.png", dark: false, glow: "rgba(251, 191, 36, 0.55)" },
  { name: "Discovery", file: "images/logos/discovery.png", dark: false, glow: "rgba(96, 165, 250, 0.5)" },
  { name: "Cartoon Network", file: "images/logos/cartoon.png", dark: false, glow: "rgba(244, 63, 94, 0.5)" },
];

function LogoCard({ b }: { b: Brand }) {
  return (
    <div
      className={`group flex h-[78px] shrink-0 items-center justify-center rounded-xl border px-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.05] hover:shadow-[0_16px_40px_-10px_var(--glow)] ${
        b.dark
          ? "border-white/15 bg-white/[0.07] hover:border-white/30"
          : "border-black/[0.07] bg-[#f2f3f6] hover:border-black/[0.12]"
      }`}
      style={{ "--glow": b.glow } as CSSProperties}
    >
      <img
        src={b.file}
        alt={b.name}
        title={b.name}
        className="max-h-11 w-auto max-w-[124px] object-contain transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export default function ContentTicker() {
  return (
    <section
      className="bg-dots relative overflow-hidden border-y border-white/10 bg-[#070a12] py-12 sm:py-14"
      aria-label="القنوات والمنصات المتوفرة داخل الاشتراك"
    >
      {/* توهج خافت خلف العنوان */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-red-600/[0.07] to-transparent" />

      {/* العنوان — تكوين مركزي بزخارف جانبية */}
      <div className="relative mx-auto mb-10 max-w-[1370px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/70 sm:w-20" />
          <span className="text-[12.5px] font-black tracking-wide text-gray-300 sm:text-[13.5px]">
            🛰️ الترفيه بلا حدود
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/70 sm:w-20" />
        </div>

        <h2 className="mt-4 text-center text-[clamp(24px,3.4vw,38px)] font-black leading-tight tracking-tight text-white">
          قنوات ومنصات يعرفها العالم كله
          <span className="bg-gradient-to-l from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
            {" "}في اشتراك واحد
          </span>
        </h2>

        <p className="mt-3 text-center text-[13px] font-bold text-gray-400 sm:text-[15px]">
          الرياضة والسينما والأطفال — كل العلامات الأشهر بين يديك
          <span className="mr-2 text-[11.5px] font-medium text-gray-500">
            (مرّر على أي شريط للإيقاف المؤقت)
          </span>
        </p>
      </div>

      {/* الصفان المائلان بحركة متعاكسة — كل صف في غلاف يحمل الميل */}
      <div className="relative py-4" dir="ltr">
        <div className="scale-[1.03] rotate-[1.4deg]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...ROW_ARABIC, ...ROW_ARABIC].map((b, i) => (
              <div key={`a-${i}`} className="pe-4"><LogoCard b={b} /></div>
            ))}
          </div>
        </div>
        <div className="mt-5 scale-[1.03] -rotate-[1.1deg]">
          <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...ROW_GLOBAL, ...ROW_GLOBAL].map((b, i) => (
              <div key={`g-${i}`} className="pe-4"><LogoCard b={b} /></div>
            ))}
          </div>
        </div>

        {/* تلاشي ناعم عند الطرفين */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#070a12] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#070a12] to-transparent sm:w-28" />
      </div>

      {/* إخلاء مسؤولية العلامات التجارية */}
      <p className="relative mx-auto mt-8 max-w-[1370px] px-4 text-center text-[11.5px] leading-relaxed text-gray-500 sm:px-6 lg:px-8">
        شعارات القنوات والمنصات علامات تجارية مسجلة مملوكة لأصحابها — وتُعرض هنا للدلالة على المحتوى المتوفر في الاشتراكات فقط
      </p>
    </section>
  );
}
