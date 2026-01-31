import React, { useState, useEffect } from "react";
import api from '../api';

// FIX: Use './' because these files are in the same folder (src/pages)
import ViewItems from "./All_Items";
import EditItem from "./Edit_Item";
import DeleteItem from "./Confirm_delete";

const AdminDashboard = ({ onLogout }) => {
  const [items, setItems] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fetch items from backend ---
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/items');

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
      await api.delete(`/items/${id}`);
      await fetchItems();
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
          <button className="btn btn-outline" onClick={onLogout}>Logout</button>
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
            refreshItems={fetchItems}
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