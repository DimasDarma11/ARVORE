import React, { useState, useMemo, useCallback } from "react";
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, ShieldCheck, Sparkles, Info } from "lucide-react";

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface PlanSpec {
  [key: string]: string;
}

interface Plan {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  price: { bulanan: number; tahunan: number };
  desc: string;
  specs: PlanSpec;
  highlight?: string;
}

type Category = "idn" | "usa" | "sg" | "baremetal" | "proxy";

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
  const isPremium = plan.icon === Star;
  const IconComponent = plan.icon;
  
  const handleClick = useCallback(() => {
    onOpenModal(plan);
  }, [plan, onOpenModal]);
  
  const topSpecs = useMemo(() => {
    const entries = Object.entries(plan.specs);
    return entries.slice(0, 3);
  }, [plan.specs]);
  
  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 border-2 bg-white dark:bg-gray-900 transition-all hover:shadow-xl",
        isPremium
          ? "border-blue-500 shadow-blue-100 dark:shadow-blue-900"
          : "border-gray-200 dark:border-gray-800"
      )}
    >
      {isPremium && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
          ⭐ Terpopuler
        </div>
      )}
      
      <div className="text-center mb-3 mt-1">
        <div className={cn(
          "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center",
          isPremium ? "bg-blue-500" : "bg-blue-500/10"
        )}>
          <IconComponent className={cn("w-6 h-6", isPremium ? "text-white" : "text-blue-500")} />
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {plan.name}
        </h3>
      </div>
      
      <div className="text-center mb-3 pt-1 pb-2">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl font-black text-gray-500 dark:text-blue-400">
            Rp{plan.price[billingCycle].toLocaleString("id-ID")}
          </span>
          <span className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          /{billingCycle === "bulanan" ? "bulan" : "tahun"}
          </span>
        </div>
      </div>
      
      <div className="space-y-1.5 mb-3">
        {topSpecs.map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">{v}</span>
            </span>
          </div>
        ))}
        
        {Object.keys(plan.specs).length > 4 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-2"
          >
            <Info className="w-3 h-3" />
            {showDetails ? "Sembunyikan detail" : "Lihat detail lengkap"}
          </button>
        )}
        
        {showDetails && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            {Object.entries(plan.specs).slice(3).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Check className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span><span className="capitalize font-medium">{k}:</span> {v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={handleClick}
        className={cn(
          "w-full py-3.5 rounded-xl font-bold transition-all text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
          isPremium
            ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        )}
      >
        Pesan Sekarang →
      </button>
    </div>
  );
}, (prev, next) => {
  return prev.plan === next.plan && prev.billingCycle === next.billingCycle;
});

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"bulanan" | "tahunan">("bulanan");
  const [selectedCategory, setSelectedCategory] = useState<Category>("idn");

  const whatsappNumber = "6283197183724";

  const categories = useMemo(() => [
    { id: "idn" as Category, name: "ID", icon: Server },
    { id: "usa" as Category, name: "US", icon: Server },
    { id: "sg" as Category, name: "SG", icon: Server },
    { id: "baremetal" as Category, name: "Bare Metal", icon: Cpu },
    { id: "proxy" as Category, name: "Proxy", icon: ShieldCheck },
  ], []);

  const plans = useMemo(() => ({
    idn: [
      { name: "1 vCPU 1GB", 
		icon: Zap, 
		price: { bulanan: 50000, tahunan: null }, 
		specs: { cpu: "Intel Xeon E5 V4", storage: "15 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "1 IPv4" } },
		
      { name: "1 vCPU 2GB", 
		icon: Zap, 
		price: { bulanan: 75000, tahunan: null }, 
		specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "1 IPv4" } },
		
      { name: "2 vCPU 4GB", 
		icon: Zap, 
		price: { bulanan: 95000, tahunan: null }, 
		specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
		
      { name: "4 vCPU 8GB", 
		icon: Star, 
		price: { bulanan: 150000, tahunan: null },
		specs: { cpu: "Intel Xeon E5 V4", storage: "40 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
		
      { name: "6 vCPU 16GB", 
		icon: Star, 
		price: { bulanan: 260000, tahunan: null },
		specs: { cpu: "Intel Xeon E5 V4", storage: "60GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
		
      { name: "8 vCPU 16GB", 
		icon: Crown, 
		price: { bulanan: 265000, tahunan: null },
		specs: { cpu: "Intel Xeon E5 V4", storage: "80 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
    ],
    usa: [
	  { name: "2 vCPU 1GB", 
		icon: Zap, 
		price: { bulanan: 50000, tahunan: null },
		specs: { cpu: "AMD EPYC 7551", storage: "50 GB SSD NVMe", network: "Port Speed 500 Mbps", IP: "1 IPv4" } },
		
      { name: "2 vCPU 3.5GB", 
		icon: Zap, 
		price: { bulanan: 100000, tahunan: null },
		specs: { cpu: "AMD Ryzen 7 5700G", storage: "60 GB SSD NVMe", network: "Port Speed 500 Mbps", IP: "IP NAT" } },
		
	  { name: "2 vCPU 4GB", 
		icon: Zap, 
		price: { bulanan: 95000, tahunan: null },
		specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
		
	  { name: "4 vCPU 6GB", 
		icon: Zap, 
		price: { bulanan: 135000, tahunan: null }, 
		specs: { cpu: "Intel Xeon E5 Gold 6530", storage: "75 GB SSD NVMe", network: "Port Speed 10 Gbps", IP: "IP NAT" } },
		
      { name: "4 vCPU 7GB", 
		icon: Star, 
		price: { bulanan: 185000, tahunan: null },
		specs: { cpu: "AMD Ryzen 7 5700G", storage: "120 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "1 IPv4" } },
		
	  { name: "4 vCPU 8GB", 
		icon: Crown, 
		price: { bulanan: 150000, tahunan: null },
		specs: { cpu: "Intel Xeon E5 V4", storage: "40 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
		
      { name: "6 vCPU 16GB", 
		icon: Crown, 
		price: { bulanan: 260000, tahunan: null }, 
		specs: { cpu: "Intel Xeon E5 V4", storage: "60 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
		
	  { name: "8 vCPU 16GB", 
		icon: Crown, 
		price: { bulanan: 230000, tahunan: null }, 
		specs: { cpu: "Intel / AMD EPYC Processor", storage: "160 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "1 IPv4" } },	
		
      { name: "8 vCPU 16GB", 
		icon: Crown, 
		price: { bulanan: 275000, tahunan: null }, 
		specs: { cpu: "Intel Xeon E5 V4", storage: "80 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
    ],
	sg: [
	  { name: "4 vCPU 6GB", 
		icon: Zap, 
		price: { bulanan: 150000, tahunan: null }, 
		specs: { cpu: "AMD EPYC", storage: "100 GB SSD NVMe", network: "Port Speed 10 Gbps", IP: "1 IPv4" } },
	],
    baremetal: [
      { name: "Bare Metal ID 1", 
		icon: Zap, 
		price: { bulanan: 350000, tahunan: 3850000 },  
		specs: { cpu: "Intel Core i3 Gen 6", ram: "8 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "✅ Support emulator & game" } },
		
      { name: "Bare Metal ID 2", 
		icon: Star, 
		price: { bulanan: 400000, tahunan: 4400000 }, 
		specs: { cpu: "Intel Core i3 Gen 6", ram: "16 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "✅ Support emulator & game" } },
		
      { name: "Bare Metal ID 3", 
		icon: Crown, 
		price: { bulanan: 450000, tahunan: 4950000 }, 
		specs: { cpu: "Intel Core i3 Gen 6", ram: "24 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "✅ Support emulator & game" } },
		
      { name: "Bare Metal ID 4", 
		icon: Crown, 
		price: { bulanan: 550000, tahunan: 6050000 }, 
		specs: { cpu: "Intel Core i3 Gen 6", ram: "32 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "✅ Support emulator & game" } },
		
      { name: "Bare Metal ID 5", 
		icon: Star, 
		price: { bulanan: 750000, tahunan: 8250000 },  
		specs: { cpu: "Intel Core i7 Gen 4", ram: "32 GB RAM", storage: "512 GB SSD", network: "Port Speed 1 Gbps", emulator: "✅ Support emulator & game" } },
		
      { name: "Bare Metal USA", 
		icon: Star, 
		price: { bulanan: 1500000, tahunan: 16500000 }, 
		specs: { cpu: "AMD Ryzen 7 5700G", ram: "64 GB RAM", storage: "1 TB SSD", network: "Speed UpTo 1 Gbps", emulator: "✅ Support emulator & game" } },
    ],
    proxy: [
      { name: "Proxy Rotating IP", 
		icon: Zap, 
		price: { bulanan: 45000, tahunan: 540000 }, 
		specs: { Bandwidth: "1GB", Rotasi: "1-120 Menit" } },
		
      { name: "Proxy Residential Static", 
		icon: ShieldCheck, 
		price: { bulanan: 140000, tahunan: 1680000 },  
		specs: { Bandwidth: "Unlimited", Negara: "27+ Country" } },
    ],
  }), []);

  const currentPlans = useMemo(() => plans[selectedCategory] || [], [plans, selectedCategory]);

  const handleOpenModal = useCallback((plan: Plan) => {
    let message = "";
    const categoryName = { 
      idn: "VPS Indonesia", 
      usa: "RDP USA", 
      sg: "VPS Singapore",
      baremetal: "Bare Metal", 
      proxy: "Proxy" 
    }[selectedCategory];
    
    const price = billingCycle === "bulanan" ? plan.price.bulanan : plan.price.tahunan;
    const priceText = billingCycle === "bulanan" ? "per bulan" : "per tahun";
    
    message = `Halo, saya ingin memesan *${categoryName}* dengan detail:\n\n`;
    message += `📦 *Paket: ${plan.name}*\n`;
    message += `💰 *Harga: Rp${price.toLocaleString("id-ID")} ${priceText}*\n\n`;
    message += `*Spesifikasi:*\n`;
    
    Object.entries(plan.specs).forEach(([key, value]) => {
      message += `• ${key}: ${value}\n`;
    });
    
    message += `\nApakah paket ini tersedia?`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }, [selectedCategory, billingCycle, whatsappNumber]);

  return (
    <section id="pricing" className="relative bg-white dark:bg-gray-950 pt-20 pb-16">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-gray-950 to-transparent pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500 font-semibold">Paket Harga Terbaik</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Pilih Paket <span className="text-blue-500">Terbaik</span> Anda
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
            Harga transparan, tanpa biaya tersembunyi. Semua paket sudah termasuk dukungan 24/7.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((c) => {
            const IconComp = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium",
                  selectedCategory === c.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-blue-500/40"
                )}
              >
                <IconComp className="w-4 h-4" />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center mb-10 gap-3">
          <span className={cn("text-sm font-medium", billingCycle === "bulanan" ? "text-gray-900 dark:text-white" : "text-gray-500")}>
            Bulanan
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")}
            className={cn(
              "relative w-14 h-7 rounded-full p-0.5 transition-colors",
              billingCycle === "tahunan" ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
            )}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full bg-white shadow-md transition-transform",
                billingCycle === "tahunan" ? "translate-x-7" : "translate-x-0"
              )}
            />
          </button>
          <span className={cn("text-sm font-medium", billingCycle === "tahunan" ? "text-gray-900 dark:text-white" : "text-gray-500")}>
            Tahunan
            <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Hemat 10%</span>
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentPlans.map((plan, i) => (
            <PricingCard 
              key={`${plan.name}-${i}`} 
              plan={plan} 
              billingCycle={billingCycle}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
