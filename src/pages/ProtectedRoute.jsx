import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../lib/api";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        // ✅ backend checks cookie automatically
        const { data } = await api.post("/auth/verify");

        setIsAuth(data.status); // true or false
      } catch (err) {
        setIsAuth(false);
      }
    };

    verify();
  }, []);

  // ⏳ While checking
  if (isAuth === null) {
    return <h3 style={{ textAlign: "center" }}>Checking auth...</h3>;
  }

  // ❌ Not logged in
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return children;
}