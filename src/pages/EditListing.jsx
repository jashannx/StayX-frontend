import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: null
  });
  const [currentImage, setCurrentImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/listings/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price ?? "",
          location: data.location || "",
          country: data.country || "",
          image: null
        });
        setCurrentImage(data.image || "");
      })
      .catch(() => setError("Failed to load listing"))
      .finally(() => setIsLoading(false));
  }, [id]);

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

      await axios.put(`http://localhost:3001/listings/${id}`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/listings/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-3">Edit Listing</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
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
          <label className="form-label">Replace Image</label>
          {currentImage && (
            <div className="mb-2">
              <img
                src={currentImage.replace("/upload", "/upload/q_auto,f_auto,w_300")}
                alt="Current listing"
                style={{ maxWidth: "220px", borderRadius: "10px" }}
              />
            </div>
          )}
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
          <small className="text-muted">
            Leave this empty if you want to keep the current image.
          </small>
        </div>

        <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Listing"}
        </button>
      </form>
    </div>
  );
}
