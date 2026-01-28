import React from 'react';

const Navbar = ({ onAdminClick }) => {
    const styles = {
        nav: {
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '0 2rem',
            backgroundColor: 'rgba(2, 6, 23, 0.8)', // Semi-transparent based on bg-dark
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--glass-border)'
        },
        logo: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--secondary-teal)',
            textDecoration: 'none',
            letterSpacing: '-0.03em'
        },
        adminBtn: {
            fontSize: '0.9rem',
            padding: '8px 20px'
        }
    };

    return (
        <nav style={styles.nav}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <a href="/" style={styles.logo}>Lost & Found</a>

                <button
                    className="btn btn-outline"
                    style={styles.adminBtn}
                    onClick={onAdminClick}
                >
                    Admin Access
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
