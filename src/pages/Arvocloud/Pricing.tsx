import React, { useState, useMemo, useCallback } from "react";
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, ShieldCheck, X, ChevronRight, ChevronLeft, LucideIcon, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

// Types
interface PlanSpec {
  [key: string]: string;
}

interface Plan {
  name: string;
  icon: LucideIcon;
  price: { bulanan: number; tahunan: number };
  desc: string;
  specs: PlanSpec;
}

interface FormData {
  region: string;
  quantity: number;
  usage: string;
  os: string;
  duration: string;
  ipPublic: boolean;
}

type Category = "vps" | "rdp" | "baremetal" | "proxy";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"bulanan" | "tahunan">("bulanan");
  const [selectedCategory, setSelectedCategory] = useState<Category>("vps");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<FormData>({
    region: "",
    quantity: 1,
    usage: "",
    os: "",
    duration: "",
    ipPublic: false
  });

  const whatsappNumber = "6283197183724";
  const telegramUsername = "superku15";

  const categories = useMemo(() => [
    { id: "vps" as Category, name: "VPS", icon: Server as LucideIcon },
    { id: "rdp" as Category, name: "RDP", icon: Monitor as LucideIcon },
    { id: "baremetal" as Category, name: "Bare Metal", icon: Cpu as LucideIcon },
    { id: "proxy" as Category, name: "Proxy", icon: ShieldCheck as LucideIcon },
  ], []);

  const plans = useMemo(() => ({
    vps: [
      { name: "VPS TURBO 1", icon: Zap, price: { bulanan: 50000, tahunan: 550000 }, desc: "Pilihan hemat untuk project kecil atau pengujian pengembang.", specs: { cpu: "1 vCPU", ram: "1 GB", storage: "15 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 2", icon: Zap, price: { bulanan: 75000, tahunan: 825000 }, desc: "Cocok untuk website ringan, bot, atau aplikasi skala kecil.", specs: { cpu: "1 vCPU", ram: "2 GB", storage: "20 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 3", icon: Zap, price: { bulanan: 150000, tahunan: 1650000 }, desc: "Ideal untuk website, panel hosting, atau aplikasi ringan-menengah.", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "50 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 4", icon: Star, price: { bulanan: 170000, tahunan: 1870000 }, desc: "Pilihan seimbang untuk aplikasi menengah dan server komunitas.", specs: { cpu: "4 vCPU", ram: "6 GB", storage: "60 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 5", icon: Star, price: { bulanan: 200000, tahunan: 2200000 }, desc: "Performa tinggi untuk bisnis kecil, e-commerce, atau tim pengembang.", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "70GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 6", icon: Crown, price: { bulanan: 230000, tahunan: 2530000 }, desc: "Kinerja optimal untuk bisnis menengah dan server aplikasi berat.", specs: { cpu: "6 vCPU", ram: "10 GB", storage: "80 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 7", icon: Crown, price: { bulanan: 300000, tahunan: 3300000 }, desc: "Performa tinggi untuk bisnis profesional dan server produksi.", specs: { cpu: "8 vCPU", ram: "14 GB", storage: "100 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 8", icon: Crown, price: { bulanan: 320000, tahunan: 3520000 }, desc: "Kinerja stabil untuk bisnis profesional dan server produksi berskala menengah.", specs: { cpu: "8 vCPU", ram: "16 GB", storage: "100 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 9", icon: Crown, price: { bulanan: 350000, tahunan: 3850000 }, desc: "Server tangguh untuk aplikasi intensif, database besar, atau load tinggi.", specs: { cpu: "10 vCPU", ram: "16 GB", storage: "120 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 10", icon: Crown, price: { bulanan: 380000, tahunan: 4180000 }, desc: "Performa maksimal untuk perusahaan, server produksi besar, atau cloud service.", specs: { cpu: "10 vCPU", ram: "18 GB", storage: "120 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
    ],
    rdp: [
      { name: "RDP 1", icon: Zap, price: { bulanan: 95000, tahunan: 1045000 }, desc: "RDP ekonomis untuk keperluan ringan", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "20 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇮🇩 Indonesia • 🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
      { name: "RDP 2", icon: Star, price: { bulanan: 150000, tahunan: 1650000 }, desc: "Performa stabil untuk kebutuhan harian", specs: { cpu: "Intel Xeon E5 ( 4 Cores )", ram: "8 GB", storage: "40 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇮🇩 Indonesia • 🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
      { name: "RDP 3", icon: Crown, price: { bulanan: 260000, tahunan: 2860000 }, desc: "Performa tinggi dengan dukungan 24/7", specs: { cpu: "Intel Xeon E5 ( 6 Cores )", ram: "16 GB", storage: "60 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇮🇩 Indonesia • 🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
      { name: "RDP 4", icon: Crown, price: { bulanan: 275000, tahunan: 3025000 }, desc: "Performa tinggi dengan dukungan 24/7", specs: { cpu: "Intel Xeon E5 ( 8 Cores )", ram: "16 GB", storage: "80 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇮🇩 Indonesia • 🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
      { name: "RDP 4", icon: Crown, price: { bulanan: 185000, tahunan: 2035000 }, desc: "Performa tinggi dengan dukungan 24/7", specs: { cpu: "Ryzen 7 5700G ( 4 Cores )", ram: "7 GB", storage: "120 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
    ],
    baremetal: [
      { name: "Bare Metal ID 1", icon: Zap, price: { bulanan: 350000, tahunan: 3850000 }, desc: "Entry-level dedicated server", specs: { cpu: "Intel Core i3 Gen 6", ram: "8 GB", storage: "256 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal ID 2", icon: Star, price: { bulanan: 400000, tahunan: 4400000 }, desc: "High-performance dedicated server", specs: { cpu: "Intel Core i3 Gen 6", ram: "16 GB", storage: "256 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal ID 3", icon: Crown, price: { bulanan: 450000, tahunan: 4950000 }, desc: "Maximum performance dedicated server", specs: { cpu: "Intel Core i3 Gen 6", ram: "24 GB", storage: "256 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal ID 4", icon: Crown, price: { bulanan: 550000, tahunan: 6050000 }, desc: "Maximum performance dedicated server", specs: { cpu: "Intel Core i3 Gen 6", ram: "32 GB", storage: "256 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal ID 5", icon: Star, price: { bulanan: 750000, tahunan: 8250000 }, desc: "High-performance dedicated server", specs: { cpu: "Intel Core i7 Gen 4", ram: "32 GB", storage: "512 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal USA", icon: Star, price: { bulanan: 1500000, tahunan: 16500000 }, desc: "High-performance dedicated server", specs: { cpu: "AMD Ryzen 7 5700G", ram: "64 GB", storage: "1 TB SSD", bandwidth: "Unlimited", region: "🇺🇸 USA", emulator: "✅ Support emulator & game" } },
    ],
    proxy: [
      { name: "Proxy Rotating IP", icon: Zap, price: { bulanan: 45000, tahunan: 540000 }, desc: "Proxy fleksibel dengan rotasi IP cepat", specs: { Bandwidth: "1GB", Rotasi: "1-120 Menit" } },
      { name: "Proxy Residential Static", icon: ShieldCheck, price: { bulanan: 140000, tahunan: 1680000 }, desc: "Proxy statis untuk kestabilan tinggi", specs: { Bandwidth: "Unlimited", Negara: "27+ Country" } },
    ],
  }), []);

  const currentPlans = useMemo(() => plans[selectedCategory] || [], [plans, selectedCategory]);

  const getAvailableRegions = useCallback(() => {
    if (selectedCategory === "vps") return ["🇮🇩 Indonesia"];
    if (selectedCategory === "rdp") return ["🇺🇸 USA", "🇮🇩 Indonesia"];
    if (selectedCategory === "baremetal") return selectedPlan?.name.includes("USA") ? ["🇺🇸 USA"] : ["🇮🇩 Indonesia"];
    if (selectedCategory === "proxy") return ["🌍 Global"];
    return [];
  }, [selectedCategory, selectedPlan]);

  const getAvailableOS = useCallback(() => {
    if (selectedCategory === "vps") return ["Ubuntu 22.04", "Ubuntu 24.04", "Debian 12", "Debian 14"];
    if (selectedCategory === "rdp" || selectedCategory === "baremetal") return ["Windows 10 Ghost Spectre", "Windows 11 Ghost Spectre"];
    if (selectedCategory === "proxy") return ["N/A - Proxy Service"];
    return [];
  }, [selectedCategory]);

  const handleOpenModal = useCallback((plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setCurrentStep(1);
    setFormData(selectedCategory === "proxy" ? { region: "🌍 Global", quantity: 1, usage: "", os: "N/A - Proxy Service", duration: "", ipPublic: false } : { region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });
  }, [selectedCategory]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSelectedPlan(null);
    setFormData({ region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });
  }, []);

  const canProceed = useCallback(() => {
    const step = currentStep;
    if (selectedCategory === "proxy") {
      if (step === 1) return formData.quantity >= 1 && formData.usage.trim() !== "";
      if (step === 2) return formData.duration !== "";
    } else {
      if (step === 1) return formData.region !== "";
      if (step === 2) return formData.quantity >= 1 && formData.usage.trim() !== "";
      if (step === 3) return formData.os !== "";
      if (step === 4) return formData.duration !== "";
    }
    return false;
  }, [currentStep, selectedCategory, formData]);

  const handleNext = useCallback(() => {
    const maxStep = selectedCategory === "proxy" ? 3 : 5;
    if (canProceed() && currentStep < maxStep) setCurrentStep(currentStep + 1);
  }, [selectedCategory, canProceed, currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const getFinalPrice = useCallback(() => {
    if (!selectedPlan) return 0;
    let price = (formData.duration === "1 Bulan (30 Hari)" ? selectedPlan.price.bulanan : selectedPlan.price.tahunan) * formData.quantity;
    if (selectedCategory === "rdp" && formData.ipPublic) price += 85000 * formData.quantity;
    return price;
  }, [selectedPlan, formData, selectedCategory]);

  const generateOrderMessage = useCallback(() => {
    if (!selectedPlan) return "";
    const categoryName = { vps: "VPS", rdp: "RDP", baremetal: "Bare Metal", proxy: "Proxy" }[selectedCategory];
    
    if (selectedCategory === "proxy") {
      return `Halo, saya ingin memesan ${categoryName} dengan konfigurasi berikut:\n\n📦 Nama Paket: ${selectedPlan.name}\n🌍 Region: ${formData.region}\n🔢 Kuantitas: ${formData.quantity}\n💰 Harga: Rp${getFinalPrice().toLocaleString("id-ID")}\n🎯 Digunakan Untuk: ${formData.usage}\n\nApakah konfigurasi ini tersedia?`;
    }
    
    const ipInfo = selectedCategory === "vps" ? "✅ IP Public (Included)" : selectedCategory === "rdp" ? (formData.ipPublic ? "✅ IP Public (+Rp85.000)\n*IP Public untuk open all port" : "🔒 IP NAT (Default)") : "🏠 IP Local";
    return `Halo, saya ingin memesan ${categoryName} dengan konfigurasi berikut:\n\n📦 Nama Paket: ${selectedPlan.name}\n🌍 Region: ${formData.region}\n💻 Sistem Operasi: ${formData.os}\n⚡ CPU: ${selectedPlan.specs.cpu}\n🧠 RAM: ${selectedPlan.specs.ram}\n🌐 IP: ${ipInfo}\n🔢 Kuantitas: ${formData.quantity}\n🛡️ Garansi: Garansi full\n💰 Harga: Rp${getFinalPrice().toLocaleString("id-ID")}\n🎯 Digunakan Untuk: ${formData.usage}\n\nApakah konfigurasi ini tersedia?`;
  }, [selectedPlan, selectedCategory, formData, getFinalPrice]);

  const handleWhatsAppOrder = useCallback(() => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateOrderMessage())}`, "_blank");
    handleCloseModal();
  }, [generateOrderMessage, handleCloseModal]);

  const handleTelegramOrder = useCallback(() => {
    window.open(`https://t.me/${telegramUsername}?text=${encodeURIComponent(generateOrderMessage())}`, "_blank");
    handleCloseModal();
  }, [generateOrderMessage, handleCloseModal]);

  const maxStep = selectedCategory === "proxy" ? 3 : 5;
  const isProxyCategory = selectedCategory === "proxy";

  return (
    <section id="pricing" className="relative py-20 md:py-28 bg-gradient-to-b from-background to-blue-950/5">
      {/* Simplified Background - hanya 1 blur orb */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500 font-semibold">Paket Harga Terbaik</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Harga yang <span className="text-blue-500">Transparan</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Pilih paket sesuai kebutuhan Anda. Semua sudah termasuk dukungan 24/7.
          </p>
        </div>

        {/* Category Tabs - Simplified */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={cn(
                "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border-2 transition-colors",
                selectedCategory === c.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-card text-card-foreground border-blue-500/20 hover:border-blue-500/40"
              )}
            >
              <c.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Billing Toggle - Simplified */}
        <div className="flex items-center justify-center mb-12 gap-3">
          <span className={cn("text-sm sm:text-base font-medium", billingCycle === "bulanan" ? "text-foreground" : "text-muted-foreground")}>
            Bulanan
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")}
            className={cn(
              "relative w-16 sm:w-20 h-9 sm:h-10 rounded-full p-1 flex items-center transition-colors border-2",
              billingCycle === "tahunan" ? "bg-blue-500/20 border-blue-500" : "bg-muted border-border"
            )}
          >
            <div
              className={cn(
                "w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-blue-600 shadow-md flex items-center justify-center transition-transform",
                billingCycle === "tahunan" ? "translate-x-7 sm:translate-x-10" : "translate-x-0"
              )}
            >
              <span className="text-white text-[10px] font-bold">{billingCycle === "bulanan" ? "B" : "T"}</span>
            </div>
          </button>
          <span className={cn("text-sm sm:text-base font-medium", billingCycle === "tahunan" ? "text-foreground" : "text-muted-foreground")}>
            Tahunan
          </span>
        </div>

        {/* Pricing Cards - Simplified hover effects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentPlans.map((plan, i) => {
            const isPremium = plan.icon === Crown || plan.icon === Star;
            
            return (
              <div
                key={i}
                className={cn(
                  "relative rounded-2xl p-6 md:p-8 border-2 bg-card transition-all",
                  isPremium
                    ? "border-blue-500/40 hover:border-blue-500"
                    : "border-blue-500/20 hover:border-blue-500/40"
                )}
              >
                {isPremium && (
                  <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ Popular
                  </div>
                )}
                
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5 rounded-xl flex items-center justify-center",
                  isPremium ? "bg-blue-500/20" : "bg-blue-500/10"
                )}>
                  <plan.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2 text-center">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-6 text-center line-clamp-2">
                  {plan.desc}
                </p>
                
                <div className="text-center mb-6">
                  <div className="text-3xl sm:text-4xl font-extrabold text-blue-500">
                    Rp{plan.price[billingCycle].toLocaleString("id-ID")}
                  </div>
                  <span className="text-muted-foreground text-xs sm:text-sm font-medium">
                    /{billingCycle === "bulanan" ? "bulan" : "tahun"}
                  </span>
                </div>
                
                <div className="text-card-foreground text-xs sm:text-sm space-y-2 mb-8">
                  {Object.entries(plan.specs).slice(0, 4).map(([k, v]: [string, string]) => (
                    <div key={k} className="flex justify-between items-start gap-2">
                      <span className="capitalize text-muted-foreground">{k}:</span>
                      <span className="font-medium text-right">{v}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => handleOpenModal(plan)}
                  className="w-full py-3 rounded-xl font-semibold transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                >
                  🛒 Order Sekarang
                </button>
              </div>
            );
          })}
        </div>

        {/* Order Modal - Simplified */}
        {isModalOpen && selectedPlan && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] p-4"
            onClick={handleCloseModal}
          >
            <div
              className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border-2 border-blue-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-blue-600 text-white p-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">{selectedPlan.name}</h3>
                    <p className="text-white/80 text-sm mt-1">Lengkapi formulir pemesanan</p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                  {Array.from({ length: maxStep }, (_, i) => i + 1).map((step) => (
                    <React.Fragment key={step}>
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                          currentStep >= step ? "bg-white text-blue-600" : "bg-white/30 text-white"
                        )}
                      >
                        {step}
                      </div>
                      {step < maxStep && (
                        <div
                          className={cn(
                            "h-1 rounded transition-colors flex-1 mx-1",
                            isProxyCategory ? "max-w-16" : "max-w-8",
                            currentStep > step ? "bg-white" : "bg-white/30"
                          )}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                {/* Step 1: Region Selection */}
                {currentStep === 1 && !isProxyCategory && (
                  <div className="space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-card-foreground mb-4">Pilih Region</h4>
                    <div className="grid gap-3">
                      {getAvailableRegions().map((r) => (
                        <button
                          key={r}
                          onClick={() => setFormData({ ...formData, region: r })}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-colors text-left",
                            formData.region === r
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-border bg-card hover:border-blue-500/50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base sm:text-lg font-semibold text-card-foreground">{r}</span>
                            {formData.region === r && <Check className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2/1: Quantity & Usage */}
                {((currentStep === 2 && !isProxyCategory) || (currentStep === 1 && isProxyCategory)) && (
                  <div className="space-y-6">
                    <h4 className="text-lg sm:text-xl font-bold text-card-foreground mb-4">Kuantitas dan Kegunaan</h4>
                    <div>
                      <label className="block text-sm font-semibold text-card-foreground mb-2">Jumlah Unit</label>
                      <input
                        type="number"
                        min={1}
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-card-foreground mb-2">
                        Digunakan Untuk Apa? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.usage}
                        onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                        placeholder="Contoh: Hosting website e-commerce, development aplikasi, dll."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      />
                      {formData.usage.trim() === "" && (
                        <p className="text-red-500 text-xs mt-1">Field ini wajib diisi</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: OS Selection */}
                {currentStep === 3 && !isProxyCategory && (
                  <div className="space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-card-foreground mb-4">Pilih Sistem Operasi</h4>
                    <div className="grid gap-3">
                      {getAvailableOS().map((os) => (
                        <button
                          key={os}
                          onClick={() => setFormData({ ...formData, os })}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-colors text-left",
                            formData.os === os
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-border bg-card hover:border-blue-500/50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base sm:text-lg font-semibold text-card-foreground">{os}</span>
                            {formData.os === os && <Check className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* IP Options */}
                    {selectedCategory === "rdp" && (
                      <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border-2 border-blue-500/30">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="ipPublic"
                            checked={formData.ipPublic}
                            onChange={(e) => setFormData({ ...formData, ipPublic: e.target.checked })}
                            className="mt-1 w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <label htmlFor="ipPublic" className="font-semibold text-card-foreground cursor-pointer block">
                              Tambah IP Public (+Rp85.000/bulan)
                            </label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Default menggunakan IP NAT. Pilih IP Public jika membutuhkan open all port untuk kebutuhan tertentu.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategory === "vps" && (
                      <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border-2 border-blue-500/30">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-500" />
                          <span className="font-semibold text-card-foreground">IP Public sudah termasuk dalam paket</span>
                        </div>
                      </div>
                    )}
                    
                    {selectedCategory === "baremetal" && (
                      <div className="mt-6 p-4 bg-muted rounded-xl border-2 border-border">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-card-foreground">🏠 Menggunakan IP Local</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4/2: Duration */}
                {((currentStep === 4 && !isProxyCategory) || (currentStep === 2 && isProxyCategory)) && (
                  <div className="space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-card-foreground mb-4">Pilih Durasi</h4>
                    <div className="grid gap-3">
                      {["1 Bulan (30 Hari)", "1 Tahun"].map((duration) => {
                        let price = (duration === "1 Bulan (30 Hari)" ? selectedPlan.price.bulanan : selectedPlan.price.tahunan) * formData.quantity;
                        if (selectedCategory === "rdp" && formData.ipPublic) price += 85000 * formData.quantity;
                        
                        return (
                          <button
                            key={duration}
                            onClick={() => setFormData({ ...formData, duration })}
                            className={cn(
                              "p-4 rounded-xl border-2 transition-colors text-left",
                              formData.duration === duration
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-border bg-card hover:border-blue-500/50"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-base sm:text-lg font-semibold text-card-foreground block">{duration}</span>
                                <span className="text-sm text-muted-foreground">Rp{price.toLocaleString("id-ID")}</span>
                              </div>
                              {formData.duration === duration && <Check className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 5/3: Confirmation */}
                {((currentStep === 5 && !isProxyCategory) || (currentStep === 3 && isProxyCategory)) && (
                  <div className="space-y-6">
                    <h4 className="text-lg sm:text-xl font-bold text-card-foreground mb-4">Konfirmasi Pesanan</h4>
                    <div className="bg-blue-500/10 rounded-xl p-6 space-y-3 border-2 border-blue-500/20">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-muted-foreground font-medium text-sm">📦 Nama Paket:</span>
                        <span className="text-card-foreground font-bold text-right">{selectedPlan.name}</span>
                      </div>
                      {formData.region && (
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-muted-foreground font-medium text-sm">🌍 Region:</span>
                          <span className="text-card-foreground font-semibold text-right">{formData.region}</span>
                        </div>
                      )}
                      {formData.os && !isProxyCategory && (
                        <>
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-muted-foreground font-medium text-sm">💻 OS:</span>
                            <span className="text-card-foreground font-semibold text-right">{formData.os}</span>
                          </div>
                          
                          <div className="flex justify-between items-start gap-4 bg-blue-500/20 -mx-2 px-4 py-3 rounded-lg border-l-4 border-blue-500">
                            <span className="text-card-foreground font-semibold text-sm">🌐 Tipe IP:</span>
                            <span className="text-card-foreground font-bold text-right">
                              {selectedCategory === "vps" && "✅ IP Public (Termasuk)"}
                              {selectedCategory === "rdp" && (formData.ipPublic ? "✅ IP Public (+Rp85.000)" : "🔒 IP NAT (Default)")}
                              {selectedCategory === "baremetal" && "🏠 IP Local"}
                            </span>
                          </div>
                          
                          {selectedCategory === "rdp" && formData.ipPublic && (
                            <div className="bg-blue-500/10 p-3 rounded-lg -mx-2">
                              <p className="text-xs text-card-foreground font-medium">
                                ℹ️ IP Public memungkinkan open all port untuk kebutuhan yang memerlukan akses port tertentu
                              </p>
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-muted-foreground font-medium text-sm">🔢 Kuantitas:</span>
                        <span className="text-card-foreground font-semibold text-right">{formData.quantity}</span>
                      </div>
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-muted-foreground font-medium text-sm">⏱️ Durasi:</span>
                        <span className="text-card-foreground font-semibold text-right">{formData.duration}</span>
                      </div>
                      <div className="flex justify-between items-start pt-3 border-t-2 border-blue-500/30 gap-4">
                        <span className="text-muted-foreground font-medium text-sm">💰 Total Harga:</span>
                        <span className="text-blue-500 font-bold text-lg sm:text-xl text-right">
                          Rp{getFinalPrice().toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex flex-col pt-3 border-t-2 border-blue-500/30">
                        <span className="text-muted-foreground font-medium text-sm mb-2">🎯 Digunakan Untuk:</span>
                        <span className="text-card-foreground font-semibold bg-background p-3 rounded-lg text-sm">{formData.usage}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <button
                        onClick={handleWhatsAppOrder}
                        className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-colors bg-[#25D366] hover:bg-[#20BD5A] text-white"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Order via WhatsApp
                      </button>
                      <button
                        onClick={handleTelegramOrder}
                        className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                        </svg>
                        Order via Telegram
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Navigation */}
              {currentStep < maxStep && (
                <div className="bg-muted p-4 sm:p-6 border-t flex items-center justify-between flex-shrink-0">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className={cn(
                      "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base",
                      currentStep === 1
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-card text-card-foreground border-2 border-blue-500/20 hover:border-blue-500 hover:text-blue-500"
                    )}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Kembali</span>
                  </button>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {currentStep} / {maxStep}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={cn(
                      "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base",
                      canProceed()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    <span className="hidden sm:inline">Lanjut</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
