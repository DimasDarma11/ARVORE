import HeroArvore from "./components/HeroArvore";
import { BrandCard } from "./components/BrandCard";

const brands = [
  { name: "ArvoTech", desc: "Solusi teknologi dan inovasi digital.", path: "/arvotech" },
  { name: "ArvoCloud", desc: "Layanan VPS dan RDP berkualitas tinggi.", path: "/arvocloud" },
  { name: "ArvoAgro", desc: "Teknologi untuk dunia pertanian modern.", path: "/arvoagro" },
  { name: "ArvoVisual", desc: "Desain dan visual branding profesional.", path: "/arvovisual" },
];

export default function Arvore() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <HeroArvore />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto p-8">
        {brands.map((b) => (
          <BrandCard key={b.name} name={b.name} desc={b.desc} path={b.path} />
        ))}
      </div>
    </main>
  );
}
