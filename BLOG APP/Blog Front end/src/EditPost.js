import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const categories = [
  "Technology",
  "Travel",
  "Food",
  "Fashion",
  "Health",
  "Sports",
];

const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    category: "",
    content: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5500/blogs/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setFormData({
          title: data.title,
          imageUrl: data.imageUrl,
          category: data.category,
          content: data.content,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log any errors
        setErrorMessage("Error fetching data");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5500/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Blog post updated successfully");
        // Redirect to blog post page after a short delay
        setTimeout(() => {
          navigate(`/blog/post/${id}`);
        }, 1500);
      } else {
        setErrorMessage("Failed to update blog post");
        console.error("Failed to update blog post");
      }
    } catch (error) {
      setErrorMessage("Network error");
      console.error("Network error", error);
    }
  };

  return (
    <div className="m-5">
      <h3>Edit Blog Post</h3>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        {/* Image URL */}
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* Content */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {/* Submit Button */}
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {/* Success and Error Messages */}
      {successMessage && (
        <div
          className="alert alert-success d-flex align-items-center my-2"
          role="alert"
        >
          <div>{successMessage}</div>
        </div>
      )}
      {errorMessage && (
        <div
          className="alert alert-danger d-flex align-items-center my-2"
          role="alert"
        >
          <div>{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
