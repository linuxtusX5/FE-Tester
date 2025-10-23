import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyItems, getCategories, createItem } from "../services/api";
import ItemModal from "../components/ItemModal";
import "./Categories.css";
import type { Category } from "../types/authTypes";

function MyItems() {
  const [items, setItems] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    loadCategories();
    loadItems();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.results || []);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getMyItems();
      setItems(data.results || []);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (itemData: any) => {
    try {
      await createItem(itemData);
      setShowModal(false);
      loadItems();
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="items-page">
      <div className="page-header">
        <h1 className="page-title">My Items</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          Create Item
        </button>
      </div>

      {loading && <div className="loading">Loading your items...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="items-grid">
          {items.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any items yet</p>
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary"
                style={{ marginTop: "16px" }}
              >
                Create Your First Item
              </button>
            </div>
          ) : (
            items.map((item) => (
              <Link
                to={`/items/${item.id}`}
                key={item.id}
                className="item-grid-card"
              >
                <div className="item-grid-header">
                  <h3 className="item-grid-title">{item.title}</h3>
                  <span
                    className={`status-badge ${
                      item.is_available ? "available" : "unavailable"
                    }`}
                  >
                    {item.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="item-grid-meta">
                  <span className="item-category">{item.category_name}</span>
                </div>
                <div className="item-grid-footer">
                  {item.price && (
                    <span className="item-price">${item.price}</span>
                  )}
                  <span className="item-quantity">Qty: {item.quantity}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {showModal && (
        <ItemModal
          categories={categories || []}
          onSave={handleCreateItem}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MyItems;
