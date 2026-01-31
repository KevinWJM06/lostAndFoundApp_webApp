import React, { useState, useEffect } from "react";
import api from "../services/api"; // FIX: Correct path to services folder

const EditItem = ({ item, onBack, refreshItems }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        location: item.location || "",
        type: item.type || "", 
        description: item.description || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.put(`/items/${item.id}`, {
        item_name: formData.name,
        category: formData.type,
        location: formData.location,
        description: formData.description,
        status: item.status, 
      });

      alert("Item updated successfully!");
      if (refreshItems) await refreshItems();
      onBack();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!item) return null;

  return (
    <div className="container" style={{ padding: "0" }}>
      <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: "1rem" }}>
        &larr; Back to List
      </button>

      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Edit Item</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Location Found</label>
            <input type="text" name="location" className="form-input" value={formData.location} onChange={handleChange} required />
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
            <textarea name="description" className="form-input" value={formData.description} onChange={handleChange} rows="4" />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: "100%", marginTop: "1rem" }}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;