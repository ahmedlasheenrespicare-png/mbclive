import { useState } from "react";
import { APPS_AND_DEVICES, getWhatsAppUrl } from "../data";
import { IconChat, IconCheck, IconDevices, IconPlay } from "./Icons";

export default function SetupGuide() {
  const [activeDeviceIdx, setActiveDeviceIdx] = useState(0);

  const currentDevice = APPS_AND_DEVICES[activeDeviceIdx];

  return (
    <section id="setup" className="py-16 sm:py-24 bg-[#0a0e1a] relative">
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 px-3.5 py-1 rounded-full text-[12.5px] font-black mb-3">
            <IconDevices className="w-4 h-4" /> سهولة التشغيل والضبط
          </span>
          <h2 className="text-[28px] sm:text-[40px] font-black text-white tracking-tight">
            يعمل على جميع الشاشات والأجهزة
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-300">
            تثبيت سهل وخطوات واضحة في أقل من 3 دقائق، مع دعم فني خطوة بخطوة عبر واتساب.
          </p>

          {/* Device Tabs */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-[900px] mx-auto">
            {APPS_AND_DEVICES.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDeviceIdx(idx)}
                className={`p-3.5 rounded-2xl text-[13px] sm:text-[14px] font-bold text-center transition-all ${
                  activeDeviceIdx === idx
                    ? "bg-gradient-to-r from-red-600 to-purple-600 text-white font-black shadow-lg shadow-red-600/25 ring-2 ring-white/30"
                    : "bg-slate-900 border border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {d.device.split("(")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Device Guide Content Box */}
        <div className="max-w-[950px] mx-auto rounded-3xl border border-white/15 bg-slate-900/90 p-6 sm:p-10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Left Steps */}
            <div className="space-y-6">
              <div>
                <span className="text-[12px] font-black text-red-400 uppercase tracking-wider block">
                  دليل التشغيل
                </span>
                <h3 className="text-[22px] sm:text-[26px] font-black text-white mt-1">
                  {currentDevice.device}
                </h3>
                <p className="text-[14.5px] text-gray-300 mt-2">
                  {currentDevice.desc}
                </p>
              </div>

              {/* 3 Step Instruction */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white text-xs font-black">
                    1
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-white">تحميل التطبيق المناسب</h4>
                    <p className="text-[12.5px] text-gray-400 mt-0.5">
                      قم بتنزيل أحد التطبيقات المدعومة من متجر تطبيقات جهازك (App Store / Google Play / LG Store).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white text-xs font-black">
                    2
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-white">إدخال كود الاشتراك</h4>
                    <p className="text-[12.5px] text-gray-400 mt-0.5">
                      أدخل بيانات Xtream Codes (اسم المستخدم وكلمة المرور ورابط السيرفر) التي نرسلها لك فوراً.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white text-xs font-black">
                    3
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-white">استمتع بالبث المباشر</h4>
                    <p className="text-[12.5px] text-gray-400 mt-0.5">
                      سيتم تحميل القنوات والمكتبة فوراً، وابدأ بالمشاهدة بجودة 4K مباشرة.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Recommended Apps Pill Grid */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-white/10">
              <h4 className="text-[15px] font-black text-white mb-4 flex items-center gap-2">
                <IconPlay className="w-4 h-4 text-red-500" /> أفضل التطبيقات المقترحة لجهازك:
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {currentDevice.apps.map((app, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-center text-[13px] font-bold text-gray-200"
                  >
                    ⭐ {app}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 text-center">
                <p className="text-[12.5px] text-gray-400 mb-3">
                  هل تحتاج لمساعدة في تنزيل وضبط التطبيق على جهازك؟
                </p>
                <a
                  href={getWhatsAppUrl(`مرحبًا ستريم ماستر، أحتاج مساعدة في تشغيل الاشتراك على ${currentDevice.device}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-[13px] font-black transition-all shadow-md"
                >
                  <IconChat className="w-4 h-4" /> تواصل مع الدعم للمساعدة الفورية
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
