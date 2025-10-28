import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";

function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: any) => location.pathname === path;

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            Item Manager
          </Link>
          <div className="navbar-menu">
            <Link
              to="/"
              className={isActive("/") ? "nav-link active" : "nav-link"}
            >
              Dashboard
            </Link>
            <Link
              to="/items"
              className={isActive("/items") ? "nav-link active" : "nav-link"}
            >
              Items
            </Link>
            <Link
              to="/categories"
              className={
                isActive("/categories") ? "nav-link active" : "nav-link"
              }
            >
              Categories
            </Link>
          </div>
          <div className="navbar-user">
            <span className="user-name">{user?.username}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
