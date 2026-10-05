import { IconPlay, IconChat, IconShieldCheck, IconZap } from "./Icons";
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from "../data";

interface FooterProps {
  onOpenTrial: () => void;
}

export default function Footer({ onOpenTrial }: FooterProps) {
  return (
    <footer className="bg-[#05080f] text-gray-400 border-t border-white/10 pt-16 pb-12 text-right">
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-purple-600 text-white shadow-lg shadow-red-600/30">
                <IconPlay className="h-6 w-6 mr-0.5" />
              </div>
              <div>
                <span className="text-[20px] font-black text-white tracking-tight flex items-center gap-1.5">
                  ستريم ماستر <span className="text-red-500 text-[14px] bg-red-500/15 px-1.5 py-0.5 rounded font-black">PRO</span>
                </span>
                <span className="text-[11px] text-gray-500 block font-medium">Stream Master Pro</span>
              </div>
            </div>

            <p className="text-[14px] text-gray-300 leading-[1.8] max-w-[380px]">
              المنصة الرائدة في اشتراكات وسيرفرات الـ IPTV في السعودية والخليج ومصر والعالم العربي. ثبات 99.9% في قمة المباريات مع مكتبة أفلام ومسلسلات ضخمة محدثة يومياً.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppUrl("مرحبًا ستريم ماستر، لدي استفسار")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl text-[12.5px] font-bold hover:bg-emerald-600 hover:text-white transition-all"
              >
                <IconChat className="w-4 h-4" /> واتساب: {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-[15px] font-black text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><a href="#hero" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">الباقات والأسعار</a></li>
              <li><a href="#server-finder" className="hover:text-white transition-colors">مساعد الاختيار الذكي</a></li>
              <li><a href="#servers-compare" className="hover:text-white transition-colors">مقارنة السيرفرات</a></li>
              <li><a href="#channels" className="hover:text-white transition-colors">مكتبة القنوات</a></li>
              <li><a href="#setup" className="hover:text-white transition-colors">طريقة تشغيل الشاشات</a></li>
            </ul>
          </div>

          {/* Col 3: Servers */}
          <div>
            <h4 className="text-[15px] font-black text-white mb-4">السيرفرات المتاحة</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><a href="#pricing" className="hover:text-red-400 transition-colors">سيرفر نوفا الأصلي (Nova)</a></li>
              <li><a href="#pricing" className="hover:text-amber-400 transition-colors">ماستر الترا VIP (4K Dual)</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">سيرفر إيستار برو (iStar)</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">سيرفر موكا الاقتصادي (Moka)</a></li>
              <li>
                <button onClick={onOpenTrial} className="text-yellow-400 font-bold hover:underline">
                  طلب تجربة مجانية 6 ساعات
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Guarantee */}
          <div>
            <h4 className="text-[15px] font-black text-white mb-4">الضمان والدعم</h4>
            <div className="space-y-3 text-[13px]">
              <div className="flex items-center gap-2 text-gray-300">
                <IconShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>ضمان ثبات كامل طوال المدة</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <IconZap className="w-5 h-5 text-red-400 shrink-0" />
                <span>تفعيل فوري خلال 5 دقائق</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <IconChat className="w-5 h-5 text-blue-400 shrink-0" />
                <span>دعم فني متواصل 24/7</span>
              </div>
              <p className="text-[12px] text-gray-500 pt-2">
                طرق الدفع: مدى، فيزا، ماستركارد، STC Pay، فودافون كاش، إنستاباي، تحويل بنكي، USDT.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-gray-500">
          <p>© {new Date().getFullYear()} ستريم ماستر برو (Stream Master Pro). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span>ثبات 99.9%</span>
            <span>•</span>
            <span>بث 4K بدون تقطيع</span>
            <span>•</span>
            <span>سيرفرات معتمدة 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
