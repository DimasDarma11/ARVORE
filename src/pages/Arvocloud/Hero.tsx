import React from "react";
import Link from "next/link";
import NoticeModal from "./NoticeModal";

export default function Hero() {
  return (
    <>
      <NoticeModal />
      <section className="relative overflow-hidden px-6 py-24 md:py-32 bg-neutral-950">
        {/* Background subtle gradient */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)]"
          aria-hidden="true"
        />

        {/* Subtle top glow */}
        <div
          className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/80 backdrop-blur-md">
            {/* Use standard Tailwind width/height classes to avoid invalid class names */}
            <span className="inline-block w-3 h-3 rounded-full bg-blue-400" aria-hidden="true" />
            <span>ArvoCloud Performance Network</span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white">
            Solusi Hosting <span className="text-blue-400">VPS &amp; RDP</span>
            <br /> Berstandar Premium
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Layanan server cepat, stabil, dan aman—menggunakan jaringan berperforma tinggi
            untuk memastikan pengalaman maksimal pada setiap aktivitas bisnis Anda.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center gap-4">
            <Link href="#pricing" legacyBehavior>
              <a className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold transition-colors hover:bg-blue-500">
                Lihat Paket
              </a>
            </Link>

            <Link href="https://stats.uptimerobot.com/z9kCx5qEsD" legacyBehavior>
              <a className="rounded-xl border border-white/20 px-6 py-3 text-white/80 font-semibold backdrop-blur-md transition-colors hover:border-white/40 hover:text-white">
                Stats Server
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
