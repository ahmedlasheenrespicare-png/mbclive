import { useState } from "react";
import { FAQS } from "../data";
import { IconChevronDown } from "./Icons";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#0a0e1a] relative">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-red-600/15 border border-red-500/30 text-red-400 px-3.5 py-1 rounded-full text-[12.5px] font-black mb-3">
            مركز المساعدة
          </span>
          <h2 className="text-[28px] sm:text-[40px] font-black text-white tracking-tight">
            الأسئلة الشائعة والإجابات
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-300">
            كل ما تود معرفته عن الاشتراك، التفعيل، سرعات الإنترنت، وطرق الدفع.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-slate-900/90 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-white text-[15px] sm:text-[16.5px] hover:text-red-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <span
                    className={`transform transition-transform duration-300 text-gray-400 shrink-0 mr-3 ${
                      isOpen ? "rotate-180 text-red-400" : ""
                    }`}
                  >
                    <IconChevronDown className="w-5 h-5" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[14px] sm:text-[15px] text-gray-300 leading-[1.8] border-t border-white/5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
