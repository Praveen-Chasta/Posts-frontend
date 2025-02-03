import { useEffect, useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import '../App.css';

function GetPosts() {
  const [getPosts, setGetPosts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);


  // Fetch Posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/get-posts");
        setGetPosts(response.data);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    fetchData();
  }, []);

  // Open Update Modal
  const handleUpdateModal = (post) => {
    setSelectedPost(post);
    setTitle(post.title);
    setDescription(post.description);
    setUpdateModalOpen(true);
  };

  // Open Delete Modal
  const handleDeleteModal = (post) => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  };

  // Handle Post Update
  const handleUpdate = async () => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        // If an image is selected, append it to the form data
        if (image) {
            formData.append("image", image);
        }

        // Send the PUT request with FormData
        await axios.put(`http://localhost:4000/update-post/${selectedPost._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
            }
        });
        window.location.reload();
        setUpdateModalOpen(false);
        toast.success("Post Updated Successfully!", {
            duration: 2000,  // Time in milliseconds, set it to a higher value like 8 seconds
        });
        
        
    } catch (error) {
        console.log("Update Error:", error);
    }
};

  

  // Handle Post Deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/delete-post/${selectedPost._id}`);
      setDeleteModalOpen(false);
      setGetPosts(getPosts.filter((post) => post._id !== selectedPost._id));
      toast.success("Post Deleted Successfully!");
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div className="container-fluid mb-5">
      {getPosts.length === 0 ? (
        <div className="no-posts-message text-center">
            <h4>No posts yet! Create one.</h4>
        </div>
        ) : (
        getPosts.map((post) => (
            <div key={post._id} className="col-12 d-flex flex-column align-items-start">
            {/* Post Header */}
                <div className="post-header w-100 d-flex justify-content-between  align-items-center mb-4 mt-5">
                    {/* Logo Image */}
                    <div
                    className="logo-image"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        marginRight: "10px",
                        position: "relative",
                    }}
                    >
                    <img
                        src={`http://localhost:4000${post.image}`}
                        alt={post.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    </div>

                    {/* Post Title */}
                    <h5 className="post-title" style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    {post.title}
                    </h5>

                    {/* Dropdown */}
                    <div className="dropdown ms-auto position-relative">
                    <button
                        className="btn btn-link"
                        style={{ border: "none", color: "black" }}
                        onClick={() => setShowDropdown(showDropdown === post._id ? null : post._id)}
                    >
                        <PiDotsThreeOutlineFill size={20} />
                    </button>
                    {showDropdown === post._id && (
                        <ul
                        className="dropdown-menu show"
                        style={{
                            minWidth: "120px",
                            position: "absolute",
                            top: "100%",
                            right: "0",
                            zIndex: "1000",
                            display: "block",
                        }}
                        >
                        <li>
                            <button className="dropdown-item" onClick={() => handleUpdateModal(post)}>
                            Update
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => handleDeleteModal(post)}>
                            Delete
                            </button>
                        </li>
                        </ul>
                    )}
                    </div>
                </div>

                {/* Post Image */}
                <div className="img-container" style={{ maxWidth: "400px", height: "500px", overflow: "hidden" }}>
                    <img
                    src={`http://localhost:4000${post.image}`}
                    alt={post.title}
                    className="img-fluid"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <p className="mt-3 text-start" style={{ maxWidth: "400px" }}><strong>Title : </strong>{post.title}</p>
                <p className="" style={{ maxWidth: "400px" }}><strong>Description :</strong> {post.description}</p>
                <hr />
                <Toaster />
            </div>
        ))
        )}


      {/* Update Post Modal */}
      <Modal show={updateModalOpen} onHide={() => setUpdateModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUpdateModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModalOpen} onHide={() => setDeleteModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GetPosts;
