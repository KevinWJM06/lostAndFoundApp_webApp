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

// --- Admin Dashboard ---
const AdminDashboard = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState("list"); // list / edit / delete
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch items from backend
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();

      const mappedItems = data.map((item) => ({
        id: item.id,
        name: item.item_name,
        location: item.location,
        type: item.category,
        status: item.status,
        description: item.description,
      }));
      setItems(mappedItems);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setCurrentView("edit");
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setCurrentView("delete");
  };

  const handleBackToList = () => {
    setSelectedItem(null);
    setCurrentView("list");
  };

  const handleConfirmDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete item");
      await fetchItems();
      handleBackToList();
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-container" style={{ maxWidth: 1200 }}>
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="btn btn-outline" onClick={onLogout}>
            Logout
          </button>
        </div>

        {currentView === "list" && (
          <ViewItems
            items={items}
            isAdmin={true}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onBack={handleBackToList}
          />
        )}

        {currentView === "edit" && selectedItem && (
          <EditItem item={selectedItem} onBack={handleBackToList} refreshItems={fetchItems} />
        )}

        {currentView === "delete" && selectedItem && (
          <DeleteItem
            item={selectedItem}
            onBack={handleBackToList}
            onConfirm={() => handleConfirmDelete(selectedItem.id)}
          />
        )}

        {isLoading && currentView === "list" && <p>Loading items...</p>}
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