import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function NewListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files?.[0] ?? null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("price", formData.price ? Number(formData.price) : 0);
      payload.append("location", formData.location);
      payload.append("country", formData.country);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const res = await api.post("/listings", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/listings/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-3">Create New Listing</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required

          />
        </div>

       
         <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}
