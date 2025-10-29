import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getItem,
  updateItem,
  deleteItem,
  getCategories,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import ItemModal from "../components/ItemModal";
import type { Category, Item } from "../types/authTypes";
import "./ItemDetails.css";

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCategories();
    loadItem();
  }, [id]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const loadItem = async () => {
    try {
      setLoading(true);
      if (!id) throw new Error("Item ID is required");
      const data = await getItem(id);
      setItem(data as Item);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (itemData: any) => {
    if (!id) {
      throw new Error("Item ID is required");
    }
    try {
      await updateItem(id, itemData);
      setShowEditModal(false);
      loadItem();
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      if (!id) {
        throw new Error("Item ID is required");
      }
      setDeleting(true);
      await deleteItem(id);
      navigate("/my-items");
    } catch (err: any) {
      alert(err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading item...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!item) {
    return <div className="error-message">Item not found</div>;
  }

  const isOwner = user?.id === item.owner;

  return (
    <div className="item-detail">
      <div className="detail-header">
        <button onClick={() => navigate(-1)} className="btn-back">
          Back
        </button>
        {isOwner && (
          <div className="detail-actions">
            <button
              onClick={() => setShowEditModal(true)}
              className="btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn-danger"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>

      <div className="detail-card">
        <div className="detail-main">
          <div className="detail-title-section">
            <h1 className="detail-title">{item.title}</h1>
            <span
              className={`status-badge ${
                item.is_available ? "available" : "unavailable"
              }`}
            >
              {item.is_available ? "Available" : "Unavailable"}
            </span>
          </div>

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Category</span>
              <span className="meta-value">{item.category_name}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Owner</span>
              <span className="meta-value">{item.owner_username}</span>
            </div>
            {item.price && (
              <div className="meta-item">
                <span className="meta-label">Price</span>
                <span className="meta-value price">${item.price}</span>
              </div>
            )}
            <div className="meta-item">
              <span className="meta-label">Quantity</span>
              <span className="meta-value">{item.quantity}</span>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="section-title">Description</h2>
            <p className="detail-description">{item.description}</p>
          </div>

          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="detail-section">
              <h2 className="section-title">Tags</h2>
              <div className="tags-list">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.metadata && Object.keys(item.metadata).length > 0 && (
            <div className="detail-section">
              <h2 className="section-title">Additional Information</h2>
              <div className="metadata-grid">
                {Object.entries(item.metadata).map(([key, value]) => (
                  <div key={key} className="metadata-item">
                    <span className="metadata-key">{key}</span>
                    <span className="metadata-value">
                      {JSON.stringify(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="detail-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Timestamps</h3>
            <div className="timestamp-item">
              <span className="timestamp-label">Created</span>
              <span className="timestamp-value">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="timestamp-item">
              <span className="timestamp-label">Updated</span>
              <span className="timestamp-value">
                {new Date(item.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && item && (
        <ItemModal
          item={item}
          categories={categories}
          onSave={handleUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

export default ItemDetail;
