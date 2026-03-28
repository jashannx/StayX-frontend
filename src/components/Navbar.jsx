import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top main-navbar">
      <div className="container-fluid navbar-shell px-3 px-lg-4">
        <Link className="navbar-brand d-flex align-items-center gap-3" to="/listings">
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

            {cookies.token && (
              <button className="btn btn-pill btn-logout" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
