import React from 'react';

const Navbar = ({ onAdminClick }) => {
    const styles = {
        nav: {
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-white)',
            borderBottom: '1px solid var(--border-light)',
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000,
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        logo: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--text-main)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        logoIcon: {
            width: '24px',
            height: '24px',
            backgroundColor: 'var(--primary-blue)',
            borderRadius: '4px'
        }
    };

    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <a href="/" style={styles.logo}>
                    <div style={styles.logoIcon}></div>
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

export default Navbar;
