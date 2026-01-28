import React, { useState } from 'react';
import apiConfig from '../config/apiConfig';

const AddItem = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        date: '',
        type: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiConfig.api.baseUrl}/items`, { // Requires Backend API
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Item reported successfully!");
                onBack();
            } else {
                alert("Failed to report item. Please try again.");
            }
        } catch (error) {
            console.error("Error reporting item:", error);
            alert("Error reporting item. Please check your connection.");
        }
    };

    return (
        <div className="container" style={{ padding: 'calc(var(--header-height) + 2rem) 1.5rem 2rem 1.5rem' }}>
            <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: '1rem' }}>
                &larr; Back to Home
            </button>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Report Found Item</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Blue Hydro Flask"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location Found</label>
                        <input
                            type="text"
                            name="location"
                            className="form-input"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Science Wing, Room 304"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date Found</label>
                        <input
                            type="date"
                            name="date"
                            className="form-input"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <select
                            name="type"
                            className="form-input"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Bottle">Bottle</option>
                            <option value="Book">Book</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-input"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Any other details..."
                            rows="4"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
