import React, { useState, useEffect } from 'react';


const ViewItems = ({ onBack, isAdmin, onEdit, onDelete }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setItems([]);
        setIsLoading(false);
    }, []);

    const handleDelete = (item) => {
        if (onDelete) {
            onDelete(item);
        }
    };

    const handleEdit = (item) => {
        if (onEdit) {
            onEdit(item);
        } else {
            alert(`Edit functionality for ${item.name} would go here.`);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        if (dateString.match(new RegExp('^\\d{2}[/-]\\d{2}[/-]\\d{4}$'))) return dateString.replace(/-/g, '/');

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container" style={{ padding: isAdmin ? '0' : 'calc(var(--header-height) + 2rem) 1.5rem 2rem 1.5rem' }}>
            {!isAdmin && (
                <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: '1rem' }}>
                    &larr; Back to Home
                </button>
            )}

            <div className="recent-items-header">
                <h2>{isAdmin ? 'Manage Items' : 'All Lost Items'}</h2>
            </div>

            <div className="recent-items-grid">
                {isLoading ? (
                    <p>Loading items from database...</p>
                ) : items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="card">
                            <h3 className="item-title">{item.name}</h3>
                            <div className="item-meta">📍 {item.location}</div>
                            <div className="item-meta">🕒 {formatDate(item.date)}</div>
                            <span className="item-tag">{item.type}</span>

                            {isAdmin && (
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        className="btn btn-outline"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                                        onClick={() => handleDelete(item)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px', gridColumn: '1 / -1' }}>
                        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>No items found in the database.</p>
                        <p style={{ marginTop: '0.5rem' }}>Try adjusting your search or check back later.</p>
                        <small style={{ display: 'block', marginTop: '1rem', color: '#999' }}>
                            Data source: Disconnected
                        </small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewItems;
