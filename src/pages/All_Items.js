import React, { useState, useEffect } from "react";
import api from '../services/api';
import { MapPin } from "lucide-react";

const ViewItems = ({ items: initialItems, isAdmin, onEdit, onDelete, onBack }) => {
  const [items, setItems] = useState(initialItems || []);
  const [loading, setLoading] = useState(!initialItems);

  // If no items are passed (public view), fetch them
  useEffect(() => {
    if (!initialItems || initialItems.length === 0) {
      const fetchItems = async () => {
        try {
          const { data } = await api.get('/items');
          const mapped = data.map((item) => ({
            id: item.id,
            name: item.item_name,
            location: item.location,
            type: item.category,
            status: item.status,
          }));
          setItems(mapped);
        } catch (e) { console.error(e); }
        setLoading(false);
      };
      // Only fetch if we are NOT admin (admin passes items in)
      if (!isAdmin) fetchItems();
      else setLoading(false);
    } else {
      setItems(initialItems);
      setLoading(false);
    }
  }, [initialItems, isAdmin]);

  return (
    <div className="container" style={{ padding: isAdmin ? "0" : "2rem 1.5rem" }}>
      {!isAdmin && (
        <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: "1rem" }}>
          &larr; Back to Home
        </button>
      )}

      <div className="recent-items-header">
        <h2>{isAdmin ? "Manage Items" : "All Lost Items"}</h2>
      </div>

      <div className="recent-items-grid">
        {loading ? (
          <p style={{ padding: "1rem", textAlign: "center" }}>Loading items...</p>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="card">
              <h3 className="item-title">{item.name}</h3>
              <div className="item-meta">
                <MapPin size={16} /> {item.location}
              </div>
              <span className="item-tag">{item.type}</span>
              <br />
              <span
                className={`item-status ${item.status && item.status.toLowerCase().includes("avail")
                  ? "status-available"
                  : item.status && item.status.toLowerCase() === "claimed"
                    ? "status-claimed"
                    : ""
                  }`}
              >
                {item.status}
              </span>

              {isAdmin && (
                <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                  <button className="btn btn-outline" onClick={() => onEdit(item)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(item)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={{ padding: "1rem", textAlign: "center" }}>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewItems;
