import { TESTIMONIALS } from "../data";
import { IconStar } from "./Icons";

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#070a12] relative overflow-hidden">
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 px-3.5 py-1 rounded-full text-[12.5px] font-black mb-3">
            <IconStar className="w-4 h-4 text-amber-400" /> تقييمات العملاء الموثقة
          </span>
          <h2 className="text-[28px] sm:text-[40px] font-black text-white tracking-tight">
            ماذا يقول مشتركونا عن ستريم ماستر؟
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-300">
            أكثر من 45,000 عميل يثقون في سيرفراتنا لتغطية أهم المباريات وأفلام السينما.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-7 hover:border-red-500/40 transition-all hover:-translate-y-1"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4" />
                  ))}
                </div>

                <p className="text-[14px] sm:text-[14.5px] leading-[1.75] text-gray-200 font-medium">
                  "{t.review}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-[15px] flex items-center gap-1.5">
                    <span>{t.avatar}</span> {t.name}
                  </div>
                  <div className="text-[12px] text-gray-400 mt-0.5">
                    {t.city}
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-white/10 text-red-300 px-2 py-1 rounded-md">
                  {t.server}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
