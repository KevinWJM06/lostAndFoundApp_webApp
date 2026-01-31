import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { MapPin } from 'lucide-react';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('${config.api.baseUrl}/items');
                if (!response.ok) throw new Error('HTTP error! status: ${response.status}');
                const data = await response.json();

                if (!Array.isArray(data)) throw new Error("Invalid data format from API");

                const mappedItems = data
                    .slice(0, 3) 
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
                setError('Unable to fetch items.');
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
        return date.toLocaleDateString('en-GB'); 
    };

    return (
        <section className="recent-items-section">
            <div className="container">
                <div className="recent-items-header">
                    <h2>Recently Found</h2>
                    <Link
                        to="/items"
                        style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 500 }}
                    >
                        View All &rarr;
                    </Link>
                </div>

                {isLoading ? (
                    <p>Loading items...</p>
                ) : error ? (
                    <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
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
                                    item.status && item.status.toLowerCase().includes('avail') ? 'status-available' :
                                    item.status && item.status.toLowerCase() === 'claimed' ? 'status-claimed' : ''
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: '#666' }}>No items found recently.</p>
                )}
            </div>
        </section>
    );
};

export default Home;