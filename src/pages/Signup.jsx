import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3001/auth/signup",
        inputValue,
        { withCredentials: true }
      );

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
          <h1>Build your hosting space with a stronger first impression.</h1>
          <p className="auth-copy">
            Join StayX to publish listings, manage edits, and shape a more premium
            travel experience from day one.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <strong>Host-ready tools</strong>
              <span>Create listings, upload photos, and manage updates without friction.</span>
            </div>
            <div className="auth-feature">
              <strong>Guest-friendly presentation</strong>
              <span>Showcase homes with a layout that feels warm, modern, and memorable.</span>
            </div>
            <div className="auth-feature">
              <strong>One clean workflow</strong>
              <span>Everything you need to launch confidently before deployment.</span>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <span className="auth-eyebrow">Create account</span>
          <h2>Sign up for StayX</h2>
          <p className="auth-subcopy">
            Create your account and start curating your next collection of stays.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                name="username"
                value={inputValue.username}
                placeholder="Enter your username"
                onChange={handleOnChange}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={inputValue.email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={inputValue.password}
                placeholder="Create a password"
                onChange={handleOnChange}
              />
            </label>

            <button className="auth-submit" type="submit">
              Create Account
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link className="auth-link" to="/login">Login</Link>
          </p>
        </section>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
