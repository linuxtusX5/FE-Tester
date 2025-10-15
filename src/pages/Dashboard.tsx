import React from "react";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">total_items</div>
          <div className="stat-label">Total Items</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">available_items</div>
          <div className="stat-label">Available Items</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">total_categories</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
