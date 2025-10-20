import { useState, useEffect } from "react";
import { getDashboardStats, type DashboardStats } from "../services/api";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!stats) {
    return <div className="error-message">No data available</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total_items}</div>
          <div className="stat-label">Total Items</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.available_items}</div>
          <div className="stat-label">Available Items</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.total_categories}</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      {stats.recent_items?.length > 0 && (
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Items</h2>
            <Link to="#" className="link-button">
              View all
            </Link>
          </div>

          <div className="items-list">
            {stats.recent_items.map((item) => (
              <Link
                to={`/items/${item.id}`}
                key={item.id}
                className="item-card"
              >
                <div className="item-header">
                  <h3 className="item-title">{item.title}</h3>
                  <span
                    className={`status-badge ${
                      item.is_available ? "available" : "unavailable"
                    }`}
                  >
                    {item.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="item-meta">
                  <span className="item-category">{item.category_name}</span>
                  {item.price && (
                    <span className="item-price">${item.price}</span>
                  )}
                  <span className="item-quantity">QTY: {item.quantity}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
