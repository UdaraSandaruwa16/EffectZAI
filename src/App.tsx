import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Breed from './components/Breed'; 

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/breed" element={<Breed />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
