import React from "react";
import { MapPin } from "lucide-react";

const ViewItems = ({ items = [], isAdmin = false, onEdit, onDelete, onBack }) => {
  if (!items) items = [];

  return (
    <div
      className="container"
      style={{
        padding: isAdmin ? "0" : "calc(var(--header-height) + 2rem) 1.5rem 2rem 1.5rem",
      }}
    >
      {!isAdmin && (
        <button
          onClick={onBack}
          className="btn btn-outline"
          style={{ marginBottom: "1rem" }}
        >
          &larr; Back
        </button>
      )}

      <div className="recent-items-header">
        <h2>{isAdmin ? "Manage Items" : "All Lost Items"}</h2>
      </div>

      <div className="recent-items-grid">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="card">
              <h3 className="item-title">{item.name}</h3>
              <div className="item-meta">
                <MapPin size={16} /> {item.location}
              </div>
              <span className="item-tag">{item.type}</span>
              <br />
              <span
                className={`item-status ${
                  item.status?.toLowerCase().includes("avail")
                    ? "status-available"
                    : item.status?.toLowerCase() === "claimed"
                    ? "status-claimed"
                    : ""
                }`}
              >
                {item.status}
              </span>

              {isAdmin && (
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    className="btn btn-outline"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              background: "#f8f9fa",
              borderRadius: "8px",
              gridColumn: "1 / -1",
            }}
          >
            <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
              No items found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewItems;
