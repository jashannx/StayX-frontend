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
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/signup", inputValue);

      const { success, message } = data;

      if (success) {
        toast.success(message);

        // ✅ auto login after signup
        localStorage.setItem("isAuth", "true");

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
          <h1>Create Account</h1>
        </section>

        <section className="auth-card">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={inputValue.username}
              onChange={handleOnChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputValue.email}
              onChange={handleOnChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={inputValue.password}
              onChange={handleOnChange}
            />

            <button type="submit">Signup</button>
          </form>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;