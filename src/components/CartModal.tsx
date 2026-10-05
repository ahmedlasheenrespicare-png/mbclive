import { IconClose, IconChat, IconCart, IconCheck } from "./Icons";
import { CURRENCIES, getWhatsAppUrl, PricingPlan } from "../data";

export interface CartItem {
  id: string;
  plan: PricingPlan;
  months: "3" | "6" | "12" | "24";
  price: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currentCurrency: string;
}

export default function CartModal({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  currentCurrency,
}: CartModalProps) {
  if (!isOpen) return null;

  const curr = CURRENCIES[currentCurrency] || CURRENCIES.SAR;
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  const durationLabels: Record<"3" | "6" | "12" | "24", string> = {
    "3": "3 شهور",
    "6": "6 شهور",
    "12": "سنة (12 شهر)",
    "24": "سنتين (24 شهر)",
  };

  const handleCheckout = () => {
    const itemsListText = items
      .map(
        (item, i) =>
          `${i + 1}. ${item.plan.serverName} — المدة: ${durationLabels[item.months]} — السعر: ${item.price} ${curr.symbol}`
      )
      .join("\n");

    const message = `مرحبًا ستريم ماستر، أود إتمام طلب الاشتراكات التالية:\n\n${itemsListText}\n\nالإجمالي المطلوب: ${totalPrice} ${curr.symbol}\nأرجو تزويدي ببيانات الدفع والتفعيل الفوري.`;

    window.open(getWhatsAppUrl(message), "_blank");
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative h-full w-full max-w-[440px] bg-[#0b0f19] border-s border-white/15 p-6 shadow-2xl flex flex-col justify-between text-right overflow-y-auto">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <IconCart className="w-5 h-5 text-red-500" />
              <h3 className="text-[18px] font-black text-white">سلة المشتريات</h3>
              <span className="bg-red-600/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length} عناصر
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-lg bg-white/5"
              aria-label="إغلاق"
            >
              <IconClose className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <IconCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-[15px] font-bold">السلة فارغة حالياً</p>
              <p className="text-[13px] mt-1 text-gray-500">اختر أحد السيرفرات والباقات وأضفها للسلة.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-[14.5px] font-black text-white">
                      {item.plan.serverName}
                    </h4>
                    <span className="text-[12px] text-gray-400 block mt-0.5">
                      المدة: {durationLabels[item.months]}
                    </span>
                    <span className="text-[15px] font-black text-red-400 mt-1 block">
                      {item.price} {curr.symbol}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition-colors text-xs font-bold"
                  >
                    حذف ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-[16px] font-black text-white">
              <span>المجموع الكلي:</span>
              <span className="text-[22px] text-red-400 font-mono">
                {totalPrice} {curr.symbol}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-[15px] shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <IconChat className="w-5 h-5" /> إتمام الطلب وتأكيد الدفع عبر واتساب
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
