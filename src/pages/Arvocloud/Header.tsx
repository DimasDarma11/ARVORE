import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Menu, X } from "lucide-react";

interface HeaderProps {
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

interface MenuItem {
  name: string;
  desc?: string;
  href?: string;
  route?: string;
  action?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Services", desc: "Solusi cloud & sistem digital modern", href: "#services" },
    { name: "Pricing", desc: "Paket fleksibel untuk setiap kebutuhan", href: "#pricing" },
    { name: "About", desc: "Cerita dan misi kami di balik Arvocloud", action: onAboutClick },
    { name: "Contact", desc: "Hubungi tim kami untuk kolaborasi", action: onContactClick },
    { name: "Rules", desc: "Peraturan penggunaan server Arvocloud", route: "/rules" },
  ];

  const handleMenuClick = (item: MenuItem) => {
    setIsMenuOpen(false);
    if (item.action) item.action();
    else if (item.href) document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    else if (item.route) navigate(item.route);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-200 ${ isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent" }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer select-none group">
          <img src="https://i.ibb.co/VYh29p8y/Arvocloud1.webp" alt="Arvocloud Logo" className="h-10 md:h-12 w-auto transition-transform duration-200 group-hover:scale-105" loading="eager" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {menuItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => handleMenuClick(item)} 
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
            > 
              {item.name} 
            </button>
          ))}
        </nav>

        {/* Login + Hamburger */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/loginpage" 
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-card text-card-foreground border border-border hover:border-primary/50 transition-all duration-200" 
          > 
            Login 
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 hover:bg-accent/50 rounded-lg transition-colors duration-200" aria-label="Toggle menu"
          > 
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />} 
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex flex-col py-5 px-6 space-y-4">
            {menuItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleMenuClick(item)} 
                className="flex items-start justify-between w-full text-left transition-colors duration-200">
                <div>
                  <p className="text-foreground font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground mt-1" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
