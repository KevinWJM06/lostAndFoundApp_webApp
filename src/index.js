import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AddItem from './components/add';
import ViewItems from './components/viewitems';
import EditItem from './components/edit';
import DeleteItem from './components/delete';
import config from './config/apiConfig';
import { MapPin } from 'lucide-react';

// --- Components ---

const Navbar = ({ onAdminClick }) => {
    return (
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
                    Admin
                </button>
            </div>
        </nav>
    );
};

const Hero = ({ onReportClick, onViewAllClick }) => {
    return (
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
};

const RecentItems = ({ onViewAllClick }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(config.api.baseUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();


                const mappedItems = data.slice(0, 3).map(item => ({
                    id: item.id,
                    name: item.item_name,
                    location: item.location,

                    type: item.category,
                    status: item.status
                }));

                setItems(mappedItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);



    return (
        <section className="recent-items-section">
            <div className="container">
                <div className="recent-items-header">
                    <h2>Recently Found</h2>
                    <span onClick={onViewAllClick} style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}>View All &rarr;</span>
                </div>

                <div className="recent-items-grid">
                    {isLoading ? (
                        <p>Loading items from database...</p>
                    ) : items.length > 0 ? (
                        items.map(item => (
                            <div key={item.id} className="card">
                                <h3 className="item-title">{item.name}</h3>
                                <div className="item-meta"><MapPin size={16} /> {item.location}</div>

                                <span className="item-tag">{item.type}</span> <br></br>
                                <span className={`item-status ${item.status && item.status.toLowerCase().includes('avail') ? 'status-available' : item.status && item.status.toLowerCase() === 'claimed' ? 'status-claimed' : ''}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px', gridColumn: '1 / -1' }}>
                            <p style={{ color: '#6c757d' }}>No items found.</p>
                            <small>Connect to backend database.</small>
                        </div>
                    )}
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


        // Demo login only
        if (username && password) {
            onLoginSuccess();
        } else {
            setError('Please enter credentials');
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
    const [currentAdminView, setCurrentAdminView] = useState('list');
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleEditClick = (item) => {
        setItemToEdit(item);
        setCurrentAdminView('edit');
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setCurrentAdminView('delete');
    };

    const handleBackToList = () => {
        setItemToEdit(null);
        setItemToDelete(null);
        setCurrentAdminView('list');
    };

    const handleConfirmDelete = async (id) => {
        console.log("Delete confirmed for ID:", id);
        handleBackToList();
    };

    return (
        <div className="admin-overlay">
            <div className="admin-container" style={{ maxWidth: '1200px' }}>
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
