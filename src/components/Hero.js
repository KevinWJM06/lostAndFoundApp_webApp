import React from 'react';

const Hero = () => {
    const styles = {
        hero: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            paddingTop: 'var(--header-height)',
            overflow: 'hidden'
        },
        content: {
            textAlign: 'center',
            zIndex: 2,
            maxWidth: '800px'
        },
        subhead: {
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
            marginTop: '1rem'
        },
        btnGroup: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
        },
        glow: {
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(0,0,0,0) 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            pointerEvents: 'none'
        }
    };

    return (
        <section style={styles.hero}>
            <div style={styles.glow} />

            <div className="container" style={styles.content}>
                <h1>Reconnect with what matters.</h1>
                <p style={styles.subhead}>
                    The modern platform to effectively report lost items and reunite with your belongings.
                    Simple, secure, and fast.
                </p>

                <div style={styles.btnGroup}>
                    <button className="btn btn-primary">Report Lost Item</button>
                    <button className="btn btn-outline">I Found Something</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
