import React, { useState, useEffect } from 'react';
import apiConfig from '../config/apiConfig';

const ViewItems = ({ onBack, isAdmin, onEdit, onDelete }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${apiConfig.api.baseUrl}/items`); // Requires Backend API
                if (response.ok) {
                    const data = await response.json();
                    setItems(data);
                } else {
                    console.error("Failed to fetch all items");
                }
            } catch (error) {
                console.error("Error fetching items:", error);

                // Dummy data for admin testing if backend is down
                if (isAdmin) {
                    setItems([
                        {
                            id: 666,
                            name: "dummy data",
                            location: "retarted poly",
                            date: "28-01-2026",
                            type: "Test"
                        }
                    ]);
                }

            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
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
        // If already dd/mm/yyyy or dd-mm-yyyy, return as is (replacing - with / if needed)
        if (dateString.match(/^\d{2}[\/-]\d{2}[\/-]\d{4}$/)) return dateString.replace(/-/g, '/');

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
                            Data source: {apiConfig.api.baseUrl}
                        </small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewItems;
