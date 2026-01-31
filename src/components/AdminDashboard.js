import React, { useState, useEffect } from "react";
import ViewItems from "./ViewItems";
import EditItem from "./Edit";
import DeleteItem from "./Delete";

const API_BASE_URL = "https://lnfrp.onrender.com";

const AdminDashboard = ({ onLogout }) => {
  const [currentAdminView, setCurrentAdminView] = useState("list");
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // -------- Fetch Items --------
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/items`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      setItems(
        data.map((item) => ({
          id: item.id,
          name: item.item_name,
          location: item.location,
          type: item.category,
          status: item.status,
          description: item.description,
        }))
      );
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // -------- Handlers --------
  const handleEditClick = (item) => {
    setItemToEdit(item);
    setCurrentAdminView("edit");
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setCurrentAdminView("delete");
  };

  const handleBackToList = () => {
    setItemToEdit(null);
    setItemToDelete(null);
    setCurrentAdminView("list");
  };

  const handleConfirmDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      await fetchItems();
      handleBackToList();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete item");
    }
  };

  // -------- Render --------
  return (
    <div className="admin-overlay">
      <div className="admin-container" style={{ maxWidth: 1200 }}>
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="btn btn-outline" onClick={onLogout}>
            Logout
          </button>
        </div>

        {isLoading && currentAdminView === "list" && <p style={{ padding: "1rem" }}>Loading items...</p>}

        {currentAdminView === "list" && !isLoading && (
          <ViewItems
            items={items}
            isAdmin={true}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onBack={handleBackToList}
          />
        )}

        {currentAdminView === "edit" && itemToEdit && (
          <EditItem item={itemToEdit} onBack={handleBackToList} refreshItems={fetchItems} />
        )}

        {currentAdminView === "delete" && itemToDelete && (
          <DeleteItem item={itemToDelete} onBack={handleBackToList} onConfirm={() => handleConfirmDelete(itemToDelete.id)} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;