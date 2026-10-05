import { useState } from "react";
import { IconCart, IconChat, IconChevronDown, IconClose, IconPlay, IconZap } from "./Icons";
import { CURRENCIES, getWhatsAppUrl } from "../data";

interface HeaderProps {
  currentCurrency: string;
  onCurrencyChange: (code: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTrial: () => void;
}

/* =========================================================================
   هيكل التنقل: روابط مباشرة + قوائم منسدلة مجمعة حسب الموضوع
========================================================================= */
const NAV_DIRECT = [
  { name: "الرئيسية", href: "#hero" },
  { name: "الباقات", href: "#pricing" },
  { name: "السيرفرات", href: "#servers-compare" },
];

const NAV_DROPDOWNS = [
  {
    label: "البث والقنوات",
    items: [
      { name: "🔴 البث المباشر", href: "#live-player", highlight: true },
      { name: "دليل القنوات", href: "#channels" },
      { name: "طريقة التشغيل", href: "#setup" },
    ],
  },
  {
    label: "المساعدة والدعم",
    items: [
      { name: "مساعد اختيار السيرفر", href: "#server-finder" },
      { name: "آراء المشتركين", href: "#reviews" },
      { name: "الأسئلة الشائعة", href: "#faq" },
    ],
  },
];

export default function Header({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  onOpenTrial,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Top Live Ticker Bar */}
      <div className="bg-gradient-to-r from-red-700 via-brand-red to-purple-800 text-white text-[12px] sm:text-[13px] py-1.5 px-3 font-bold border-b border-white/10">
        <div className="max-w-[1370px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
            <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] font-black uppercase">مباشر</span>
            <span className="truncate">
              ⚽ تغطية كاملة لدوري أبطال أوروبا وكأس العالم 2026 بأعلى ثبات 99.9%
            </span>
          </div>
          <button
            onClick={onOpenTrial}
            className="shrink-0 bg-white text-red-700 hover:bg-yellow-300 hover:text-black transition-all px-2.5 py-0.5 rounded-full text-[11px] sm:text-[12px] font-black flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <IconZap className="w-3 h-3" /> اطلب تجربة مجانية
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group shrink-0">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-purple-600 shadow-lg shadow-red-600/30 transition-transform group-hover:scale-105 ring-1 ring-white/20">
              <IconPlay className="h-6 w-6 text-white mr-0.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] sm:text-[19px] font-black text-white tracking-tight flex items-center gap-1.5">
                ستريم ماستر <span className="text-red-500 text-[14px] bg-red-500/15 px-1.5 py-0.5 rounded font-black">PRO</span>
              </span>
              <span className="text-[11px] text-gray-400 font-medium tracking-wider">Stream Master Pro</span>
            </div>
          </a>

          {/* Desktop Navigation: روابط مباشرة + قوائم منسدلة */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الرئيسي">
            {NAV_DIRECT.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-lg text-[13px] font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {NAV_DROPDOWNS.map((dd) => {
              const isOpen = openDropdown === dd.label;
              return (
                <div
                  key={dd.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(dd.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : dd.label)}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-bold transition-colors cursor-pointer ${
                      isOpen
                        ? "text-white bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {dd.label}
                    <IconChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      role="menu"
                      className="absolute top-full start-0 pt-2 animate-dropdown-in"
                    >
                      <div className="min-w-[220px] rounded-xl border border-white/15 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden py-1.5 ring-1 ring-black/30">
                        {dd.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center justify-between gap-3 px-4 py-2.5 text-[13px] font-bold transition-colors ${
                              item.highlight
                                ? "text-red-400 hover:bg-red-600/15"
                                : "text-gray-300 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {item.highlight && (
                                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                              )}
                              {item.name}
                            </span>
                            <span className="text-gray-600 text-[11px]">←</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <select
                aria-label="اختر العملة"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="h-9 sm:h-10 cursor-pointer rounded-xl border border-white/15 bg-white/5 px-2.5 sm:px-3 text-[12px] sm:text-[13px] font-black text-white transition-all hover:bg-white/10 focus:border-red-500 focus:outline-none"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white font-bold">
                    {c.symbol} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="سلة المشتريات"
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 cursor-pointer"
            >
              <IconCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Instant WhatsApp Order CTA (نص كامل على الشاشات العريقة فقط) */}
            <a
              href={getWhatsAppUrl("مرحبًا ستريم ماستر، أود الاستفسار عن باقات واشتراكات الـ IPTV")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 px-4 py-2.5 text-[13.5px] font-black text-white shadow-lg shadow-green-600/25 transition-all hover:scale-102"
            >
              <IconChat className="h-4 w-4" />
              <span className="hidden xl:inline">تواصل فوري</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white lg:hidden hover:bg-white/10 cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? (
                <IconClose className="h-5 w-5" />
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer — نفس التجميع بعناوين أقسام */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0b0f19]/98 px-5 py-5 backdrop-blur-2xl transition-all">
            <nav className="flex flex-col gap-2">
              {NAV_DIRECT.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] font-bold text-gray-200 hover:bg-white/10 hover:text-white transition-all flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-gray-500 text-sm">←</span>
                </a>
              ))}

              {NAV_DROPDOWNS.map((group) => (
                <div key={group.label} className="pt-2 mt-1 border-t border-white/10">
                  <span className="block px-4 pb-1.5 text-[11px] font-black text-gray-500 tracking-wider">
                    {group.label}
                  </span>
                  {group.items.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-xl px-4 py-3 text-[15px] font-bold transition-all flex items-center justify-between ${
                        link.highlight
                          ? "bg-red-600/20 text-red-400 border border-red-500/30"
                          : "text-gray-200 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-gray-500 text-sm">←</span>
                    </a>
                  ))}
                </div>
              ))}

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrial();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-[14.5px] shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconZap className="w-4 h-4" /> اطلب تجربة مجانية الآن
                </button>
                <a
                  href={getWhatsAppUrl("مرحبًا ستريم ماستر، أريد الاشتراك في سيرفر IPTV")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-black text-[14.5px] flex items-center justify-center gap-2"
                >
                  <IconChat className="w-4 h-4" /> تواصل عبر واتساب
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
