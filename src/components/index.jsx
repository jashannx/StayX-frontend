import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../lib/api";

const STAR_COUNT = 5;
const STAR_ICON = "\u2605";

export default function Index() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 3,
    comment: "",
  });

  const fetchListing = async () => {
    try {
      const res = await api.get(`/listings/${id}`);
      setListing(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/verify");
      setCurrentUserId(data.user?._id ?? null);
    } catch (err) {
      setCurrentUserId(null);
    }
  };

  useEffect(() => {
    fetchListing();
    fetchCurrentUser();
  }, [id]);

  const isOwner = listing?.owner?._id === currentUserId;

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewForm.comment.trim()) {
      alert("Please enter a review comment");
      return;
    }

    try {
      setIsSubmittingReview(true);
      await api.post(`/listings/${id}/reviews`, reviewForm);
      setReviewForm({
        rating: 5,
        comment: "",
      });
      await fetchListing();
    } catch (err) {
      console.log(err);
      alert("Failed to add review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    try {
      await api.delete(`/listings/${id}/reviews/${reviewId}`);
      await fetchListing();
    } catch (err) {
      console.log(err);
      alert("Failed to delete review");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await api.delete(`/listings/${id}`);
      navigate("/listings");
    } catch (err) {
      console.log(err);
      alert("Failed to delete listing");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!listing) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2>{listing.title}</h2>

      <img
        src={listing.image || "https://via.placeholder.com/500"}
        alt={listing.title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/500";
        }}
        style={{ maxWidth: "500px", borderRadius: "10px" }}
      />
      <h3>{listing.owner.username}</h3>
      <h4 className="mt-3">Rs {listing.price} / Night</h4>
      <p className="mt-2">{listing.description}</p>
      <h5 className="mt-3">{listing.location}</h5>

      <h3>{listing.country}</h3>

      {isOwner && (
        <div className="d-flex gap-2 mt-3">
          <Link to={`/listings/${id}/edit`} className="btn btn-warning">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      <div className="mt-5">
        <h3>Add Review</h3>
        <form onSubmit={handleReviewSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label d-block">
              Rating
            </label>
            <div
              className="d-flex align-items-center gap-2 flex-wrap"
              role="radiogroup"
              aria-label="Rating"
            >
              {Array.from({ length: STAR_COUNT }, (_, index) => {
                const value = index + 1;
                const isFilled = value <= reviewForm.rating;

                return (
                  <button
                    key={value}
                    type="button"
                    className="btn p-0 border-0 bg-transparent"
                    onClick={() =>
                      setReviewForm((prev) => ({
                        ...prev,
                        rating: value,
                      }))
                    }
                    aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                    aria-pressed={reviewForm.rating === value}
                    style={{
                      fontSize: "2rem",
                      lineHeight: 1,
                      color: isFilled ? "#f4b400" : "#d3d3d3",
                    }}
                  >
                    {STAR_ICON}
                  </button>
                );
              })}
              <span className="text-muted">{reviewForm.rating} / 5</span>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              className="form-control"
              rows="4"
              value={reviewForm.comment}
              onChange={handleReviewChange}
              placeholder="Write your review here"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark"
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? "Submitting..." : "Post Review"}
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h3>Reviews</h3>

        {!listing.reviews || listing.reviews.length === 0 ? (
          <p className="text-muted mt-3">No reviews yet.</p>
        ) : (
          <div className="mt-3">
            {listing.reviews.map((review) => (
              <div key={review._id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div
                      aria-label={`${review.rating} out of 5 stars`}
                      style={{ color: "#f4b400", fontSize: "1.25rem", lineHeight: 1 }}
                    >
                      {STAR_ICON.repeat(review.rating)}
                      <span style={{ color: "#d3d3d3" }}>
                        {STAR_ICON.repeat(STAR_COUNT - review.rating)}
                      </span>
                    </div>
                    <h5 className="card-title mb-0">{review.rating} / 5</h5>
                  </div>
                  <p className="card-text">{review.comment}</p>
                  {review.author?.username && (
                    <p className="card-text">
                      <small className="text-muted">By {review.author.username}</small>
                    </p>
                  )}
                  <p className="card-text">
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                  {review.author?._id === currentUserId && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleReviewDelete(review._id)}
                    >
                      Delete Review
                    </button>
                  )}
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

