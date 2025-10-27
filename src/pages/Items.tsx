import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getItems, getCategories, createItem } from "../services/api";
import ItemModal from "../components/ItemModal";
import type { Category, Item } from "../types/authTypes";
import "./Items.css";

function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    min_price: "",
    max_price: "",
  });

  useEffect(() => {
    loadCategories();
    loadItems();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      // setItems(data.results || []);
      if (data && typeof data === "object" && "results" in data) {
        setItems((data as { results: Item[] }).results || []);
      } else {
        setItems([]);
      }
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: any) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    loadItems();
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
        <h1 className="page-title">Items</h1>
        <button onClick={() => setShowModal} className="btn-primary">
          Create Item
        </button>
      </div>
      <div className="filters-section">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search Items..."
          className="search-input"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="min_price"
          value={filters.min_price}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="filter-input"
        />

        <input
          type="number"
          name="max_price"
          value={filters.max_price}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="filter-input"
        />

        <button onClick={handleSearch} className="btn-secondary">
          Search
        </button>
      </div>

      {loading && <div className="loading">Loading items...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="items-grid">
          {items.length === 0 ? (
            <div className="empty-state">No items found</div>
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
                  <span className="item-category">{item.title}</span>
                  {/* <span className="item-owner">by {item.owner_username}</span> */}
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
          categories={categories}
          onSave={handleCreateItem}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Items;
