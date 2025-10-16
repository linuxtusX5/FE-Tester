import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Sign up to get Started</p>

        <form className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                // value={FormData.username}
                // onChange={handleChange}
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
                // value={FormData.email}
                // onChange={handleChange}
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
                // value={FormData.first_name}
                // onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                // value={FormData.last_name}
                // onChange={handleChange}
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
              // value={FormData.password}
              // onChange={handleChange}
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
              // value={FormData.password_confirm}
              // onChange={handleChange}
              placeholder="Confirm your Password"
              required
              minLength={8}
            />
          </div>
          <button className="btn-primary">Button</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
