import React, { useState, useMemo, useCallback } from "react";
import { Check, Star, Zap, Server, Cpu, ShieldCheck, ArrowRight, TrendingUp } from "lucide-react";

// Utilitas untuk menggabungkan class
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// --- Types ---
interface PlanSpec {
  [key: string]: string;
}

interface Plan {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  price: { bulanan: number; tahunan: number | null };
  specs: PlanSpec;
  tag?: 'popular' | 'best_value'; // Tag baru untuk highlight
}

type Category = "idn" | "usa" | "baremetal" | "proxy";

// --- Components ---

// 1. Pricing Card Component (lebih ringan)
const PricingCard = React.memo(({ 
  plan, 
  billingCycle, 
  onOpenModal 
}: { 
  plan: Plan; 
  billingCycle: "bulanan" | "tahunan";
  onOpenModal: (plan: Plan) => void;
}) => {
  const isHighlighted = plan.tag === 'popular' || plan.tag === 'best_value';
  const IconComponent = plan.icon;
  
  const price = billingCycle === "bulanan" ? plan.price.bulanan : plan.price.tahunan;
  const displayPrice = price ? price.toLocaleString("id-ID") : "-";
  
  // Hanya ambil 4 specs terpenting untuk tampilan ringkas
  const topSpecs = useMemo(() => Object.entries(plan.specs).slice(0, 4), [plan.specs]);

  return (
    <div 
      className={cn(
        "group relative flex flex-col p-6 rounded-2xl transition-all duration-200",
        "border border-gray-200 dark:border-gray-800",
        isHighlighted
          ? "bg-white dark:bg-gray-900 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/50 scale-105 z-10"
          : "bg-white/80 dark:bg-gray-900/80 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg hover:-translate-y-0.5"
      )}
    >
      {/* Badge Populer / Best Value */}
      {plan.tag === 'popular' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 z-10">
          <Star className="w-3.5 h-3.5 fill-white" />
          POPULAR
        </div>
      )}

      {/* Header Card */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
            <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isHighlighted 
                    ? "bg-indigo-600 text-white" 
                    : "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
            )}>
                <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">
                {plan.name}
            </h3>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6 pb-6 border-b border-dashed border-gray-100 dark:border-gray-800">
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-medium text-gray-500">Rp</span>
          <span className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
            {displayPrice}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500 font-medium">
                /{billingCycle === "bulanan" ? "bulan" : "tahun"}
            </span>
            {billingCycle === "tahunan" && plan.price.tahunan && (
                <span className="text-xs font-bold text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                    Hemat 10%
                </span>
            )}
        </div>
      </div>

      {/* Specs List */}
      <div className="flex-1 space-y-3 mb-6">
        {topSpecs.map(([key, value]) => (
          <div key={key} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-1" />
            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
               <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
               <span className="text-gray-500 dark:text-gray-400"> ({key})</span>
            </span>
          </div>
        ))}
        
        {/* Call to action for more info */}
        {Object.entries(plan.specs).length > 4 && (
             <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium pt-2">
                +{Object.entries(plan.specs).length - 4} spesifikasi lainnya...
             </p>
        )}
      </div>

      {/* Footer CTA */}
      <button
        onClick={() => onOpenModal(plan)}
        className={cn(
          "w-full py-3 rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2",
          isHighlighted
            ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/30"
            : "bg-white border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        Pesan Sekarang
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
});

// --- Main Component ---
const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"bulanan" | "tahunan">("bulanan");
  const [selectedCategory, setSelectedCategory] = useState<Category>("idn");

  const whatsappNumber = "6283197183724";

  const categories = useMemo(() => [
    { id: "idn" as Category, name: "VPS Indonesia", icon: Server },
    { id: "usa" as Category, name: "VPS USA", icon: Server },
    { id: "baremetal" as Category, name: "Bare Metal", icon: Cpu },
    { id: "proxy" as Category, name: "Proxy", icon: ShieldCheck },
  ], []);

  // Data plans yang lebih ringkas dan fokus pada paket unggulan
  const plans = useMemo(() => ({
    idn: [
      { name: "Starter ID (S)", icon: Zap, price: { bulanan: 50000, tahunan: null }, specs: { cpu: "1 vCPU", ram: "1 GB RAM", storage: "15 GB NVMe", network: "1 Gbps", ip: "1 Public IPv4", os: "Linux/Windows" } },
      { name: "Pro ID (M)", icon: Zap, price: { bulanan: 95000, tahunan: null }, specs: { cpu: "2 vCPU", ram: "4 GB RAM", storage: "20 GB NVMe", network: "1 Gbps", ip: "IP NAT", os: "Linux/Windows", support: "Prioritas" }, tag: 'popular' },
      { name: "Business ID (L)", icon: Star, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "4 vCPU", ram: "8 GB RAM", storage: "40 GB NVMe", network: "1 Gbps", ip: "IP NAT", os: "Linux/Windows", backup: "Harian" } },
    ],
    usa: [
      { name: "Basic US", icon: Zap, price: { bulanan: 50000, tahunan: null }, specs: { cpu: "2 vCPU AMD", ram: "1 GB RAM", storage: "50 GB NVMe", network: "500 Mbps", ip: "1 IPv4" } },
      { name: "Pro US (Best Value)", icon: Star, price: { bulanan: 185000, tahunan: null }, specs: { cpu: "4 vCPU Ryzen", ram: "7 GB RAM", storage: "120 GB NVMe", network: "1 Gbps", ip: "1 IPv4", ddos: "Protection" }, tag: 'best_value' },
      { name: "Ultimate US", icon: Zap, price: { bulanan: 275000, tahunan: null }, specs: { cpu: "8 vCPU Xeon", ram: "16 GB RAM", storage: "80 GB NVMe", network: "1 Gbps", ip: "IP NAT", os: "Linux/Windows" } },
    ],
    baremetal: [
      { name: "Metal Lite", icon: Zap, price: { bulanan: 350000, tahunan: 3850000 }, specs: { cpu: "Intel i3 Gen 6", ram: "8 GB RAM", storage: "256 GB SSD", network: "1 Gbps" } },
      { name: "Metal Pro", icon: Star, price: { bulanan: 750000, tahunan: 8250000 }, specs: { cpu: "Intel i7 Gen 4", ram: "32 GB RAM", storage: "512 GB SSD", network: "1 Gbps", maintenance: "Prioritas" }, tag: 'popular' },
    ],
    proxy: [
      { name: "Rotating Proxy", icon: Zap, price: { bulanan: 45000, tahunan: 540000 }, specs: { bandwidth: "1 GB", type: "Rotating IP", rotation: "1-120 Min" } },
      { name: "Static Proxy", icon: ShieldCheck, price: { bulanan: 140000, tahunan: 1680000 }, specs: { bandwidth: "Unlimited", type: "Residential Static", country: "27+ Countries" }, tag: 'popular' },
    ],
  }), []);

  const currentPlans = useMemo(() => plans[selectedCategory] || [], [plans, selectedCategory]);

  const handleOpenModal = useCallback((plan: Plan) => {
    const price = billingCycle === "bulanan" ? plan.price.bulanan : plan.price.tahunan;
    const priceText = billingCycle === "bulanan" ? "per bulan" : "per tahun";
    let message = `Halo, saya ingin bertanya tentang paket *${plan.name}* (${selectedCategory.toUpperCase()}).\n`;
    message += `Harga: Rp${price?.toLocaleString("id-ID")} ${priceText}\n\n`;
    message += `Mohon info ketersediaannya.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }, [selectedCategory, billingCycle, whatsappNumber]);

  return (
    <section className="relative min-h-screen py-20 md:py-24 overflow-hidden bg-white dark:bg-gray-950 font-sans">
      
      {/* Background Decor - Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-indigo-50/50 dark:bg-indigo-950/20 blur-3xl -z-10" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 mb-4">
            <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              Solusi Hosting Premium
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Harga Fleksibel, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Performa Maksimal
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Pilih paket yang sesuai dengan kebutuhan performa dan anggaran Anda, tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Category Tabs & Billing Control */}
        <div className="flex flex-col items-center gap-6 mb-12">
          
          {/* Category Tabs */}
          <div className="w-full max-w-4xl overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex justify-center gap-3 min-w-max px-2">
              {categories.map((c) => {
                const isActive = selectedCategory === c.id;
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "text-white bg-indigo-600 shadow-md shadow-indigo-500/30"
                        : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/40"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-indigo-500")} />
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          {/* Hanya tampilkan toggle jika ada paket yang memiliki harga tahunan */}
          {currentPlans.some(p => p.price.tahunan !== null) && (
            <div className="flex items-center gap-2">
              <span className={cn("text-base font-semibold transition-colors", billingCycle === "bulanan" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>
                Bulanan
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")}
                className={cn(
                  "relative w-12 h-6 rounded-full p-0.5 transition-all shadow-inner",
                  billingCycle === "tahunan" ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200",
                    billingCycle === "tahunan" ? "translate-x-6" : "translate-x-0"
                  )}
                />
              </button>
              <span className={cn("text-base font-semibold transition-colors", billingCycle === "tahunan" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>
                Tahunan
              </span>
            </div>
          )}
        </div>

        {/* Grid Cards - Maksimal 3 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {currentPlans.map((plan, i) => (
            <PricingCard 
              key={`${selectedCategory}-${i}`} 
              plan={plan} 
              billingCycle={billingCycle} 
              onOpenModal={handleOpenModal} 
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
           <p className="text-sm text-gray-500 dark:text-gray-400">
             Tidak menemukan paket yang sesuai? <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo, saya mencari paket kustom.")}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Hubungi kami untuk penawaran kustom.</a>
           </p>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
