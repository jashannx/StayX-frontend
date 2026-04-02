import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../lib/api";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data } = await api.get("/auth/verify");
        setIsAuthenticated(Boolean(data?.success));
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top main-navbar">
      <div className="container-fluid navbar-shell px-3 px-lg-4">
        <Link className="navbar-brand d-flex align-items-center gap-3" to={isAuthenticated ? "/listings" : "/login"}>
          <span className="brand-mark">
            <i className="fa-regular fa-compass"></i>
          </span>
          <span className="brand-text">
            <span className="brand-title">StayX</span>
            <span className="brand-subtitle">Curated escapes</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {isAuthenticated && (
            <>
              <div className="navbar-nav me-auto">
                <Link className="nav-link" to="/listings">
                  Discover
                </Link>
                <Link className="nav-link" to="/listings">
                  All Listings
                </Link>
              </div>

              <div className="d-flex align-items-center gap-2 flex-column flex-lg-row mt-3 mt-lg-0">
                <input
                  className="form-control navbar-search"
                  type="search"
                  placeholder="Search destinations"
                />

                <Link className="btn btn-pill btn-create" to="/listings/new">
                  Host Your Stay
                </Link>

                <button className="btn btn-pill btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className="ms-lg-auto d-flex align-items-center gap-2 flex-column flex-lg-row mt-3 mt-lg-0">
              <span className="navbar-guest-copy">Join to browse, host, and manage your stays.</span>
              <Link className="btn btn-pill btn-ghost" to="/login">
                Login
              </Link>
              <Link className="btn btn-pill btn-create" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
