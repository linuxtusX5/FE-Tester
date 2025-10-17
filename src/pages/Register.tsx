import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const key = name as keyof RegisterFormData;
    setFormData((prev: RegisterFormData) => ({
      ...prev,
      [key]: value,
    }));
  };
  interface RegisterFormData {
    [key: string]: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
  }

  interface ParsedErrors {
    [key: string]: string | string[];
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register(formData as RegisterFormData);
      navigate("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      try {
        const errors = JSON.parse(message) as ParsedErrors;
        const errorMessages = Object.entries(errors)
          .map(
            ([key, value]) =>
              `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
          )
          .join("\n");
        setError(errorMessages);
      } catch {
        setError(message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Sign up to get Started</p>

        {error && (
          <div className="error-message" style={{ whiteSpace: "pre-line" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="youremail@gmail.com"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a Password"
              required
              minLength={8}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirm">Confirm Password</label>
            <input
              id="password_confirm"
              type="password"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              placeholder="Confirm your Password"
              required
              minLength={8}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
