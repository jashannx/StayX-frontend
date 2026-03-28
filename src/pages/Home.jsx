import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero-page">
      <div className="hero-shell">
        <section className="hero-panel">
          <div className="hero-grid">
            <div>
              <span className="hero-kicker">Welcome back</span>
              <h1 className="hero-title">Make every stay feel like a story worth telling.</h1>
              <p className="hero-copy">
                Your hosting dashboard is ready. Explore curated listings, launch a new
                property, or refine the one guests already love.
              </p>
              <div className="hero-actions">
                <Link className="hero-primary" to="/listings">
                  Browse Listings
                </Link>
                <Link className="hero-secondary" to="/listings/new">
                  Add New Listing
                </Link>
              </div>
            </div>

            <div className="hero-stat-grid">
              <div className="hero-stat-card">
                <strong>Fast</strong>
                <span>Create, edit, and manage stays in a cleaner workflow.</span>
              </div>
              <div className="hero-stat-card">
                <strong>Elegant</strong>
                <span>A warmer interface for guests and hosts alike.</span>
              </div>
              <div className="hero-story">
                <span className="hero-kicker">Host highlight</span>
                <p>
                  Great homes deserve a presentation that feels confident, calm, and
                  ready for deployment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
