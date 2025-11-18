import React, { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const testimonials = [
    {
      name: "Budi Santoso",
      avatar: "BS",
      rating: 5,
      text: "Server VPS sangat cepat dan stabil! Tim support responsif 24/7. Sudah 1 tahun pakai tidak pernah kecewa.",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Lek Kim",
      avatar: "LK",
      rating: 5,
      text: "RDP server stabil buat live streaming Youtube!",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Ahmad Rizki",
      avatar: "AR",
      rating: 5,
      text: "Bare Metal server powerful untuk clone emulator",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Diana Putri",
      avatar: "DP",
      rating: 5,
      text: "Server super stabil untuk toko online saya! Saat flash sale traffic tinggi pun tetap lancar.",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Mythical",
      avatar: "M",
      rating: 5,
      text: "RDP USA lancar dan stabil untuk pemakaian bot 24jam plus bisa diperpanjang lagi tiap bulannya.",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Rina Wulandari",
      avatar: "RW",
      rating: 5,
      text: "Baremetal Intel Core I3 joss buat main roblox.",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-blue-950/20"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-blue-500 font-semibold">Testimoni Pelanggan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Apa Kata{" "}
            <span className="text-blue-500">
              Mereka?
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Puluhan pelanggan puas dengan layanan kami. Lihat pengalaman mereka!
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`group relative p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-blue-500" />
              </div>
              <div className="relative">
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-sm font-bold text-white">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    {/* Stars */}
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
