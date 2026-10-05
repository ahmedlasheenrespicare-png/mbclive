import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconArrow,
  IconArrowBack,
  IconChat,
  IconClock,
  IconPlay,
  IconShieldCheck,
  IconTrophy,
  IconTv,
  IconZap,
} from "./Icons";
import { getWhatsAppUrl } from "../data";

/* =========================================================================
   1. سلايدات الهيرو السينمائية — كل شريحة مرتبطة بقناة حية داخل المشغل
========================================================================= */
const STREAM_SLIDES = [
  {
    kicker: "تغطية كأس العالم 2026 والدوريات الكبرى",
    titleLine1: "أفضل سيرفرات IPTV 2026",
    titleLine2: "ثبات مطلق 99.9% بدون تقطيع",
    subtitle:
      "استمتع بمشاهدة جميع قنوات beIN Sports وSSC بجودة 4K فائقة و50fps وسيرفرات نوفا الأصلية بدون أي لاج أو انقطاع وقت ضغط المباريات.",
    img: "images/hero/slide-sports.jpg",
    badge: "بث مباشر 4K @ 50fps",
    channelsTag: "beIN Sports 1-9 • SSC 1-5 • Alkass",
    ctaText: "اختر باقتك واشترك الآن",
    ctaHref: "#pricing",
    cta2Text: "طلب تجربة مجانية",
    isTrialCta: true,
    channel: {
      switchLabel: "⚽ beIN Sports 4K",
      name: "beIN Sports 1 Premium",
      event: "دوري أبطال أوروبا — ريال مدريد × مانشستر سيتي",
      liveTag: "مباشر 4K",
      quality: "4K @ 50fps HDR",
      bitrate: "18.5 Mbps",
      server: "سيرفر نوفا VIP",
    },
  },
  {
    kicker: "مكتبة سينمائية عملاقة VOD",
    titleLine1: "+16,500 قناة حية مباشرة",
    titleLine2: "و+65,000 فيلم ومسلسل مترجم",
    subtitle:
      "مكتبة ترفيهية شاملة تضم أحدث أفلام السينما، مسلسلات نتفليكس وشاهد وOSN وDisney+ بجودة BluRay وترجمة فورية وصوت محيطي.",
    img: "images/hero/slide-cinema.jpg",
    badge: "مكتبة ترفيهية متجددة يومياً",
    channelsTag: "Netflix Originals • Shahid VIP • OSN • HBO",
    ctaText: "استكشف مكتبة القنوات",
    ctaHref: "#channels",
    cta2Text: "تواصل عبر واتساب",
    cta2Href: getWhatsAppUrl(
      "مرحبًا ستريم ماستر، أود معرفة القنوات المتوفرة والمكتبة الترفيهية"
    ),
    channel: {
      switchLabel: "🎬 سينما 4K",
      name: "Shahid VIP & Netflix Cinema",
      event: "أحدث الأفلام والمسلسلات الحصرية 2026",
      liveTag: "على الطلب 4K",
      quality: "True 4K UHD",
      bitrate: "22.0 Mbps",
      server: "سيرفر إيستار برو",
    },
  },
  {
    kicker: "تفعيل فوري ودعم فني 24/7",
    titleLine1: "سيرفرات نوفا وإيستار وموكا",
    titleLine2: "جاهزة على شاشتك في 5 دقائق",
    subtitle:
      "يعمل على كافة الشاشات الذكية Samsung وLG وأجهزة Android وApple TV مع دعم فني متواصل وضمان كامل طوال مدة اشتراكك.",
    img: "images/hero/slide-devices.jpg",
    badge: "تفعيل آلي خلال دقائق",
    channelsTag: "Samsung TV • LG • Android Box • Apple TV",
    ctaText: "مساعد اختيار السيرفر",
    ctaHref: "#server-finder",
    cta2Text: "دليل تشغيل الشاشات",
    cta2Href: "#setup",
    channel: {
      switchLabel: "🖥️ كل الشاشات",
      name: "تشغيل فوري على شاشتك",
      event: "Samsung • LG • Android • Apple TV — تفعيل خلال 5 دقائق",
      liveTag: "تفعيل فوري",
      quality: "FHD / 4K",
      bitrate: "بدون التزام",
      server: "جميع الأجهزة مدعومة",
    },
  },
];

const SLIDE_MS = 6000;

interface HeroProps {
  onOpenTrial: () => void;
}

/* =========================================================================
   2. الهيرو المدمج: سلايدر سينمائي + مشغل حي متزامن + كروت عائمة
========================================================================= */
export default function Hero({ onOpenTrial }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const cardsRef = useRef<HTMLElement | null>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + STREAM_SLIDES.length) % STREAM_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % STREAM_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  /* ظهور الكروت الثلاثة بأنيميشن متتابع — يتكرر كل مرة تدخل فيها الشاشة */
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCardsVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        setCardsVisible(entries.some((e) => e.isIntersecting));
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = STREAM_SLIDES[index];

  return (
    <div id="hero" className="w-full font-sans selection:bg-red-600 selection:text-white bg-[#0b0f19]">
      {/* =================================================================
         A: المسرح السينمائي — خلفية متغيرة + نص + مشغل حي متزامن
      ================================================================= */}
      <section
        className="relative w-full overflow-hidden bg-[#070a12] min-h-[420px] sm:min-h-[480px] flex items-start pt-10 sm:pt-12 lg:pt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="سلايدر ستريم ماستر برو"
      >
        {/* الخلفيات السينمائية */}
        {STREAM_SLIDES.map((s, i) => (
          <div
            key={s.img}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={s.img}
              alt=""
              className="h-full w-full object-cover object-center scale-105 transition-transform duration-10000"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#070a12]/92 via-[#070a12]/70 to-[#070a12]/30" />
            <div className="absolute inset-0 bg-[#070a12]/25" />
          </div>
        ))}

        {/* المحتوى الأمامي */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1370px] items-center justify-between gap-8 px-6 sm:px-10 lg:px-14 pb-40 sm:pb-48 lg:pb-52">

          {/* نص الشريحة */}
          <div className="flex-1 min-w-0 max-w-[680px]">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-purple-600 px-3.5 py-1 text-[11px] sm:text-[12.5px] font-black tracking-wider text-white shadow-lg rounded-sm uppercase">
              <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
              {current.kicker}
            </span>

            <h1 className="mt-4 text-[clamp(26px,4vw,52px)] font-black leading-[1.25] text-white tracking-tight drop-shadow-lg">
              <span className="block">{current.titleLine1}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 drop-shadow-md">
                {current.titleLine2}
              </span>
            </h1>

            <p className="mt-4 max-w-[580px] text-[14.5px] sm:text-[16.5px] leading-[1.8] text-gray-200 font-medium drop-shadow-md">
              {current.subtitle}
            </p>

            {/* أزرار الإجراء */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href={current.ctaHref}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-7 py-3.5 text-[14px] sm:text-[15.5px] font-black text-white shadow-xl shadow-red-600/30 transition-all hover:scale-102 rounded-md"
              >
                {current.ctaText} <IconArrow className="w-4 h-4" />
              </a>

              {current.isTrialCta ? (
                <button
                  onClick={onOpenTrial}
                  className="inline-flex items-center gap-2 border-2 border-amber-400/80 bg-amber-500/15 hover:bg-amber-500/30 backdrop-blur-md px-6 py-3 text-[13.5px] sm:text-[15px] font-extrabold text-amber-300 shadow-lg transition-all rounded-md"
                >
                  <IconZap className="w-4 h-4 text-amber-400" /> {current.cta2Text}
                </button>
              ) : (
                <a
                  href={current.cta2Href}
                  target={current.cta2Href?.startsWith("http") ? "_blank" : undefined}
                  rel={current.cta2Href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 border-2 border-white/40 bg-black/40 hover:bg-white hover:text-black backdrop-blur-md px-6 py-3 text-[13.5px] sm:text-[15px] font-bold text-white shadow-lg transition-all rounded-md"
                >
                  {current.cta2Text}
                </a>
              )}
            </div>

            {/* نقاط التنقل (موبايل فقط — الديسكتوب له ريموت المشغل) */}
            <div className="mt-6 flex items-center gap-2 lg:hidden">
              {STREAM_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`الانتقال إلى الشريحة ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-red-500 shadow-[0_0_10px_#ef4444]" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* المشغل الحي المتزامن — ريموت كنترول السلايدر (شاشات كبيرة) */}
          <div className="hidden lg:block w-[350px] xl:w-[400px] 2xl:w-[430px] shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-slate-900/80 backdrop-blur-md shadow-2xl shadow-black/60">

              {/* شاشة المشغل */}
              <div className="relative aspect-video w-full bg-black overflow-hidden group">
                {STREAM_SLIDES.map((s, i) => (
                  <img
                    key={s.img}
                    src={s.img}
                    alt={s.channel.name}
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${
                      i === index ? "opacity-85" : "opacity-0"
                    }`}
                    loading="lazy"
                  />
                ))}

                {/* شارات البث */}
                <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5">
                  <span className="bg-red-600 text-white text-[10.5px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    {current.channel.liveTag}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-amber-300 text-[10.5px] font-bold px-2 py-0.5 rounded border border-white/10">
                    {current.channel.bitrate}
                  </span>
                </div>

                <div className="absolute top-2.5 end-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                  {current.channel.server}
                </div>

                {/* زر التشغيل المركزي */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                  <button
                    onClick={onOpenTrial}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-2xl shadow-red-600/50 hover:scale-110 transition-transform ring-4 ring-white/30"
                    aria-label="تشغيل البث التجريبي"
                  >
                    <IconPlay className="h-6 w-6 mr-0.5" />
                  </button>
                </div>

                {/* شريط معلومات القناة */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-3.5 pb-2.5 pt-8 text-right">
                  <div className="text-[13px] font-black text-white leading-tight">{current.channel.name}</div>
                  <div className="text-[11px] text-gray-300 font-medium truncate">{current.channel.event}</div>
                </div>
              </div>

              {/* ريموت التبديل — يبدّل السلايد كله */}
              <div className="p-2.5 bg-slate-950/90 border-t border-white/10 grid grid-cols-3 gap-2">
                {STREAM_SLIDES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`relative overflow-hidden py-2 px-1 rounded-lg text-[11px] font-black text-center transition-all ${
                      i === index
                        ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {s.channel.switchLabel}
                    {/* شريط تقدم الشريحة النشطة */}
                    {i === index && (
                      <span
                        key={`prog-${index}-${paused}`}
                        className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-l from-amber-300 to-yellow-200 origin-right"
                        style={{
                          animation: `slideProgress ${SLIDE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* سطر الثقة تحت المشغل */}
            <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-bold text-gray-300">
              <span className="flex items-center gap-1.5">
                <IconShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ضمان كامل
              </span>
              <span className="flex items-center gap-1.5">
                <IconZap className="w-3.5 h-3.5 text-amber-400" /> تفعيل خلال 5 دقائق
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock className="w-3.5 h-3.5 text-red-400" /> دعم 24/7
              </span>
            </div>
          </div>
        </div>

        {/* أسهم التنقل */}
        <div className="absolute top-8 end-4 sm:end-8 z-10 flex items-center gap-2">
          <button
            onClick={() => go(index - 1)}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-black/60 text-white backdrop-blur-md border border-white/20 transition hover:bg-red-600 rounded-md"
            aria-label="الشريحة السابقة"
          >
            <IconArrowBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(index + 1)}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-black/60 text-white backdrop-blur-md border border-white/20 transition hover:bg-red-600 rounded-md"
            aria-label="الشريحة التالية"
          >
            <IconArrow className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =================================================================
         B: الكروت الثلاثة — طافية على الهيرو بأقصى تداخل (ارتفاع مضغوط)
      ================================================================= */}
      <section ref={cardsRef} className="relative z-30 -mt-36 sm:-mt-44 lg:-mt-48 px-3 sm:px-6 lg:px-12 pb-12 sm:pb-14 bg-transparent">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 md:grid-cols-3 shadow-[0_30px_90px_rgba(0,0,0,0.45),0_10px_30px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden ring-1 ring-white/15">

            {/* الكرت 1: أحمر — التجربة المجانية */}
            <div
              className={`flex flex-col justify-between bg-gradient-to-br from-[#dc2626] to-[#991b1b] px-6 sm:px-7 lg:px-8 py-7 sm:py-8 text-white transition-all hover:brightness-105 ${cardsVisible ? "animate-card-in" : "opacity-0"}`}
              style={{ animationDelay: "0ms" }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/25 pb-3.5">
                  <h2 className="text-[19px] sm:text-[21px] font-black text-white tracking-wide flex items-center gap-2">
                    <IconZap className="w-5 h-5 text-yellow-300" /> تجربة مجانية سريعة
                  </h2>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
                    <IconTv className="w-5 h-5" />
                  </span>
                </div>
                <p className="mt-3.5 text-[13.5px] sm:text-[14.5px] leading-[1.75] text-white/95 font-medium">
                  جرب السيرفر والقنوات الرياضية والترفيهية لمدة 6 ساعات مجاناً على شاشتك أو جوالك للتأكد من الثبات والجودة قبل الشراء.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[12px] text-white/85 font-bold block">التفعيل الفوري خلال 5 دقائق:</span>
                    <span className="text-[15px] sm:text-[17px] font-black text-yellow-300">
                      بدون أي التزام مسبق
                    </span>
                  </div>
                  <button
                    onClick={onOpenTrial}
                    className="inline-flex items-center gap-1.5 border border-white bg-white text-red-700 px-3.5 py-1.5 text-[12.5px] font-black transition hover:bg-yellow-300 hover:text-black rounded-md shadow-md shrink-0"
                  >
                    اطلب التجربة <IconArrow className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* الكرت 2: بنفسجي — المباريات والسيرفرات */}
            <div
              className={`flex flex-col justify-between bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] px-6 sm:px-7 lg:px-8 py-7 sm:py-8 text-white transition-all hover:brightness-105 ${cardsVisible ? "animate-card-in" : "opacity-0"}`}
              style={{ animationDelay: "140ms" }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/25 pb-3.5">
                  <h2 className="text-[19px] sm:text-[21px] font-black text-white tracking-wide flex items-center gap-2">
                    <IconTrophy className="w-5 h-5 text-amber-300" /> قنوات المباريات وسيرفر نوفا
                  </h2>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
                    <IconPlay className="w-5 h-5" />
                  </span>
                </div>
                <p className="mt-3.5 text-[13.5px] sm:text-[14.5px] leading-[1.75] text-white/95 font-medium">
                  سيرفرات نوفا الأصلية وإيستار وماستر الترا مع بث مباشر لقنوات beIN وSSC بدقة 4K وFHD وسيرفرات احتياطية وقت الذروة.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] text-white/95 font-bold">
                    باقات تبدأ من 65 ر.س
                  </span>
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-1.5 border border-white bg-white/20 px-3.5 py-1.5 text-[12.5px] font-extrabold text-white transition hover:bg-white hover:text-purple-900 rounded-md"
                  >
                    عرض الأسعار <IconArrow className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* الكرت 3: كحلي — الدعم والضمان */}
            <div
              className={`flex flex-col justify-between bg-gradient-to-br from-[#0f172a] to-[#020617] px-6 sm:px-7 lg:px-8 py-7 sm:py-8 text-white transition-all hover:brightness-105 border-t md:border-t-0 md:border-s border-white/10 ${cardsVisible ? "animate-card-in" : "opacity-0"}`}
              style={{ animationDelay: "280ms" }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/25 pb-3.5">
                  <h2 className="text-[19px] sm:text-[21px] font-black text-white tracking-wide flex items-center gap-2">
                    <IconShieldCheck className="w-5 h-5 text-emerald-400" /> ضمان الثبات والدعم 24/7
                  </h2>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
                    <IconClock className="w-5 h-5" />
                  </span>
                </div>

                <ul className="mt-2.5 divide-y divide-white/10 text-[12.5px]">
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-300 font-medium">خدمة العملاء والواتساب</span>
                    <div className="font-bold text-emerald-400">متاح 24 ساعة يومياً</div>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-300 font-medium">سرعة الرد والتفعيل</span>
                    <div className="font-bold text-white">أقل من 3 دقائق</div>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-300 font-medium">ضمان الاسترجاع</span>
                    <div className="font-bold text-yellow-300">ضمان كامل ومستمر</div>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/20">
                <a
                  href={getWhatsAppUrl("مرحبًا ستريم ماستر، أريد التحدث مع الدعم الفني للاشتراك")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 py-2.5 text-[13px] font-black text-white transition rounded-md shadow-md"
                >
                  <IconChat className="w-4 h-4" /> محادثة مباشرة عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
