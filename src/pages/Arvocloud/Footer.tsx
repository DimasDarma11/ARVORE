import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground tracking-wide">
            © 2025 <span className="text-foreground font-semibold">ARVOCLOUD</span>. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
