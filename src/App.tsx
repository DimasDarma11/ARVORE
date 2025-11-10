import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Arvore from './pages/Arvore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Arvore />} />
    </Routes>
  );
}

export default App;
