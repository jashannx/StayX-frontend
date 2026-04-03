import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../lib/api";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data } = await api.get("/auth/verify");
        setIsAuth(data.status);
      } catch (error) {
        setIsAuth(false);
      }
    };

    verifyAuth();
  }, []);

  if (isAuth === null) {
    return <h3 style={{ textAlign: "center" }}>Checking auth...</h3>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
