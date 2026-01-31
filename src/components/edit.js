import React, { useState, useEffect } from "react";
import ViewItems from "./viewitems";
import EditItem from "./edit";
import DeleteItem from "./delete";

const API_BASE_URL = "https://lnfrp.onrender.com"; // Your backend URL

const AdminDashboard = ({ onLogout }) => {
  const [items, setItems] = useState([]);
  const [currentView, setCurrentView] = useState("list"); // "list", "edit", "delete"
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fetch items from backend ---
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/items`);
      if (!res.ok) throw new Error("Failed to fetch items");
      const data = await res.json();

      const mapped = data.map((item) => ({
        id: item.id,
        name: item.item_name,
        location: item.location,
        type: item.category,
        status: item.status,
        description: item.description,
      }));

      setItems(mapped);
    } catch (err) {
      console.error("Fetch error:", err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // --- Handlers ---
  const handleEdit = (item) => {
    setSelectedItem(item);
    setCurrentView("edit");
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setCurrentView("delete");
  };

  const handleConfirmDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchItems(); // Refresh list after deletion
      setCurrentView("list");
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedItem(null);
  };

  return (
    <div className="admin-overlay">
      <div className="admin-container" style={{ maxWidth: 1200 }}>
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="btn btn-outline" onClick={onLogout}>
            Logout
          </button>
        </div>

        {isLoading && currentView === "list" && <p>Loading items...</p>}

        {currentView === "list" && !isLoading && (
          <ViewItems
            items={items}
            isAdmin={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {currentView === "edit" && selectedItem && (
          <EditItem
            item={selectedItem}
            onBack={handleBackToList}
            refreshItems={fetchItems} // Refresh list after editing
          />
        )}

        {currentView === "delete" && selectedItem && (
          <DeleteItem
            item={selectedItem}
            onBack={handleBackToList}
            onConfirm={() => handleConfirmDelete(selectedItem.id)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;