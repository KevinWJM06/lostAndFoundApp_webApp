import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoginModal from './components/Login_Modal';

// Pages
import RecentItems from './pages/Home';
import AddItem from './pages/AddItem';
import ViewItems from './pages/All_Items';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <RecentItems />
            </>
          } />
          <Route path="/add" element={<AddItem />} />
          <Route path="/items" element={<ViewItems />} />
          <Route path="/login" element={<LoginModalWrapper />} />
          <Route path="/admin" element={<AdminDashboardWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Helper Wrappers
const LoginModalWrapper = () => {
  const navigate = React.useNavigate(); 
  return <LoginModal onClose={() => navigate('/')} onLoginSuccess={() => navigate('/admin')} />;
};

const AdminDashboardWrapper = () => {
  const navigate = React.useNavigate();
  return <AdminDashboard onLogout={() => navigate('/')} />;
};

// CRITICAL: This line must be here!
export default App;