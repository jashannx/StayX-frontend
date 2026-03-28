import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem("isAuth")));
  }, []);

  if (isAuth === null) {
    return <h3 style={{ textAlign: "center" }}>Checking auth...</h3>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
