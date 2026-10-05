import { useState } from "react";
import { IconChat, IconClose, IconPlay, IconZap } from "./Icons";
import { getWhatsAppUrl } from "../data";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrialModal({ isOpen, onClose }: TrialModalProps) {
  const [device, setDevice] = useState("شاشة سامسونج / LG");
  const [server, setServer] = useState("سيرفر نوفا (Nova)");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `مرحبًا ستريم ماستر، أود طلب كود تجربة مجانية:\n- نوع الجهاز: ${device}\n- السيرفر المطلوب: ${server}\n- رقم الواتساب: ${phone || "نفس الرقم الحالي"}`;
    window.open(getWhatsAppUrl(msg), "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[500px] rounded-3xl bg-[#0f172a] border border-white/20 p-6 sm:p-8 shadow-2xl text-right">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 start-5 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5"
          aria-label="إغلاق"
        >
          <IconClose className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 text-white shadow-lg shadow-red-600/30 mb-2">
            <IconZap className="w-6 h-6" />
          </span>
          <h3 className="text-[22px] font-black text-white">
            طلب تجربة مجانية لمدة 6 ساعات
          </h3>
          <p className="text-[13.5px] text-gray-300 mt-1">
            جرب جميع القنوات الرياضية والترفيهية فوراً على جهازك قبل دفع أي مبلغ.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendRequest} className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-200 mb-1.5">
              نوع جهازك:
            </label>
            <select
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] font-bold text-white focus:border-red-500 focus:outline-none"
            >
              <option value="شاشة سامسونج أو LG Smart TV" className="bg-slate-900">شاشة سامسونج أو LG Smart TV</option>
              <option value="جهاز Android Box / Firestick" className="bg-slate-900">جهاز Android Box / Firestick</option>
              <option value="Apple TV / iPhone / iPad" className="bg-slate-900">Apple TV / iPhone / iPad</option>
              <option value="كمبيوتر ولابتوب (Windows/Mac)" className="bg-slate-900">كمبيوتر ولابتوب (Windows/Mac)</option>
              <option value="جوال أندرويد" className="bg-slate-900">جوال أندرويد</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-200 mb-1.5">
              السيرفر المراد تجربته:
            </label>
            <select
              value={server}
              onChange={(e) => setServer(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] font-bold text-white focus:border-red-500 focus:outline-none"
            >
              <option value="سيرفر نوفا (Nova Server) — الأفضل للمباريات" className="bg-slate-900">سيرفر نوفا (Nova) — الأفضل للمباريات ⚽</option>
              <option value="ماستر الترا (Master Ultra 4K) — باقة الـ VIP" className="bg-slate-900">ماستر الترا (Ultra 4K) — باقة الـ VIP 👑</option>
              <option value="سيرفر إيستار (iStar Pro) — الترفيه والأفلام" className="bg-slate-900">سيرفر إيستار (iStar) — الترفيه والأفلام 🎬</option>
              <option value="سيرفر موكا (Moka) — الاقتصادي للنت الضعيف" className="bg-slate-900">سيرفر موكا (Moka) — الاقتصادي ⚡</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-200 mb-1.5">
              رقم الواتساب لإرسال الكود:
            </label>
            <input
              type="tel"
              placeholder="مثال: 05xxxxxxxx أو 010xxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] font-bold text-white focus:border-red-500 focus:outline-none placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-[15px] shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all mt-4"
          >
            <IconChat className="w-5 h-5" /> إرسال طلب التجربة فوراً عبر واتساب
          </button>
        </form>

        <p className="text-[11.5px] text-gray-400 text-center mt-4">
          يتم إرسال كود التجربة وشرح التشغيل خلال أقل من 5 دقائق عبر واتساب.
        </p>
      </div>
    </div>
  );
}
