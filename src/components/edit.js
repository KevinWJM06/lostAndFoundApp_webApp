import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

const EditItem = ({ item, onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    description: "",
  });

  // Load selected item into form
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        location: item.location || "",
        type: item.category || "", // backend uses "category"
        description: item.description || "",
      });
    }
  }, [item]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/items/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item_name: formData.name,   // MUST match backend
            category: formData.type,
            location: formData.location,
            status: item.status,        // keep existing status
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      console.log("Item updated successfully");
      onBack();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update item");
    }
  };

  if (!item) return null;

  return (
    <div className="container" style={{ padding: "0" }}>
      <button
        onClick={onBack}
        className="btn btn-outline"
        style={{ marginBottom: "1rem" }}
      >
        &larr; Back to List
      </button>

      <div
        className="card"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          Edit Item
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
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
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
