import React, { useState, useEffect } from "react";

// 🔑 Use your Render backend URL
const API_BASE_URL = "https://lnfrp.onrender.com";

const EditItem = ({ item, onBack, refreshItems }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    description: "",
  });

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_name: formData.name,
          category: formData.type,
          location: formData.location,
          status: item.status,
        }),
      });

      if (!response.ok) throw new Error("Failed to update item");

      await refreshItems(); // refresh parent list
      onBack(); // go back to list
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update item");
    }
  };

  if (!item) return null;

  return (
    <div className="container" style={{ padding: "0" }}>
      <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: "1rem" }}>
        &larr; Back to List
      </button>

      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Edit Item</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Bottle">Bottle</option>
              <option value="Book">Book</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;