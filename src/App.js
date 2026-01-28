import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdminPlaceholder from './components/AdminPlaceholder';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="App">
      <Navbar onAdminClick={() => setIsAdminOpen(true)} />
      <Hero />

      {isAdminOpen && (
        <AdminPlaceholder onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}

export default App;
