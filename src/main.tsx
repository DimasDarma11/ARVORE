import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import ArvoCloud from './pages/Arvocloud';
import ArvoTech from './pages/ArvoTech';
import ArvoAgro from './pages/ArvoAgro';
import ArvoVisual from './pages/ArvoVisual';
import LoginPage from './pages/Arvocloud/dashboard/LoginPage';
import Rules from './pages/Arvocloud/Rules';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/arvocloud/*" element={<ArvoCloud />} />
        <Route path="/arvotech" element={<ArvoTech />} />
        <Route path="/arvoagro" element={<ArvoAgro />} />
        <Route path="/arvovisual" element={<ArvoVisual />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
