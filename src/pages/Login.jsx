import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import api from "../lib/api";

const Login = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      navigate("/listings", { replace: true });
    }
  }, [cookies.token]); // ✅ FIXED

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
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
      const { data } = await api.post("/auth/login", inputValue);

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
      toast.error("Something went wrong");
    }

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
          <h1>Step into a cleaner, calmer hosting dashboard.</h1>
          <p className="auth-copy">
            Sign in to manage listings, refresh property details, and keep your
            travel platform ready for launch.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <strong>Manage your listings</strong>
              <span>Update titles, replace photos, and keep every stay polished.</span>
            </div>
            <div className="auth-feature">
              <strong>Stay deployment-ready</strong>
              <span>Move from development to a public-facing product with more confidence.</span>
            </div>
            <div className="auth-feature">
              <strong>Designed to feel premium</strong>
              <span>Your auth flow now matches the rest of the experience visually.</span>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <span className="auth-eyebrow">Sign in</span>
          <h2>Login to StayX</h2>
          <p className="auth-subcopy">
            Pick up where you left off and continue shaping your travel platform.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </label>

            <button className="auth-submit" type="submit">
              Login
            </button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account? <Link className="auth-link" to="/signup">Signup</Link>
          </p>
        </section>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
