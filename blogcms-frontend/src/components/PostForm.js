
import React, { useState, useEffect } from "react";
import axios from "axios";

function PostForm({ addPost, editingPost, updateExistingPost }) {
    const [post, setPost] = useState({
        title: "",
        content: "",
        author: "",
    });

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    // Load categories
    useEffect(() => {
        axios.get("http://localhost:8080/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    // Load editing post
    useEffect(() => {
        if (editingPost) {
            setPost(editingPost);
            setCategoryId(editingPost.category?.id || "");
        }
    }, [editingPost]);

    // Handle input change
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            ...post,
            category: { id: categoryId }
        };

        if (editingPost) {
            updateExistingPost(editingPost.id, newPost);
        } else {
            addPost(newPost);
        }

        // Reset form
        setPost({ title: "", content: "", author: "" });
        setCategoryId("");
    };

    return (
        <div className="card p-4 mb-4 shadow">
            <h3>{editingPost ? "Edit Post" : "Create New Post"}</h3>

            <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Enter Title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Content */}
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="content"
                        placeholder="Enter Content"
                        rows="4"
                        value={post.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Author */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="author"
                        placeholder="Enter Author"
                        value={post.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Category Dropdown */}
                <div className="mb-3">
                    <select
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Button */}
                <button className="btn btn-primary">
                    {editingPost ? "Update Post" : "Add Post"}
                </button>

            </form>
        </div>
    );
}

export default PostForm;
