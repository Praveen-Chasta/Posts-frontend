import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

const Base_Url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";



function CreatePost() {
  const [createPost, setCreatePost] = useState({
    title: "",
    description: "",
    image: null, // Start as null since there will be no file initially
  });

  // Error state for fields (title, description, image)
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      title: "",
      description: "",
      image: "",
    });

    const { title, description, image } = createPost;

    // Validation
    let valid = true;

    if (!title) {
      setErrors((prevErrors) => ({ ...prevErrors, title: "Title is required" }));
      valid = false;
    }

    if (!description) {
      setErrors((prevErrors) => ({ ...prevErrors, description: "Description is required" }));
      valid = false;
    }

    if (!image) {
      setErrors((prevErrors) => ({ ...prevErrors, image: "Image is required" }));
      valid = false;
    }

    if (!valid) {
      toast.error("Please fill out all fields"); // General error toast
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image); // Attach the image file

    try {
      const response = await axios.post(`${Base_Url}/create-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure the header is set correctly for file uploads
        },
      });
      window.location.reload();
      console.log(response.data); // Log the server response
      toast.success("Post Created Successfully!"); // Show success toast
    } catch (error) {
      console.log("Error:", error.message); // Log any errors that occur during the request
      toast.error("Error while creating the post!"); // Show error toast
    }
  };

  return (
    <>
      <form onSubmit={handleCreatePost} className="form-container">
        {/* Title Field */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-dark fw-bold font-monospace">
            Title
          </label>
          <input
            type="text"
            className={`form-control w-100 ${errors.title ? "is-invalid" : ""}`} // Add error class if title error exists
            id="title"
            onChange={(e) => setCreatePost({ ...createPost, title: e.target.value })}
          />
          {errors.title && <div className="text-danger">{errors.title}</div>} {/* Show title error */}
        </div>

        {/* Description Field */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label fw-bold font-monospace">
            Description
          </label>
          <textarea
            className={`form-control w-100 ${errors.description ? "is-invalid" : ""}`} // Add error class if description error exists
            id="content"
            rows="3"
            onChange={(e) => setCreatePost({ ...createPost, description: e.target.value })}
          ></textarea>
          {errors.description && <div className="text-danger">{errors.description}</div>} {/* Show description error */}
        </div>

        {/* Image Field */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label fw-bold font-monospace">
            Upload Image
          </label>
          <input
            type="file"
            className={`form-control w-100 ${errors.image ? "is-invalid" : ""}`} // Add error class if image error exists
            id="image"
            accept="image/*"
            onChange={(e) => setCreatePost({ ...createPost, image: e.target.files[0] })}
          />
          {errors.image && <div className="text-danger">{errors.image}</div>} {/* Show image error */}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <Toaster /> {/* This is where the toast notifications will appear */}
    </>
  );
}

export default CreatePost;
