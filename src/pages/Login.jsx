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

        // ✅ store login state
        localStorage.setItem("isAuth", "true");

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
          <h1>Login to StayX</h1>
        </section>

        <section className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={inputValue.email}
                onChange={handleOnChange}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={inputValue.password}
                onChange={handleOnChange}
              />
            </label>

            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </section>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;