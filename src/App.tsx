import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Arvore from './pages/Arvore';
import { VerifyEmail } from './pages/Arvocloud/dashboard/VerifyEmail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Arvore />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  );
}

export default App;
