// --- RecentItems Component ---
import React, { useState, useEffect } from 'react';
import config from '../config/API\\'; // make sure path is correct
import { MapPin } from 'lucide-react';

const RecentItems = ({ onViewAllClick }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${config.api.baseUrl}/items`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();

                if (!Array.isArray(data)) throw new Error("Invalid data format from API");

                const mappedItems = data
                    .slice(0, 3) // only last 3 items
                    .map(item => ({
                        id: item.id,
                        name: item.item_name,
                        location: item.location,
                        date: item.date_found || 'N/A',
                        type: item.category,
                        status: item.status || 'Lost'
                    }));

                setItems(mappedItems);
            } catch (err) {
                console.error("Error fetching items:", err);
                setError('Unable to fetch items from backend. Check database connection.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);

    const formatDate = dateString => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <section className="recent-items-section">
            <div className="container">
                <div className="recent-items-header">
                    <h2>Recently Found</h2>
                    <span
                        onClick={onViewAllClick}
                        style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}
                    >
                        View All &rarr;
                    </span>
                </div>

                {isLoading ? (
                    <p>Loading items from database...</p>
                ) : error ? (
                    <div style={{ color: 'red', padding: '1rem', textAlign: 'center' }}>{error}</div>
                ) : items.length > 0 ? (
                    <div className="recent-items-grid">
                        {items.map(item => (
                            <div key={item.id} className="card">
                                <h3 className="item-title">{item.name}</h3>
                                <div className="item-meta"><MapPin size={16} /> {item.location}</div>
                                <div className="item-meta">🕒 {formatDate(item.date)}</div>
                                <span className="item-tag">{item.type}</span>
                                <br />
                                <span className={`item-status ${
                                    item.status.toLowerCase().includes('avail') ? 'status-available' :
                                    item.status.toLowerCase() === 'claimed' ? 'status-claimed' : ''
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: 8 }}>
                        <p style={{ color: '#6c757d' }}>No items found.</p>
                        <small>Connect to backend database.</small>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentItems;