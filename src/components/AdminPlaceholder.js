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
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        },
        panel: {
            width: '100%',
            maxWidth: '500px',
            padding: '2rem',
            backgroundColor: '#0f172a', /* Hardcoded dark bg */
            color: '#f8fafc',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '1rem'
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#ffffff'
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '1.5rem',
            cursor: 'pointer'
        },
        section: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            color: '#38bdf8', /* Light blue */
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
            color: '#cbd5e1',
            border: '1px solid rgba(255,255,255,0.1)'
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Admin Portal Placeholder</h2>
                    <button style={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>

                <div style={styles.section}>
                    <p style={{ marginBottom: '1rem', color: '#cbd5e1' }}>
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
