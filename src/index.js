import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AddItem from "./components/add";
import ViewItems from "./components/viewitems";
import EditItem from "./components/edit";
import DeleteItem from "./components/delete";
import RecentItems from "./components/recentitems";
import { MapPin } from "lucide-react";

// --- Backend API ---
const API_BASE_URL = "https://lnfrp.onrender.com";

// --- Navbar ---
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

// --- Hero Section ---
const Hero = ({ onReportClick, onViewAllClick }) => (
  <section className="hero-section">
    <div className="container hero-content">
      <h1 className="hero-headline">Lost something on campus?</h1>
      <p className="hero-subhead">
        Quickly search the database or report an item you've found or lost.
      </p>
      <div className="hero-actions">
        <button className="btn btn-primary" onClick={onReportClick}>
          Report Found Item
        </button>
        <button className="btn btn-outline" onClick={onViewAllClick}>
          View All Lost Items
        </button>
      </div>
    </div>
  </section>
);

// --- Login Modal ---
const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) onLoginSuccess();
    else setError("Please enter credentials");
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <h2 className="login-title">Staff Login</h2>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="login-actions">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Login
            </button>
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }) => {
  const [currentAdminView, setCurrentAdminView] = React.useState("list");
  const [items, setItems] = React.useState([]);
  const [itemToEdit, setItemToEdit] = React.useState(null);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  const API_BASE_URL = "https://lnfrp.onrender.com";

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/items`);
      const data = await res.json();
      const mapped = data.map((i) => ({
        id: i.id,
        name: i.item_name,
        location: i.location,
        type: i.category,
        status: i.status,
        description: i.description,
      }));
      setItems(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setCurrentAdminView("edit");
  };

  const handleDeleteClick = async (item) => {
    try {
      const res = await fetch(`${API_BASE_URL}/items/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchItems(); // refresh after delete
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleBack = () => setCurrentAdminView("list");

  return (
    <div className="admin-overlay">
      <div className="admin-container" style={{ maxWidth: 1200 }}>
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="btn btn-outline" onClick={onLogout}>
            Logout
          </button>
        </div>

        {currentAdminView === "list" && (
          <ViewItems
            items={items}
            isAdmin={true}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        {currentAdminView === "edit" && itemToEdit && (
          <EditItem item={itemToEdit} onBack={handleBack} refreshItems={fetchItems} />
        )}
      </div>
    </div>
  );
};
// --- Main App ---
const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  const handleNavigateHome = () => setCurrentView("home");
  const handleNavigateAdd = () => setCurrentView("add");
  const handleNavigateViewAll = () => setCurrentView("viewItems");
  const handleAdminClick = () => setIsLoginOpen(true);
  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoginOpen(false);
  };

  return (
    <div className="App">
      <Navbar onAdminClick={handleAdminClick} />

      {currentView === "home" && (
        <>
          <Hero onReportClick={handleNavigateAdd} onViewAllClick={handleNavigateViewAll} />
          <RecentItems onViewAllClick={handleNavigateViewAll} />
        </>
      )}

      {currentView === "add" && <AddItem onBack={handleNavigateHome} />}
      {currentView === "viewItems" && <ViewItems onBack={handleNavigateHome} />}

      {isLoginOpen &&
        (isLoggedIn ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <LoginModal onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
        ))}
    </div>
  );
};

// --- Render App ---
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);