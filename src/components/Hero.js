import React from 'react';

const Hero = () => {
    const styles = {
        hero: {
            paddingTop: 'calc(var(--header-height) + 4rem)',
            paddingBottom: '4rem',
            textAlign: 'center',
            background: 'radial-gradient(ellipse at top, #eff6ff 0%, var(--bg-main) 70%)'
        },
        content: {
            maxWidth: '700px',
            margin: '0 auto'
        },
        headline: {
            marginBottom: '1rem',
        },
        subhead: {
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
        },
        searchContainer: {
            position: 'relative',
            maxWidth: '500px',
            margin: '0 auto 2.5rem auto'
        },
        actions: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
        }
    };

    return (
        <section style={styles.hero}>
            <div className="container" style={styles.content}>
                <h1 style={styles.headline}>Lost something on campus?</h1>
                <p style={styles.subhead}>
                    Quickly search the school repository or report an item you've found.
                </p>

                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search for items (e.g. 'Blue TI-84 Calculator')..."
                        aria-label="Search lost items"
                    />
                </div>

                <div style={styles.actions}>
                    <button className="btn btn-primary">Report Found Item</button>
                    <button className="btn btn-outline">View All Lost Items</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
