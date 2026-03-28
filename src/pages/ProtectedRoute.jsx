import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [cookies] = useCookies(["token"]);
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (!cookies.token) {
        setIsAuth(false);
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:3001/auth/verify",
          {},
          { withCredentials: true }
        );

        setIsAuth(data.status);
      } catch (err) {
        setIsAuth(false);
      }
    };

    verify();
  }, [cookies.token]); // ✅ IMPORTANT

  if (isAuth === null) {
    return <h3 style={{ textAlign: "center" }}>Checking auth...</h3>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}