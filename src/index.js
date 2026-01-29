import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AddItem from './components/add';
import ViewItems from './components/viewitems';
import EditItem from './components/edit';
import DeleteItem from './components/delete';
import RecentItems from './components/recentitems'; // Use the component file
import config from './config/apiConfig';
import { MapPin } from 'lucide-react';

// --- Navbar Component ---
const Navbar = ({ onAdminClick }) => (
    <nav className="navbar">
        <div className="container navbar-container">
            <a href="/" className="navbar-logo">
                <div className="navbar-logo-icon"></div>
                Lost & Found
            </a>
            <button
                className="btn btn-outline"
                style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                onClick={onAdminClick}
            >
                Staff & Admin
            </button>
        </div>
    </nav>
);

// --- Hero Component ---
const Hero = ({ onReportClick, onViewAllClick }) => (
    <section className="hero-section">
        <div className="container hero-content">
            <h1 className="hero-headline">Lost something on campus?</h1>
            <p className="hero-subhead">
                Quickly search the database or report an item you've found or lost.
            </p>
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
                <h2 className="login-title">Staff Login</h2>
                {error && <div className="login-error">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-input"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="login-actions">
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Login</button>
                        <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- AdminDashboard Component ---
const AdminDashboard = ({ onLogout }) => {
    const [currentAdminView, setCurrentAdminView] = useState('list');
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleEditClick = item => { setItemToEdit(item); setCurrentAdminView('edit'); };
    const handleDeleteClick = item => { setItemToDelete(item); setCurrentAdminView('delete'); };
    const handleBackToList = () => { setItemToEdit(null); setItemToDelete(null); setCurrentAdminView('list'); };
    const handleConfirmDelete = async id => { console.log("Delete confirmed for ID:", id); handleBackToList(); };

    return (
        <div className="admin-overlay">
            <div className="admin-container" style={{ maxWidth: 1200 }}>
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <button className="btn btn-outline" onClick={onLogout}>Logout</button>
                </div>
                {currentAdminView === 'list' ? (
                    <ViewItems isAdmin={true} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                ) : currentAdminView === 'edit' ? (
                    <EditItem item={itemToEdit} onBack={handleBackToList} />
                ) : (
                    <DeleteItem item={itemToDelete} onBack={handleBackToList} onConfirm={handleConfirmDelete} />
                )}
            </div>
        </div>
    );
};

// --- Main App Component ---
function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentView, setCurrentView] = useState('home');

    const handleNavigateHome = () => setCurrentView('home');
    const handleNavigateAdd = () => setCurrentView('add');
    const handleNavigateViewAll = () => setCurrentView('viewItems');
    const handleAdminClick = () => setIsLoginOpen(true);
    const handleLoginSuccess = () => setIsLoggedIn(true);
    const handleLogout = () => { setIsLoggedIn(false); setIsLoginOpen(false); };

    return (
        <div className="App">
            <Navbar onAdminClick={handleAdminClick} />
            {currentView === 'home' ? (
                <>
                    <Hero onReportClick={handleNavigateAdd} onViewAllClick={handleNavigateViewAll} />
                    <RecentItems onViewAllClick={handleNavigateViewAll} />
                </>
            ) : currentView === 'add' ? (
                <AddItem onBack={handleNavigateHome} />
            ) : (
                <ViewItems onBack={handleNavigateHome} />
            )}
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

// --- Entry Point ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);