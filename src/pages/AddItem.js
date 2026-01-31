import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddItem = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        type: '',
        description: ''
    });

    // FIX: This line was missing!
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // FIX: Using api.post instead of fetch + config
            await api.post('/items', {
                item_name: formData.name,
                category: formData.type,
                location: formData.location,
                description: formData.description,
                status: 'Available',
                date_found: new Date().toISOString()
            });
            
            alert('Item reported successfully!');
            navigate('/'); 
        } catch (error) {
            console.error(error);
            alert('Error reporting item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ padding: 'calc(var(--header-height) + 2rem) 1.5rem 2rem 1.5rem' }}>
            <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginBottom: '1rem' }}>
                &larr; Back to Home
            </button>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Report Found Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Item Name</label>
                        <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} placeholder="e.g. Blue Hydro Flask" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Location Found</label>
                        <input type="text" name="location" className="form-input" value={formData.location} onChange={handleChange} placeholder="e.g. Science Wing, Room 304" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <select name="type" className="form-input" value={formData.type} onChange={handleChange} required>
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
                        <textarea name="description" className="form-input" value={formData.description} onChange={handleChange} placeholder="Any other details..." rows="4" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '1rem' }}>
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;