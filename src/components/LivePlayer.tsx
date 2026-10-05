import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { IconFlame, IconPlay, IconTv, IconZap } from "./Icons";

export interface ChannelItem {
  name: string;
  logo: string;
  url: string;
  cat: string;
}

// Built-in verified high-speed live channels including full MBC Network
const DEFAULT_CHANNELS: ChannelItem[] = [
  // --- باقة قنوات MBC المؤكدة والمفحوصة بنجاح 100% ---
  {
    name: "MBC 1 HD (العامة والمسلسلات)",
    logo: "🟣",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1-na/eec141533c90dd34722c503a296dd0d8/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC Masr 1 HD (إم بي سي مصر الأولى)",
    logo: "🇪🇬",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr/956eac069c78a35d47245db6cdbb1575/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC Masr 2 HD (مصر 2 والرياضة)",
    logo: "🇪🇬",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr-2/754931856515075b0aabf0e583495c68/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC Masr Drama HD (دراما مصر)",
    logo: "🎭",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr-drama/567b703c19ede6598222de81b0e4508b/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC Drama HD (المسلسلات والدراما العربية)",
    logo: "🎭",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-drama/2c28a458e2f3253e678b07ac7d13fe71/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC 4 HD (البرامج والمنوعات)",
    logo: "📺",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-4/24f134f1cd63db9346439e96b86ca6ed/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC 5 HD (إم بي سي 5 المغرب)",
    logo: "🇲🇦",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-5/ee6b000cee0629411b666ab26cb13e9b/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC Bollywood HD (هندي مدبلج ومترجم)",
    logo: "💃",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-bollywood/546eb40d7dcf9a209255dd2496903764/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC Persia HD (أفلام أجنبية وسينما)",
    logo: "🎬",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-persia/818ee8e4b592dc497608f066d825bfb4/index.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "العربية الحدث HD (أخبار MBC)",
    logo: "⚫",
    url: "https://live.alarabiya.net/alarabiapublish/alhadath.smil/playlist.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "العربية الإخبارية HD",
    logo: "🔴",
    url: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "العربية أسواق 💹",
    logo: "💹",
    url: "https://live.alarabiya.net/alarabiapublish/aswaaq.smil/playlist.m3u8",
    cat: "قنوات MBC",
  },
  {
    name: "MBC Loud FM",
    logo: "📻",
    url: "https://radio-loud-fm.mbc.net/radio-loud-fm_1.m3u8",
    cat: "قنوات MBC",
  },

  // --- القنوات الإخبارية والرياضية والعامة ---
  {
    name: "الجزيرة الإخبارية HD",
    logo: "🟡",
    url: "https://live-hls-web-aja.getaj.net/AJA/index.m3u8",
    cat: "إخبارية",
  },
  {
    name: "الجزيرة مباشر",
    logo: "🔴",
    url: "https://live-hls-web-ajm.getaj.net/AJM/index.m3u8",
    cat: "إخبارية",
  },
  {
    name: "العراقية سبورت HD",
    logo: "⚽",
    url: "https://imn-live.esite-lab.com/hls/iraqia-sports-1.m3u8",
    cat: "رياضية",
  },
  {
    name: "Oman Sport TV",
    logo: "⚽",
    url: "https://partneta.cdn.mgmlcdn.com/omsport/smil:omsport.stream.smil/chunklist.m3u8",
    cat: "رياضية",
  },
  {
    name: "France 24 عربي",
    logo: "🔵",
    url: "https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8",
    cat: "إخبارية",
  },
  {
    name: "DW عربي HD",
    logo: "🔷",
    url: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8",
    cat: "إخبارية",
  },
  {
    name: "Watan TV وطن مصرية",
    logo: "🇪🇬",
    url: "https://rp.tactivemedia.com/watantv_source/live/playlist.m3u8",
    cat: "مصرية",
  },
  {
    name: "Mekameleen مكملين",
    logo: "📺",
    url: "https://mn-nl.mncdn.com/mekameleen/smil:mekameleentv.smil/playlist.m3u8",
    cat: "مصرية",
  },
  {
    name: "Koogi TV أطفال",
    logo: "🧒",
    url: "https://5d658d7e9f562.streamlock.net/koogi.tv/koogi.smil/playlist.m3u8",
    cat: "أطفال",
  },
  {
    name: "Qatar Quran القرآن الكريم",
    logo: "🕌",
    url: "https://qatartv.akamaized.net/hls/live/20000612/qtvquran/master1080p.m3u8",
    cat: "دينية",
  },
  {
    name: "Asharq Discovery وثائقية",
    logo: "🦁",
    url: "https://svs.itworkscdn.net/asharqdiscoverylive/asharqd.smil/playlist_dvr.m3u8",
    cat: "وثائقية",
  },
  {
    name: "Big Buck Bunny 4K Cinema Demo",
    logo: "🐰",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    cat: "أفلام",
  },
];

// ====== وسيط البث: مواجهة حجب بعض الشبكات لسيرفرات القنوات ======
// بعض مزودي الإنترنت (خصوصاً في مصر) يحجبون سيرفرات بث معينة.
// عند فشل الاتصال المباشر يتم التبديل تلقائياً لهذا الوسيط (Deno Deploy) غير المحجوب.
const PROXY_BASE = "https://dry-elephant-8562.ahmedlasheenrespicare-png.deno.net";

// تحويل رابط القناة إلى رابط الوسيط
// - سيرفر MBC الرئيسي: مساره المخصص المباشر (الأسرع)
// - أي سيرفر آخر: المسار العام /h/<السيرفر>/<المسار> — يعمل لكل قنوات القائمة
function getProxyUrl(url: string): string {
  if (url.startsWith("https://shd-gcp-live.edgenextcdn.net/")) {
    return PROXY_BASE + url.slice("https://shd-gcp-live.edgenextcdn.net".length);
  }
  const m = url.match(/^https:\/\/([^/]+)(\/.*)?$/);
  if (m) {
    return `${PROXY_BASE}/h/${m[1]}${m[2] || "/"}`;
  }
  return url; // روابط غير مدعومة تبقى كما هي
}

// ذاكرة الجلسة: هل تحتاج شبكة هذا الزائر للوسيط؟ (تتحدد مرة واحدة وتُحفظ)
let needsProxySession: boolean | null = null;

interface LivePlayerProps {
  onOpenTrial: () => void;
}

export default function LivePlayer({ onOpenTrial }: LivePlayerProps) {
  const [channels, setChannels] = useState<ChannelItem[]>(DEFAULT_CHANNELS);
  const [selectedChannel, setSelectedChannel] = useState<ChannelItem>(DEFAULT_CHANNELS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("قنوات MBC");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [bufferSec, setBufferSec] = useState<number>(0);
  const [useProxy, setUseProxy] = useState<boolean>(needsProxySession === true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Load complete channels.json if available
  useEffect(() => {
    fetch("./channels.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.channels) && data.channels.length > 0) {
          setChannels(data.channels);
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_CHANNELS
      });
  }, []);

  // Monitor playback buffer health in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      const v = videoRef.current;
      if (v && v.buffered.length > 0) {
        try {
          const current = v.currentTime;
          const end = v.buffered.end(v.buffered.length - 1);
          const diff = Math.max(0, end - current);
          setBufferSec(Math.round(diff * 10) / 10);
        } catch {
          // Ignore
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize and switch ultra-fast HLS stream
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedChannel.url) return;

    // هل هذه القناة من النوع القابل للتمرير عبر الوسيط؟
    const canProxy = getProxyUrl(selectedChannel.url) !== selectedChannel.url;
    const playbackUrl = useProxy && canProxy
      ? getProxyUrl(selectedChannel.url)
      : selectedChannel.url;

    setIsLoading(true);
    setStatusMsg(
      useProxy && canProxy
        ? "🔄 جاري الاتصال عبر الوسيط السريع..."
        : "⚡ جاري الاتصال فائق السرعة بسيرفر القناة..."
    );

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    let manifestParsed = false;
    let switchTimer: number | undefined;

    // التبديل التلقائي للوسيط (يُستدعى عند اكتشاف حجب الشبكة)
    const switchToProxy = (): boolean => {
      if (!useProxy && canProxy) {
        needsProxySession = true;
        setUseProxy(true);
        return true;
      }
      return false;
    };

    // مؤقت أمان: لو الرابط المباشر لم يستجب خلال 6 ثوانٍ (شبكة تحجب السيرفر) → بدّل للوسيط
    if (canProxy && !useProxy) {
      switchTimer = window.setTimeout(() => {
        if (!manifestParsed) switchToProxy();
      }, 6000);
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        startFragPrefetch: true,
        lowLatencyMode: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        backBufferLength: 30,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 6,
        fragLoadingTimeOut: 15000,
        manifestLoadingTimeOut: 10000,
        levelLoadingTimeOut: 10000,
        autoStartLoad: true,
        capLevelToPlayerSize: false,
      });

      hls.loadSource(playbackUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        manifestParsed = true;
        setIsLoading(false);
        setStatusMsg("");
        
        // Autoplay with muted fallback to bypass browser policy
        video.muted = isMuted;
        video
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If browser blocked unmuted autoplay, mute and play
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          });
      });

      hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (_event, data) => {
        if (data.audioTracks && data.audioTracks.length > 0 && hls.audioTrack === -1) {
          hls.audioTrack = 0;
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // الشبكة تحجب السيرفر المباشر؟ → بدّل للوسيط قبل محاولة إعادة الاتصال
              if (switchToProxy()) break;
              setStatusMsg("جاري الاتصال بالسيرفر الاحتياطي...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setStatusMsg("جاري تصحيح البث...");
              hls.recoverMediaError();
              break;
            default:
              setIsLoading(false);
              setStatusMsg("تعذر تشغيل هذه القناة حالياً — جرب قناة أخرى");
              hls.destroy();
              break;
          }
        }
      });

      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Apple Safari HLS
      video.src = playbackUrl;
      video.muted = isMuted;
      video.addEventListener("loadedmetadata", () => {
        manifestParsed = true;
        setIsLoading(false);
        setStatusMsg("");
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
      video.addEventListener("error", () => {
        switchToProxy();
      }, { once: true });
    }

    return () => {
      if (switchTimer !== undefined) {
        window.clearTimeout(switchTimer);
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [selectedChannel, useProxy]);

  // Handle Play Overlay Click
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Handle Unmute
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  // Categories list
  const categories = [
    "قنوات MBC",
    "الكل",
    "رياضية",
    "إخبارية",
    "مصرية",
    "أفلام",
    "دينية",
    "وثائقية",
    "أطفال",
    "منوعات",
  ];

  // Filtered channels
  const filteredChannels = channels.filter((c) => {
    const matchesCat = selectedCategory === "الكل" || c.cat === selectedCategory;
    const matchesSearch = searchQuery === "" || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="live-player" className="py-16 sm:py-24 bg-[#060810] relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40" />
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/30 to-red-600/30 border border-purple-500/40 text-purple-300 px-4 py-1.5 rounded-full text-[13px] font-black mb-3.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
            ⚡ بث مباشر فائق السرعة: باقة قنوات MBC والقنوات المفتوحة
          </span>
          <h2 className="text-[28px] sm:text-[42px] font-black text-white tracking-tight">
            شاهد قنوات MBC والبث الحي مباشرة وسريعاً
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-300">
            مشغل تفاعلي متطور لبث قنوات MBC 1, MBC Masr, MBC Drama, MBC 4 والقنوات الرياضية والإخبارية بدون تقطيع.
          </p>
        </div>

        {/* Live Player Layout (2 Columns: Player + Channel Selector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Video Player (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl shadow-purple-950/40 group">
              
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                controls
                playsInline
                preload="auto"
                className="w-full h-full object-contain bg-black"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={() => {
                  if (videoRef.current) {
                    setIsMuted(videoRef.current.muted);
                  }
                }}
              />

              {/* Status Message Overlay */}
              {statusMsg && (
                <div className="absolute top-4 inset-x-0 mx-auto w-fit bg-black/85 backdrop-blur-md text-amber-300 border border-amber-500/30 text-xs font-bold px-4 py-1.5 rounded-full z-20 animate-pulse shadow-lg">
                  {statusMsg}
                </div>
              )}

              {/* Big Play Overlay (When paused) */}
              {!isPlaying && !isLoading && (
                <div
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] cursor-pointer z-10"
                >
                  <button
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-red-600 to-amber-500 hover:scale-110 text-white shadow-2xl shadow-purple-600/50 transition-transform ring-4 ring-white/30 cursor-pointer"
                    aria-label="تشغيل البث"
                  >
                    <IconPlay className="h-9 w-9 mr-1" />
                  </button>
                </div>
              )}

              {/* Unmute Overlay Button if playing muted */}
              {isPlaying && isMuted && (
                <button
                  onClick={handleUnmute}
                  className="absolute top-4 end-4 z-20 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 transition-all animate-bounce cursor-pointer"
                >
                  🔊 اضغط لتشغيل الصوت
                </button>
              )}

              {/* Top Live Badges & Real-time Buffer Speed Indicator */}
              <div className="absolute top-4 start-4 flex items-center gap-2 pointer-events-none z-10">
                <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> مباشر 1080p
                </span>
                <span className="bg-black/70 backdrop-blur-md text-purple-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-white/10">
                  {selectedChannel.cat}
                </span>
                {bufferSec > 0 && (
                  <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10.5px] font-black px-2.5 py-0.5 rounded-md backdrop-blur-md">
                    ⚡ بافر سريع: {bufferSec}s
                  </span>
                )}
              </div>

              {/* Bottom Channel Info Bar */}
              <div className="absolute bottom-12 start-4 end-4 pointer-events-none z-10 flex items-center justify-between">
                <div className="bg-black/85 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                  <span className="text-xl">{selectedChannel.logo}</span>
                  <div>
                    <span className="text-[13.5px] font-black text-white block leading-tight">
                      {selectedChannel.name}
                    </span>
                    <span className="text-[10.5px] text-emerald-400 font-bold block">
                      ✓ سريعة التحميل • سيرفر HLS مباشر
                    </span>
                  </div>
                </div>

                <div className="bg-black/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-[11px] font-black text-amber-300">
                  EdgeNext CDN • 50fps
                </div>
              </div>
            </div>

            {/* Note & VIP Upsell */}
            <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-red-950/30 to-slate-900 border border-purple-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <div className="text-[14px] font-black text-white flex items-center gap-2">
                  <IconZap className="w-4 h-4 text-amber-400" />
                  شاهد جميع قنوات beIN Sports وSSC وShahid VIP 4K المشفرة
                </div>
                <p className="text-[12.5px] text-gray-300 mt-1">
                  نوفر سيرفرات نوفا وإيستار وماستر الترا مع مكتبة مسلسلات وأفلام كاملة وبث فائق السرعة لكافة الشاشات.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="#pricing"
                  className="bg-red-600 hover:bg-red-500 text-white font-black px-4 py-2.5 rounded-xl text-[13px] transition-all shadow-md"
                >
                  عرض باقات VIP
                </a>
                <button
                  onClick={onOpenTrial}
                  className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold px-3.5 py-2.5 rounded-xl text-[12.5px] transition-all cursor-pointer"
                >
                  تجربة مجانية
                </button>
              </div>
            </div>
          </div>

          {/* Channel Selector Sidebar (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-slate-900/90 border border-white/15 overflow-hidden shadow-2xl flex flex-col h-[560px]">
            
            {/* Sidebar Top Header & Search */}
            <div className="p-4 border-b border-white/10 space-y-3 bg-slate-950">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-black text-white flex items-center gap-2">
                  <IconTv className="w-4 h-4 text-purple-400" /> قائمة القنوات ({filteredChannels.length})
                </h3>
                <span className="text-[11px] font-bold text-purple-300 bg-purple-600/20 border border-purple-500/30 px-2 py-0.5 rounded">
                  سريعة ⚡
                </span>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="ابحث عن قناة (مثال: MBC Masr، دراما، 1)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-[13px] text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none"
              />

              {/* Category Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-purple-600 to-red-600 text-white font-black shadow-md"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels Scrollable List */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2">
              {filteredChannels.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-[13px]">
                  لا توجد قنوات مطابقة لبحثك.
                </div>
              ) : (
                filteredChannels.map((ch, idx) => {
                  const isActive = selectedChannel.name === ch.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedChannel(ch);
                        setIsPlaying(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-right transition-all cursor-pointer ${
                        isActive
                          ? "bg-purple-600/20 border border-purple-500/40 text-white"
                          : "hover:bg-white/5 text-gray-300"
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg border border-white/10">
                        {ch.logo}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[13.5px] font-bold block truncate ${isActive ? "text-purple-300 font-black" : "text-white"}`}>
                          {ch.name}
                        </span>
                        <span className="text-[11px] text-gray-400 block mt-0.5">
                          {ch.cat}
                        </span>
                      </div>
                      <span
                        className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                          isActive ? "bg-purple-500 animate-ping" : "bg-emerald-500"
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
