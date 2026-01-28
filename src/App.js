import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecentItems from './components/RecentItems';
import AdminPlaceholder from './components/AdminPlaceholder';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="App">
      <Navbar onAdminClick={() => setIsAdminOpen(true)} />
      <Hero />
      <RecentItems />

      {isAdminOpen && (
        <AdminPlaceholder onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}

export default App;
