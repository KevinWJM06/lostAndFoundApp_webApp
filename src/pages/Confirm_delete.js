import React from 'react';

const DeleteItem = ({ item, onBack, onConfirm }) => {
    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '500px' }}>
            <div className="card" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--accent-crimson)' }}>
                <h2 style={{ color: 'var(--accent-crimson)', marginBottom: '1rem' }}>Delete Item</h2>

                <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                    Are you sure you want to delete <strong>{item?.name}</strong>?
                    <br />
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>This action cannot be undone.</span>
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        className="btn btn-outline"
                        onClick={onBack}
                        style={{ minWidth: '100px' }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => onConfirm(item?.id)}
                        style={{ minWidth: '100px' }}
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteItem;