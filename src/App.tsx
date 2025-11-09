import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Arvore from './pages/Arvore';
import DashboardApp from './pages/DashboardApp';
import { VerifyEmail } from './pages/VerifyEmail';

function App() {
  return (
    <Routes>
      {/* Halaman utama sekarang Arvore */}
      <Route path="/" element={<Arvore />} />

      {/* Dashboard system */}
      <Route path="/app/*" element={<DashboardApp />} />

      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  );
}

export default App;
