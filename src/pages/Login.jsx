import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../lib/api";
const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", inputValue, {
        withCredentials: true,
      });
      const { success, message } = data;

      if (success) {
        navigate("/listings");
      } else {
        toast.error(message || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred during login");
    };

    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-hero">
          <span className="auth-eyebrow">Welcome back</span>
          <h1>Step back into your hosting dashboard with everything in reach.</h1>
          <p className="auth-copy">
            Review listings, polish details, and keep your travel platform ready for
            guests with a calmer, more premium workflow.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <strong>Manage properties quickly</strong>
              <span>Update pricing, descriptions, and imagery without losing momentum.</span>
            </div>
            <div className="auth-feature">
              <strong>Stay launch-ready</strong>
              <span>Everything you need to keep your frontend polished and operational.</span>
            </div>
            <div className="auth-feature">
              <strong>Curated for hosts</strong>
              <span>A cleaner flow for the platform owners behind each unforgettable stay.</span>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <span className="auth-eyebrow auth-eyebrow-dark">Sign in</span>
          <h2>Login to StayX</h2>
          <p className="auth-subcopy">
            Pick up where you left off and continue shaping your collection of stays.
          </p>

          <div className="auth-badge-row">
            <span className="auth-badge">Property management</span>
            <span className="auth-badge">Host workflow</span>
            <span className="auth-badge">Guest-ready listings</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                name="email"
                value={inputValue.email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={inputValue.password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                required
              />
            </label>

            <button className="auth-submit" type="submit">
              Continue to dashboard
            </button>
          </form>

          <p className="auth-footer">
            New to StayX? <Link className="auth-link" to="/signup">Create your account</Link>
          </p>
        </section>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
