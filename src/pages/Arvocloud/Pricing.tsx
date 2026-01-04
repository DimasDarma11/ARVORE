import React, { useState, useMemo, useCallback } from "react";
import { Check, Star, Zap, Crown, Server, Cpu, ShieldCheck, Search, SlidersHorizontal, ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface PlanSpec {
  [key: string]: string;
}

interface Plan {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  price: { bulanan: number; tahunan: number | null };
  specs: PlanSpec;
}

interface CartItem extends Plan {
  quantity: number;
  selectedCycle: "bulanan" | "tahunan";
  category: string;
}

type Category = "idn" | "usa" | "sg" | "baremetal" | "proxy";
type SortOption = "default" | "price-low" | "price-high" | "name";

// ================= PRICING CARD COMPONENT =================
const PricingCard = React.memo(({ 
  plan, 
  billingCycle, 
  onAddToCart,
  isInCart
}: { 
  plan: Plan; 
  billingCycle: "bulanan" | "tahunan";
  onAddToCart: (plan: Plan, cycle: "bulanan" | "tahunan") => void;
  isInCart: boolean;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isPremium = plan.icon === Star;
  const isElite = plan.icon === Crown;
  const IconComponent = plan.icon;
  
  const handleAddToCart = useCallback(() => {
    if (!isInCart) {
      onAddToCart(plan, billingCycle);
    }
  }, [plan, billingCycle, onAddToCart, isInCart]);
  
  const topSpecs = useMemo(() => {
    const entries = Object.entries(plan.specs);
    return entries.slice(0, 3);
  }, [plan.specs]);

  const currentPrice = plan.price[billingCycle];
  const hasPrice = currentPrice !== null;
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-lg p-4 border backdrop-blur-sm transition-all duration-300 bg-white dark:bg-gray-900",
        isPremium || isElite
          ? "border-orange-300 shadow-lg"
          : "border-gray-200 dark:border-gray-800 shadow-sm",
        isHovered ? "shadow-xl" : ""
      )}
    >
      {isPremium && (
        <div className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg shadow-md">
          Terlaris
        </div>
      )}
      
      {isElite && (
        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg shadow-md">
          Premium
        </div>
      )}
      
      <div className="mb-3">
        <div className={cn(
          "w-12 h-12 mb-3 rounded-xl flex items-center justify-center",
          isPremium || isElite ? "bg-gradient-to-br from-orange-500 to-orange-600" : "bg-gray-100 dark:bg-gray-800"
        )}>
          <IconComponent className={cn(
            "w-6 h-6",
            isPremium || isElite ? "text-white" : "text-gray-600 dark:text-gray-400"
          )} />
        </div>
        
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          {plan.name}
        </h3>
        
        {hasPrice ? (
          <>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-black text-orange-600 dark:text-orange-500">
                Rp{currentPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {billingCycle === "bulanan" ? "/bln" : "/thn"}
              </span>
            </div>
            
            {billingCycle === "tahunan" && plan.price.tahunan && plan.price.bulanan && (
              <div className="inline-block bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs px-2 py-0.5 rounded">
                Hemat {Math.round((1 - plan.price.tahunan / (plan.price.bulanan * 12)) * 100)}%
              </div>
            )}
          </>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {billingCycle === "tahunan" ? "Hanya tersedia paket bulanan" : "Harga tersedia"}
          </div>
        )}
      </div>
      
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        {topSpecs.map(([k, v]) => (
          <div key={k} className="flex items-start gap-2 text-xs">
            <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {v}
            </span>
          </div>
        ))}
        
        {Object.keys(plan.specs).length > 3 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-500 hover:text-orange-700 font-medium"
          >
            {showDetails ? "Lebih sedikit" : `+${Object.keys(plan.specs).length - 3} lainnya`}
          </button>
        )}
        
        {showDetails && (
          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            {Object.entries(plan.specs).slice(3).map(([k, v]) => (
              <div key={k} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={!hasPrice}
        className={cn(
          "w-full py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm",
          hasPrice
            ? "bg-orange-600 hover:bg-orange-700 text-white hover:shadow-md"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        )}
      >
        <ShoppingCart className="w-4 h-4" />
        {hasPrice ? "Masukkan Keranjang" : "Tidak Tersedia"}
      </button>
    </div>
  );
});

// ================= MAIN PRICING COMPONENT =================
const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"bulanan" | "tahunan">("bulanan");
  const [selectedCategory, setSelectedCategory] = useState<Category>("idn");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const whatsappNumber = "6283197183724";

  const categories = useMemo(() => [
    { id: "idn" as Category, name: "Indonesia", icon: Server },
    { id: "usa" as Category, name: "USA", icon: Server },
    { id: "sg" as Category, name: "Singapore", icon: Server },
    { id: "baremetal" as Category, name: "Bare Metal", icon: Cpu },
    { id: "proxy" as Category, name: "Proxy", icon: ShieldCheck },
  ], []);

  const plans = useMemo(() => ({
    idn: [
      { name: "1 vCPU 1GB", icon: Zap, price: { bulanan: 50000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "15 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "1 IPv4" } },
      { name: "1 vCPU 2GB", icon: Zap, price: { bulanan: 75000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "1 IPv4" } },
      { name: "2 vCPU 4GB", icon: Zap, price: { bulanan: 95000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
      { name: "4 vCPU 8GB", icon: Star, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "40 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
      { name: "6 vCPU 16GB", icon: Star, price: { bulanan: 260000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "60GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
      { name: "8 vCPU 16GB", icon: Crown, price: { bulanan: 265000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "80 GB SSD NVMe", network: "Port Speed 1 Gbps", ip: "IP NAT" } },
    ],
    usa: [
      { name: "2 vCPU 1GB", icon: Zap, price: { bulanan: 50000, tahunan: null }, specs: { cpu: "AMD EPYC 7551", storage: "50 GB SSD NVMe", network: "Port Speed 500 Mbps", IP: "1 IPv4" } },
      { name: "2 vCPU 3.5GB", icon: Zap, price: { bulanan: 100000, tahunan: null }, specs: { cpu: "AMD Ryzen 7 5700G", storage: "60 GB SSD NVMe", network: "Port Speed 500 Mbps", IP: "IP NAT" } },
      { name: "2 vCPU 4GB", icon: Zap, price: { bulanan: 95000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "20 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
      { name: "4 vCPU 6GB", icon: Zap, price: { bulanan: 135000, tahunan: null }, specs: { cpu: "Intel Xeon E5 Gold 6530", storage: "75 GB SSD NVMe", network: "Port Speed 10 Gbps", IP: "IP NAT" } },
      { name: "4 vCPU 7GB", icon: Star, price: { bulanan: 185000, tahunan: null }, specs: { cpu: "AMD Ryzen 7 5700G", storage: "120 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "1 IPv4" } },
      { name: "4 vCPU 8GB", icon: Crown, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "40 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
      { name: "6 vCPU 16GB", icon: Crown, price: { bulanan: 260000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "60 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
      { name: "8 vCPU 16GB", icon: Crown, price: { bulanan: 230000, tahunan: null }, specs: { cpu: "Intel / AMD EPYC Processor", storage: "160 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "1 IPv4" } },
      { name: "8 vCPU 16GB", icon: Crown, price: { bulanan: 275000, tahunan: null }, specs: { cpu: "Intel Xeon E5 V4", storage: "80 GB SSD NVMe", network: "Port Speed 1 Gbps", IP: "IP NAT" } },
    ],
    sg: [
      { name: "4 vCPU 6GB", icon: Zap, price: { bulanan: 150000, tahunan: null }, specs: { cpu: "AMD EPYC", storage: "100 GB SSD NVMe", network: "Port Speed 10 Gbps", IP: "1 IPv4" } },
    ],
    baremetal: [
      { name: "Bare Metal ID 1", icon: Zap, price: { bulanan: 350000, tahunan: 3850000 }, specs: { cpu: "Intel Core i3 Gen 6", ram: "8 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal ID 2", icon: Star, price: { bulanan: 400000, tahunan: 4400000 }, specs: { cpu: "Intel Core i3 Gen 6", ram: "16 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal ID 3", icon: Crown, price: { bulanan: 450000, tahunan: 4950000 }, specs: { cpu: "Intel Core i3 Gen 6", ram: "24 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal ID 4", icon: Crown, price: { bulanan: 550000, tahunan: 6050000 }, specs: { cpu: "Intel Core i3 Gen 6", ram: "32 GB RAM", storage: "256 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal ID 5", icon: Star, price: { bulanan: 750000, tahunan: 8250000 }, specs: { cpu: "Intel Core i7 Gen 4", ram: "32 GB RAM", storage: "512 GB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
      { name: "Bare Metal USA", icon: Star, price: { bulanan: 1500000, tahunan: 16500000 }, specs: { cpu: "AMD Ryzen 7 5700G", ram: "64 GB RAM", storage: "1 TB SSD", network: "Port Speed 1 Gbps", emulator: "Support emulator & game" } },
    ],
    proxy: [
      { name: "Proxy Rotating IP", icon: Zap, price: { bulanan: 45000, tahunan: 540000 }, specs: { Bandwidth: "1GB", Rotasi: "1-120 Menit" } },
      { name: "Proxy Residential Static", icon: ShieldCheck, price: { bulanan: 140000, tahunan: 1680000 }, specs: { Bandwidth: "Unlimited", Negara: "27+ Country" } },
    ],
  }), []);

  const currentPlans = useMemo(() => plans[selectedCategory] || [], [plans, selectedCategory]);

  // Filter dan Sort
  const filteredAndSortedPlans = useMemo(() => {
    let filtered = currentPlans.filter(plan => 
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(plan.specs).some(spec => 
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (sortOption === "price-low") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.price[billingCycle] || Infinity;
        const priceB = b.price[billingCycle] || Infinity;
        return priceA - priceB;
      });
    } else if (sortOption === "price-high") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.price[billingCycle] || 0;
        const priceB = b.price[billingCycle] || 0;
        return priceB - priceA;
      });
    } else if (sortOption === "name") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [currentPlans, searchQuery, sortOption, billingCycle]);

  const addToCart = useCallback((plan: Plan, cycle: "bulanan" | "tahunan") => {
    const categoryName = categories.find(c => c.id === selectedCategory)?.name || selectedCategory;
    
    setCart(prev => {
      const existing = prev.find(item => 
        item.name === plan.name && 
        item.selectedCycle === cycle &&
        item.category === categoryName
      );
      
      if (existing) {
        return prev.map(item =>
          item.name === plan.name && 
          item.selectedCycle === cycle &&
          item.category === categoryName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { ...plan, quantity: 1, selectedCycle: cycle, category: categoryName }];
    });
    
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 2000);
  }, [selectedCategory, categories]);

  // Check if item is in cart
  const isItemInCart = useCallback((planName: string, cycle: "bulanan" | "tahunan") => {
    const categoryName = categories.find(c => c.id === selectedCategory)?.name || selectedCategory;
    return cart.some(item => 
      item.name === planName && 
      item.selectedCycle === cycle &&
      item.category === categoryName
    );
  }, [cart, selectedCategory, categories]);

  const updateQuantity = useCallback((index: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter((_, i) => i !== index));
    } else {
      setCart(prev => prev.map((item, i) => 
        i === index ? { ...item, quantity: newQuantity } : item
      ));
    }
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = item.price[item.selectedCycle] || 0;
      return sum + (price * item.quantity);
    }, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    
    let message = "Halo, saya ingin memesan:\n\n";
    
    cart.forEach((item, index) => {
      const price = item.price[item.selectedCycle] || 0;
      const priceText = item.selectedCycle === "bulanan" ? "per bulan" : "per tahun";
      
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Kategori: ${item.category}\n`;
      message += `   Harga: Rp${price.toLocaleString("id-ID")} ${priceText}\n`;
      message += `   Jumlah: ${item.quantity}\n`;
      message += `   Subtotal: Rp${(price * item.quantity).toLocaleString("id-ID")}\n\n`;
    });
    
    message += `*Total: Rp${cartTotal.toLocaleString("id-ID")}*\n\n`;
    message += "Apakah paket-paket ini tersedia?";
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }, [cart, cartTotal, whatsappNumber]);

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .cart-popup {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>

      {/* Cart Popup Notification */}
      {showCartPopup && (
        <div className="fixed top-4 right-4 z-50 cart-popup bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="font-semibold">Berhasil ditambahkan ke keranjang!</span>
        </div>
      )}

      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowCart(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Keranjang Belanja ({cartItemCount})
              </h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Keranjang masih kosong</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {cart.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.category} • {item.selectedCycle === "bulanan" ? "Bulanan" : "Tahunan"}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="w-7 h-7 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="w-7 h-7 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-500">
                              Rp{((item.price[item.selectedCycle] || 0) * item.quantity).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-4 sticky bottom-0 bg-white dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Total</span>
                      <span className="text-2xl font-black text-blue-600 dark:text-blue-500">
                        Rp{cartTotal.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Checkout via WhatsApp
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      <section className="relative bg-gray-50 dark:bg-gray-950 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
              Pilih Paket{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Terbaik
              </span>
              {" "}Anda
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredAndSortedPlans.length} produk tersedia
            </p>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
            {categories.map((c) => {
              const IconComp = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={cn(
                    "flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all font-medium text-sm",
                    selectedCategory === c.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-blue-500"
                  )}
                >
                  <IconComp className="w-4 h-4" />
                  <span className="truncate">{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-3 md:p-4 mb-6 border border-gray-200 dark:border-gray-800">
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari paket atau spesifikasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>

              {/* Sort and Billing Toggle */}
              <div className="flex gap-2">
                {/* Sort */}
                <div className="flex-1 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Termurah</option>
                    <option value="price-high">Termahal</option>
                    <option value="name">A-Z</option>
                  </select>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg whitespace-nowrap">
                  <span className={cn(
                    "text-xs font-medium transition-colors",
                    billingCycle === "bulanan" ? "text-gray-900 dark:text-white" : "text-gray-500"
                  )}>
                    Bulanan
                  </span>
                  <button
                    onClick={() => setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")}
                    className={cn(
                      "relative w-10 h-5 rounded-full transition-all",
                      billingCycle === "tahunan" ? "bg-orange-600" : "bg-gray-300 dark:bg-gray-700"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full bg-white shadow transition-transform",
                        billingCycle === "tahunan" ? "translate-x-5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                  <span className={cn(
                    "text-xs font-medium transition-colors",
                    billingCycle === "tahunan" ? "text-gray-900 dark:text-white" : "text-gray-500"
                  )}>
                    Tahunan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          {filteredAndSortedPlans.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg">
              <Search className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Tidak ada paket yang sesuai dengan pencarian Anda</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-24">
              {filteredAndSortedPlans.map((plan, i) => {
                const inCart = isItemInCart(plan.name, billingCycle);
                return (
                  <PricingCard 
                    key={`${selectedCategory}-${plan.name}-${billingCycle}-${inCart}`} 
                    plan={plan} 
                    billingCycle={billingCycle}
                    onAddToCart={addToCart}
                    isInCart={inCart}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Pricing;
