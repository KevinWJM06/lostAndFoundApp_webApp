import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AddItem from './components/add';
import ViewItems from './components/viewitems';
import RecentItems from './components/recentitems';
import AdminDashboard from './components/AdminDashboard';

// --- Navbar Component ---
const Navbar = ({ onAdminClick }) => (
  <nav className="navbar">
    <div className="container navbar-container">
      <a href="/" className="navbar-logo">
        <div className="navbar-logo-icon"></div>
        Lost & Found
      </a>
      <button className="btn btn-outline" onClick={onAdminClick}>
        Staff & Admin
      </button>
    </div>
  </nav>
);

// --- Hero Component ---
const Hero = ({ onReportClick, onViewAllClick }) => (
  <section className="hero-section">
    <div className="container hero-content">
      <h1>Lost something on campus?</h1>
      <p>Quickly search the database or report an item you've found or lost.</p>
      <div className="hero-actions">
        <button className="btn btn-primary" onClick={onReportClick}>Report Found Item</button>
        <button className="btn btn-outline" onClick={onViewAllClick}>View All Lost Items</button>
      </div>
    </div>
  </section>
);

// --- LoginModal Component ---
const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    if (username && password) onLoginSuccess();
    else setError('Please enter credentials');
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <h2>Staff Login</h2>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Login</button>
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigateHome = () => setCurrentView('home');
  const handleNavigateAdd = () => setCurrentView('add');
  const handleNavigateViewAll = () => setCurrentView('viewItems');

  const handleAdminClick = () => setIsLoginOpen(true);
  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => { setIsLoggedIn(false); setIsLoginOpen(false); };

  return (
    <div className="App">
      <Navbar onAdminClick={handleAdminClick} />

      {currentView === 'home' && (
        <>
          <Hero onReportClick={handleNavigateAdd} onViewAllClick={handleNavigateViewAll} />
          <RecentItems onViewAllClick={handleNavigateViewAll} />
        </>
      )}

      {currentView === 'add' && <AddItem onBack={handleNavigateHome} />}
      {currentView === 'viewItems' && <ViewItems onBack={handleNavigateHome} />}

      {isLoginOpen && (
        <>
          {isLoggedIn ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <LoginModal onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
          )}
        </>
      )}
    </div>
  );
}

// --- Render App ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);