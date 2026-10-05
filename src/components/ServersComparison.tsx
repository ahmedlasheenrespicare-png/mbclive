import { IconCheck, IconShieldCheck, IconTrophy, IconZap } from "./Icons";

export default function ServersComparison() {
  const comparisonData = [
    {
      feature: "ثبات البث أثناء المباريات الكبرى",
      nova: "99.9% (الأعلى)",
      ultra: "99.9% (VIP مخصص)",
      istar: "98.5%",
      moka: "97.0%",
    },
    {
      feature: "قنوات beIN Sports 4K & 50fps",
      nova: "✓ متاحة بكافة المصادر",
      ultra: "✓ 4K أصلية فائقة Bitrate",
      istar: "✓ متاحة FHD & 4K",
      moka: "FHD & HD فقط",
    },
    {
      feature: "قنوات SSC الرياضية السعودية",
      nova: "✓ متوفرة كاملة",
      ultra: "✓ متوفرة 4K",
      istar: "✓ متوفرة",
      moka: "✓ متوفرة HD",
    },
    {
      feature: "عدد الشاشات في نفس الوقت",
      nova: "شاشة واحدة",
      ultra: "شاشتان معاً (Dual)",
      istar: "شاشة واحدة",
      moka: "شاشة واحدة",
    },
    {
      feature: "مكتبة الأفلام والمسلسلات VOD",
      nova: "+65,000 فيلم ومسلسل",
      ultra: "+85,000 (طلب خاص)",
      istar: "+50,000",
      moka: "+35,000",
    },
    {
      feature: "أدنى سرعة إنترنت مطلوبة",
      nova: "10 - 15 ميجابت",
      ultra: "20 - 30 ميجابت",
      istar: "8 - 12 ميجابت",
      moka: "4 - 8 ميجابت (اقتصادي)",
    },
    {
      feature: "خاصية التايم شفت والترجمة",
      nova: "✓ مدعومة بالكامل",
      ultra: "✓ مدعومة فائقة السرعة",
      istar: "✓ مدعومة",
      moka: "مدعومة جزئياً",
    },
    {
      feature: "سرعة التنقل بين القنوات",
      nova: "سريعة جداً (< 0.8s)",
      ultra: "فائقة السرعة (< 0.4s)",
      istar: "سريعة (< 1.2s)",
      moka: "عادية (< 1.5s)",
    },
  ];

  return (
    <section id="servers-compare" className="py-16 sm:py-24 bg-[#0a0e1a] relative">
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-purple-600/15 border border-purple-500/30 text-purple-400 px-3.5 py-1 rounded-full text-[12.5px] font-black mb-3">
            <IconTrophy className="w-4 h-4 text-amber-400" /> جدول المقارنة الشامل
          </span>
          <h2 className="text-[28px] sm:text-[40px] font-black text-white tracking-tight">
            مقارنة تقنية دقيقة بين السيرفرات
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-300">
            اطلع على الفروقات الفنية والتقنية لاختيار السيرفر الأنسب لاحتياجاتك بدقة.
          </p>
        </div>

        {/* Table Container */}
        <div className="rounded-3xl border border-white/15 bg-slate-900/90 overflow-hidden shadow-2xl overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/15 bg-slate-950 text-white">
                <th className="p-4 sm:p-5 text-[14px] sm:text-[15px] font-black">الميزة / المواصفة التقنية</th>
                <th className="p-4 sm:p-5 text-[14px] sm:text-[15px] font-black text-red-400 bg-red-950/20">
                  سيرفر نوفا (Nova)
                </th>
                <th className="p-4 sm:p-5 text-[14px] sm:text-[15px] font-black text-amber-400 bg-amber-950/20">
                  ماستر الترا (Ultra VIP)
                </th>
                <th className="p-4 sm:p-5 text-[14px] sm:text-[15px] font-black text-purple-400">
                  إيستار (iStar)
                </th>
                <th className="p-4 sm:p-5 text-[14px] sm:text-[15px] font-black text-gray-400">
                  موكا (Moka)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-[13.5px] text-gray-300">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white bg-slate-900/50">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 font-black text-red-300 bg-red-950/10">
                    {row.nova}
                  </td>
                  <td className="p-4 sm:p-5 font-black text-amber-300 bg-amber-950/10">
                    {row.ultra}
                  </td>
                  <td className="p-4 sm:p-5 font-medium">
                    {row.istar}
                  </td>
                  <td className="p-4 sm:p-5 font-medium text-gray-400">
                    {row.moka}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
