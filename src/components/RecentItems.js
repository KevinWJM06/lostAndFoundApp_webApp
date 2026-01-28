import React from 'react';

const RecentItems = () => {
    const dummyItems = [
        { id: 1, name: "Hydro Flask (Blue)", location: "Science Wing, Room 304", date: "Today", type: "Bottle" },
        { id: 2, name: "Math Textbook (Calculus)", location: "Library, Table 4", date: "Yesterday", type: "Book" },
        { id: 3, name: "AirPods Case", location: "Gymnasium Bleachers", date: "2 days ago", type: "Electronics" },
        { id: 4, name: "North Face Jacket", location: "Main Cafeteria", date: "Jan 24", type: "Clothing" },
    ];

    const styles = {
        section: {
            padding: '4rem 0',
            backgroundColor: 'var(--bg-white)',
            borderTop: '1px solid var(--border-light)'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            marginBottom: '2rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
        },
        itemTitle: {
            fontSize: '1.1rem',
            marginBottom: '0.5rem',
            fontWeight: '600'
        },
        meta: {
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            marginBottom: '0.25rem'
        },
        tag: {
            display: 'inline-block',
            fontSize: '0.75rem',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: '#f1f5f9',
            color: 'var(--secondary-slate)',
            marginTop: '1rem',
            fontWeight: '500'
        }
    };

    return (
        <section style={styles.section}>
            <div className="container">
                <div style={styles.header}>
                    <h2>Recently Found</h2>
                    <a href="/browse" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: '500' }}>View All &rarr;</a>
                </div>

                <div style={styles.grid}>
                    {dummyItems.map(item => (
                        <div key={item.id} className="card">
                            <h3 style={styles.itemTitle}>{item.name}</h3>
                            <div style={styles.meta}>📍 {item.location}</div>
                            <div style={styles.meta}>🕒 {item.date}</div>
                            <span style={styles.tag}>{item.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentItems;
