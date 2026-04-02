import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../lib/api";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
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
      const { data } = await api.post("/auth/signup", inputValue);
      const { success, message } = data;

      if (success) {
        toast.success(message);

        setTimeout(() => {
          navigate("/listings", { replace: true });
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred");
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-hero">
          <span className="auth-eyebrow">Start hosting</span>
          <h1>Create a premium hosting space with a stronger first impression.</h1>
          <p className="auth-copy">
            Join StayX to publish homes, refine the guest experience, and build a
            platform that feels warm, modern, and launch-ready from day one.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <strong>Launch your first listings</strong>
              <span>Turn ideas into live spaces with a flow that feels straightforward.</span>
            </div>
            <div className="auth-feature">
              <strong>Design for trust</strong>
              <span>Present homes with clearer details, stronger imagery, and polished copy.</span>
            </div>
            <div className="auth-feature">
              <strong>Grow with confidence</strong>
              <span>Build a clean starting point for the product you want guests to remember.</span>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <span className="auth-eyebrow auth-eyebrow-dark">Create account</span>
          <h2>Sign up for StayX</h2>
          <p className="auth-subcopy">
            Create your host profile and start curating your next collection of stays.
          </p>

          <div className="auth-badge-row">
            <span className="auth-badge">Fast setup</span>
            <span className="auth-badge">Premium presentation</span>
            <span className="auth-badge">Built for hosts</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={inputValue.username}
                onChange={handleOnChange}
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={inputValue.email}
                onChange={handleOnChange}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={inputValue.password}
                onChange={handleOnChange}
                required
              />
            </label>

            <button className="auth-submit" type="submit">
              Create account
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link className="auth-link" to="/login">Login here</Link>
          </p>
        </section>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
