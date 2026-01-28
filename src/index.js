import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import apiConfig from './config/apiConfig';

// --- Components ---

const Navbar = ({ onAdminClick }) => {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <a href="/" className="navbar-logo">
                    <div className="navbar-logo-icon"></div>
                    Campus Lost & Found
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
};

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="container hero-content">
                <h1 className="hero-headline">Lost something on campus?</h1>
                <p className="hero-subhead">
                    Quickly search the school repository or report an item you've found.
                </p>

                <div className="hero-search-container">
                    <input
                        type="text"
                        placeholder="Search for items (e.g. 'Blue TI-84 Calculator')..."
                        aria-label="Search lost items"
                    />
                </div>

                <div className="hero-actions">
                    <button className="btn btn-primary">Report Found Item</button>
                    <button className="btn btn-outline">View All Lost Items</button>
                </div>
            </div>
        </section>
    );
};

const RecentItems = () => {
    const dummyItems = [
        { id: 1, name: "Hydro Flask (Blue)", location: "Science Wing, Room 304", date: "Today", type: "Bottle" },
        { id: 2, name: "Math Textbook (Calculus)", location: "Library, Table 4", date: "Yesterday", type: "Book" },
        { id: 3, name: "AirPods Case", location: "Gymnasium Bleachers", date: "2 days ago", type: "Electronics" },
        { id: 4, name: "North Face Jacket", location: "Main Cafeteria", date: "Jan 24", type: "Clothing" },
    ];

    return (
        <section className="recent-items-section">
            <div className="container">
                <div className="recent-items-header">
                    <h2>Recently Found</h2>
                    <a href="/browse" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: '500' }}>View All &rarr;</a>
                </div>

                <div className="recent-items-grid">
                    {dummyItems.map(item => (
                        <div key={item.id} className="card">
                            <h3 className="item-title">{item.name}</h3>
                            <div className="item-meta">📍 {item.location}</div>
                            <div className="item-meta">🕒 {item.date}</div>
                            <span className="item-tag">{item.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LoginModal = ({ onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const { dummyUser } = apiConfig.auth;

        if (username === dummyUser.username && password === dummyUser.password) {
            onLoginSuccess();
        } else {
            setError('Invalid username or password');
        }
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
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

const AdminDashboard = ({ onLogout }) => {
    return (
        <div className="admin-overlay">
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <button className="btn btn-outline" onClick={onLogout}>Logout</button>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">12</div>
                        <div className="stat-label">Pending Reports</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">45</div>
                        <div className="stat-label">Items in Storage</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">8</div>
                        <div className="stat-label">Claims to Review</div>
                    </div>
                </div>

                <h3>Recent Activity</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                    System ready. Select a module from the sidebar (Coming Soon) to manage items.
                </p>
            </div>
        </div>
    );
};

// --- Main App Component ---

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleAdminClick = () => {
        if (isLoggedIn) {
            setIsLoginOpen(true);
        } else {
            setIsLoginOpen(true);
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsLoginOpen(false);
    };

    return (
        <div className="App">
            <Navbar onAdminClick={handleAdminClick} />
            <Hero />
            <RecentItems />

            {isLoginOpen && (
                <>
                    {isLoggedIn ? (
                        <AdminDashboard onLogout={handleLogout} />
                    ) : (
                        <LoginModal
                            onClose={() => setIsLoginOpen(false)}
                            onLoginSuccess={handleLoginSuccess}
                        />
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
