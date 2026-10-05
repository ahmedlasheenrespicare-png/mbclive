import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ContentTicker from "./components/ContentTicker";
import LivePlayer from "./components/LivePlayer";
import ServerFinder from "./components/ServerFinder";
import Pricing from "./components/Pricing";
import ServersComparison from "./components/ServersComparison";
import ChannelShowcase from "./components/ChannelShowcase";
import SetupGuide from "./components/SetupGuide";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FloatingActions from "./components/FloatingActions";
import Footer from "./components/Footer";
import TrialModal from "./components/TrialModal";
import CartModal, { CartItem } from "./components/CartModal";
import { PricingPlan } from "./data";

export default function App() {
  const [currency, setCurrency] = useState<string>("SAR");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [highlightedPlanId, setHighlightedPlanId] = useState<string | undefined>(undefined);

  const handleAddToCart = (plan: PricingPlan, months: "3" | "6" | "12" | "24", price: number) => {
    const newItem: CartItem = {
      id: `${plan.id}-${months}-${Date.now()}`,
      plan,
      months,
      price,
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectPlanFromFinder = (planId: string) => {
    setHighlightedPlanId(planId);
    const el = document.getElementById("pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans selection:bg-red-600 selection:text-white" dir="rtl">
      {/* Header */}
      <Header
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrial={() => setIsTrialOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenTrial={() => setIsTrialOpen(true)} />

        {/* Content Brands Ticker */}
        <ContentTicker />

        {/* Live TV Channels Player (Native HLS.js streaming) */}
        <LivePlayer onOpenTrial={() => setIsTrialOpen(true)} />

        {/* Pricing Packages */}
        <Pricing
          currentCurrency={currency}
          onCurrencyChange={setCurrency}
          onAddToCart={handleAddToCart}
          highlightedPlanId={highlightedPlanId}
        />

        {/* Smart Server Finder */}
        <ServerFinder
          onSelectPlan={handleSelectPlanFromFinder}
          onOpenTrial={() => setIsTrialOpen(true)}
        />

        {/* Side-by-Side Servers Comparison */}
        <ServersComparison />

        {/* Channels & Live TV Showcase */}
        <ChannelShowcase />

        {/* Setup & Installation Guide */}
        <SetupGuide />

        {/* Customer Reviews & Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenTrial={() => setIsTrialOpen(true)} />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenTrial={() => setIsTrialOpen(true)} />

      {/* Free Trial Popup Modal */}
      <TrialModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
      />

      {/* Slide-over Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currentCurrency={currency}
      />
    </div>
  );
}
