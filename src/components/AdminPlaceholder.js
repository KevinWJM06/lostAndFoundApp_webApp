import React from 'react';
import apiConfig from '../config/apiConfig';

const AdminPlaceholder = ({ onClose }) => {
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(2, 6, 23, 0.9)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        },
        panel: {
            width: '100%',
            maxWidth: '500px',
            padding: '2rem'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '1rem'
        },
        title: {
            fontSize: '1.5rem',
            color: 'var(--text-light)'
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.5rem',
            cursor: 'pointer'
        },
        section: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            color: 'var(--secondary-teal)',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        codeBlock: {
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            border: '1px solid var(--glass-border)'
        }
    };

    return (
        <div style={styles.overlay}>
            <div className="glass-panel" style={styles.panel}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Admin Portal Placeholder</h2>
                    <button style={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>

                <div style={styles.section}>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        This area is implementing future administrative capabilities including:
                        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Data Creation & Modification</li>
                            <li>Lost Item Management</li>
                            <li>User Claims Verification</li>
                        </ul>
                    </p>
                </div>

                <div style={styles.section}>
                    <span style={styles.label}>Current Configuration (Pre-connected)</span>
                    <div style={styles.codeBlock}>
                        <div><strong>API Base:</strong> {apiConfig.api.baseUrl}</div>
                        <div><strong>DB Host:</strong> {apiConfig.database.host}</div>
                        <div><strong>Admin Route:</strong> {apiConfig.admin.dashboardUrl}</div>
                    </div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%' }} onClick={onClose}>
                    Close Preview
                </button>
            </div>
        </div>
    );
};

export default AdminPlaceholder;
