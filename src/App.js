import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";

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