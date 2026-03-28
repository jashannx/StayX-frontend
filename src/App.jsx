import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./lib/api";

export default function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api
      .get("/listings")
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="listing-page">
      <div className="listing-shell">
        <section className="hero-panel">
          <div className="hero-grid">
            <div>
              <span className="hero-kicker">Find your next stay</span>
              <h1 className="hero-title">Beautiful homes for every kind of trip.</h1>
              <p className="hero-copy">
                Browse city apartments, mountain cabins, and coastal escapes with a
                calmer, more polished booking experience.
              </p>
              <div className="hero-actions">
                <Link className="hero-primary" to="/listings/new">
                  Create a Listing
                </Link>
                <a className="hero-secondary" href="#featured-listings">
                  Explore stays
                </a>
              </div>
            </div>

            <div className="hero-stat-grid">
              <div className="hero-stat-card">
                <strong>{listings.length}+</strong>
                <span>Listings ready to explore</span>
              </div>
              <div className="hero-stat-card">
                <strong>24/7</strong>
                <span>Hosting inspiration for your next trip</span>
              </div>
              <div className="hero-story">
                <span className="hero-kicker">Curated comfort</span>
                <p>
                  From weekend hideaways to extended remote-work stays, StayX is
                  designed to make discovery feel elegant and fast.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="featured-listings">
          <div className="section-header">
            <div>
              <span className="section-kicker">Featured collection</span>
              <h2 className="section-title">Fresh places worth bookmarking</h2>
              <p className="section-copy">
                Browse the latest homes in the collection and jump straight into the
                details that matter: location, price, and atmosphere.
              </p>
            </div>
          </div>

          {listings.length === 0 ? (
            <div className="empty-state">
              <h3>No listings yet</h3>
              <p>Create the first beautiful stay and start building your catalog.</p>
            </div>
          ) : (
            <div className="listing-grid">
              {listings.map((listing) => (
                <Link
                  key={listing._id}
                  to={`/listings/${listing._id}`}
                  className="listing-card-link"
                >
                  <article className="listing-card">
                    <div className="listing-card-media">
                      <img src={listing.image} alt={listing.title} />
                      <div className="listing-card-overlay">
                        <span className="listing-pill">{listing.country}</span>
                        <span className="listing-pill listing-rating">Guest favorite</span>
                      </div>
                    </div>

                    <div className="listing-card-body">
                      <h3 className="listing-card-title">{listing.title}</h3>
                      <p className="listing-card-location">{listing.location}</p>
                      <div className="listing-card-footer">
                        <div className="listing-card-price">
                          &#8377;{Number(listing.price || 0).toLocaleString("en-IN")}
                          <span> / night</span>
                        </div>
                        <span className="listing-card-tag">StayX pick</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
