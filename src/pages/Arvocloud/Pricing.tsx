import React, { useState, useMemo, useCallback } from "react";
import { Check, Star, Zap, Crown, Server, Cpu, ShieldCheck, Sparkles, Info, ArrowRight, X } from "lucide-react";

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
}

type Category = "idn" | "usa" | "sg" | "baremetal" | "proxy";

// --- Components ---

// 1. Badge Component (untuk label Populer/Premium)
const Badge = ({ type }: { type: "premium" | "elite" }) => {
  if (type === "premium") {
    return (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-lg shadow-orange-500/20 flex items-center gap-1 z-10">
        <Star className="w-3 h-3 fill-white" /> Most Popular
      </div>
    );
  }
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-lg shadow-indigo-500/20 flex items-center gap-1 z-10">
      <Crown className="w-3 h-3 fill-white" /> High Performance
    </div>
  );
};

// 2. Pricing Card Component
const PricingCard = React.memo(({ 
  plan, 
  billingCycle, 
  onOpenModal 
}: { 
  plan: Plan; 
  billingCycle: "bulanan" | "tahunan";
  onOpenModal: (plan: Plan) => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const isPopular = plan.icon === Star;
  const isElite = plan.icon === Crown;
  const IconComponent = plan.icon;
  
  // Menghitung harga
  const price = billingCycle === "bulanan" ? plan.price.bulanan : plan.price.tahunan;
  const displayPrice = price ? price.toLocaleString("id-ID") : "-";
  
  // Filter specs utama (5 teratas)
  const topSpecs = useMemo(() => Object.entries(plan.specs).slice(0, 5), [plan.specs]);
  const hiddenSpecs = useMemo(() => Object.entries(plan.specs).slice(5), [plan.specs]);

  return (
    <div 
      className={cn(
        "group relative flex flex-col p-6 rounded-3xl transition-all duration-300",
        "border backdrop-blur-xl",
        (isPopular || isElite)
          ? "bg-white/90 dark:bg-gray-900/90 border-indigo-500/30 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/20 scale-[1.02] z-10"
          : "bg-white/60 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:-translate-y-1"
      )}
    >
      {isPopular && <Badge type="premium" />}
      {isElite && <Badge type="elite" />}

      {/* Header Card */}
      <div className="flex items-center gap-4 mb-6">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner",
          isPopular || isElite 
            ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-indigo-500/30" 
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600"
        )}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
            {plan.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Cocok untuk skala {(isPopular || isElite) ? "Bisnis" : "Personal"}
          </p>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6 pb-6 border-b border-dashed border-gray-200 dark:border-gray-700">
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-medium text-gray-500">Rp</span>
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {displayPrice}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500 font-medium">
            /{billingCycle === "bulanan" ? "bulan" : "tahun"}
          </span>
          {billingCycle === "tahunan" && plan.price.tahunan && (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
               Hemat {(plan.price.bulanan * 12 - plan.price.tahunan).toLocaleString("id-ID")}
             </span>
          )}
        </div>
      </div>

      {/* Specs List */}
      <div className="flex-1 space-y-4 mb-6">
        {topSpecs.map(([key, value]) => (
          <div key={key} className="flex items-start gap-3 text-sm group/item">
            <div className="mt-0.5 w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
              <Check className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex flex-col">
               <span className="text-gray-700 dark:text-gray-200 font-medium">{value}</span>
               {/* Optional: Show label logic if needed, but mostly value is descriptive enough */}
            </div>
          </div>
        ))}

        {/* Hidden Details */}
        {hiddenSpecs.length > 0 && (
          <div className={cn(
            "space-y-4 overflow-hidden transition-all duration-300 ease-in-out",
            showDetails ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}>
            {hiddenSpecs.map(([key, value]) => (
              <div key={key} className="flex items-start gap-3 text-sm pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="mt-0.5 w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                </div>
                <div>
                   <span className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">{key}:</span>
                   <p className="text-gray-700 dark:text-gray-200 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto space-y-3">
        {hiddenSpecs.length > 0 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-center text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-center gap-1 mb-2"
          >
            {showDetails ? "Tutup Detail" : "Lihat Spesifikasi Lengkap"}
            <Info className="w-3 h-3" />
          </button>
        )}
        
        <button
          onClick={() => onOpenModal(plan)}
          className={cn(
            "w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg",
            isPopular || isElite
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
          )}
        >
          Pesan Sekarang
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

// --- Main Component ---
const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"bulanan" | "tahunan">("bulanan");
  const [selectedCategory, setSelectedCategory] = useState<Category>("idn");

  const whatsappNumber = "6283197183724";

  const categories = useMemo(() => [
    { id: "idn" as Category, name: "Indonesia", icon: Server },
    { id: "usa" as Category, name: "USA", icon: Server },
    { id: "sg" as Category, name: "Singapore", icon: Server },
    { id: "baremetal" as Category, name: "Bare Metal", icon: Cpu },
    { id: "proxy" as Category, name: "Proxy", icon: ShieldCheck },
  ], []);

  // Data plans (sama seperti sebelumnya, hanya disederhanakan structure-nya untuk ringkas)
  const plans = useMemo(() => ({
    idn: [
      { name: "Starter ID", icon: Zap, price: { bulanan: 50000, tahunan: null }, specs: { cpu: "1 vCPU", ram: "1 GB RAM", storage: "15 GB NVMe", network: "1 Gbps", ip: "1 Public IPv4" } },
      { name: "Basic ID", icon: Zap, price: { bulanan: 75000, tahunan: null }, specs: { cpu: "1 vCPU", ram: "2 GB RAM", storage: "20 GB NVMe", network: "1 Gbps", ip: "1 Public IPv4" } },
      { name: "Medium ID", icon: Zap, price: { bulanan: 95000, tahunan: null }, specs: { cpu: "2 vCPU", ram: "4 GB RAM", storage: "20 GB NVMe", network: "1 Gbps", ip: "IP NAT" } },
      { name: "Pro ID", icon: Star, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "4 vCPU", ram: "8 GB RAM", storage: "40 GB NVMe", network: "1 Gbps", ip: "IP NAT" } },
      { name: "Business ID", icon: Star, price: { bulanan: 260000, tahunan: null }, specs: { cpu: "6 vCPU", ram: "16 GB RAM", storage: "60 GB NVMe", network: "1 Gbps", ip: "IP NAT" } },
      { name: "Enterprise ID", icon: Crown, price: { bulanan: 265000, tahunan: null }, specs: { cpu: "8 vCPU", ram: "16 GB RAM", storage: "80 GB NVMe", network: "1 Gbps", ip: "IP NAT" } },
    ],
    usa: [
      { name: "Starter US", icon: Zap, price: { bulanan: 50000, tahunan: null }, specs: { cpu: "2 vCPU AMD EPYC", ram: "1 GB RAM", storage: "50 GB NVMe", network: "500 Mbps", ip: "1 IPv4" } },
      { name: "Pro US", icon: Star, price: { bulanan: 185000, tahunan: null }, specs: { cpu: "4 vCPU Ryzen 7", ram: "7 GB RAM", storage: "120 GB NVMe", network: "1 Gbps", ip: "1 IPv4" } },
      { name: "Ultimate US", icon: Crown, price: { bulanan: 275000, tahunan: null }, specs: { cpu: "8 vCPU Xeon", ram: "16 GB RAM", storage: "80 GB NVMe", network: "1 Gbps", ip: "IP NAT" } },
      // ... tambahkan sisa data USA sesuai kebutuhan
    ],
    sg: [
      { name: "SG Optimus", icon: Zap, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "4 vCPU AMD EPYC", ram: "6 GB RAM", storage: "100 GB NVMe", network: "10 Gbps High Speed", ip: "1 IPv4" } },
    ],
    baremetal: [
      { name: "Metal Lite", icon: Zap, price: { bulanan: 350000, tahunan: 3850000 }, specs: { cpu: "Intel i3 Gen 6", ram: "8 GB RAM", storage: "256 GB SSD", network: "1 Gbps", type: "Dedicated" } },
      { name: "Metal Pro", icon: Star, price: { bulanan: 750000, tahunan: 8250000 }, specs: { cpu: "Intel i7 Gen 4", ram: "32 GB RAM", storage: "512 GB SSD", network: "1 Gbps", type: "Dedicated" } },
      { name: "Metal Beast", icon: Crown, price: { bulanan: 1500000, tahunan: 16500000 }, specs: { cpu: "Ryzen 7 5700G", ram: "64 GB RAM", storage: "1 TB SSD", network: "1 Gbps", type: "Dedicated" } },
    ],
    proxy: [
      { name: "Rotating Proxy", icon: Zap, price: { bulanan: 45000, tahunan: 540000 }, specs: { bandwidth: "1 GB", type: "Rotating IP", rotation: "1-120 Menit", pool: "Global Mix" } },
      { name: "Static Proxy", icon: ShieldCheck, price: { bulanan: 140000, tahunan: 1680000 }, specs: { bandwidth: "Unlimited", type: "Residential Static", country: "27+ Countries", speed: "High Speed" } },
    ],
  }), []);

  const currentPlans = useMemo(() => plans[selectedCategory] || [], [plans, selectedCategory]);

  const handleOpenModal = useCallback((plan: Plan) => {
    const price = billingCycle === "bulanan" ? plan.price.bulanan : plan.price.tahunan;
    const priceText = billingCycle === "bulanan" ? "per bulan" : "per tahun";
    let message = `Halo, saya tertarik dengan paket *${plan.name}* (${selectedCategory.toUpperCase()}).\n`;
    message += `Harga: Rp${price?.toLocaleString("id-ID")} ${priceText}\n\n`;
    message += `Mohon info ketersediaannya.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }, [selectedCategory, billingCycle, whatsappNumber]);

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500/30">
      
      {/* Background Decor - Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-100/50 to-transparent dark:from-indigo-950/30 dark:to-transparent blur-3xl -z-10" />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
              Harga Terbaik & Transparan
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Pilih Paket Performa <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              Tanpa Batas
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Infrastruktur cloud premium dengan harga lokal. Didesain untuk kestabilan aplikasi, game server, dan bisnis Anda.
          </p>
        </div>

        {/* Controls Container */}
        <div className="flex flex-col items-center gap-8 mb-16">
          
          {/* Category Tabs - Scrollable on Mobile */}
          <div className="w-full max-w-4xl overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            <div className="flex md:justify-center gap-2 min-w-max px-2">
              {categories.map((c) => {
                const isActive = selectedCategory === c.id;
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={cn(
                      "relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                      isActive
                        ? "text-white bg-slate-900 dark:bg-white dark:text-slate-900 shadow-lg shadow-slate-200 dark:shadow-none"
                        : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-current" : "text-slate-400")} />
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
            {(["bulanan", "tahunan"] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                  billingCycle === cycle
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {cycle === "bulanan" ? "Bulanan" : "Tahunan"}
              </button>
            ))}
          </div>
          {billingCycle === "tahunan" && (
            <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full animate-pulse">
              🎉 Hemat 1 Bulan Pembayaran
            </span>
          )}
        </div>

        {/* Grid Cards */}
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

        {/* Empty State / Not Found */}
        {currentPlans.length === 0 && (
           <div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
             <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
               <Server className="w-8 h-8 text-slate-400" />
             </div>
             <p className="text-slate-500 font-medium">Paket untuk kategori ini belum tersedia.</p>
           </div>
        )}

      </div>
    </section>
  );
};

export default Pricing;
