
import React, { useState } from "react";
import axios from "axios";

function PostList({ posts, setPosts, onEdit, onDelete }) {

    const [keyword, setKeyword] = useState("");

    // Search function
    const searchPosts = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/posts/search?keyword=${keyword}`
            );
setPosts(res.data);
        } catch (error) {
    console.log(error);
}
    };

return (
    <div>

        <h3 className="mb-3">All Blog Posts</h3>

        {/* 🔍 Search Bar */}
        <div className="mb-3 d-flex">
            <input
                type="text"
                className="form-control me-2"
                placeholder="Search posts..."
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={searchPosts}>
                Search
            </button>
        </div>

        {posts.length === 0 ? (
            <p>No posts available.</p>
        ) : (
            posts.map((post) => (
                <div className="card mb-3 shadow" key={post.id}>
                    <div className="card-body">

                        <h4>{post.title}</h4>

                        <p>{post.content}</p>

                        <p>
                            <strong>Author:</strong> {post.author}
                        </p>

                        {/* ✅ Category Display */}
                        <p>
                            <strong>Category:</strong> {post.category?.name || "No Category"}
                        </p>

                        <button
                            className="btn btn-warning me-2"
                            onClick={() => onEdit(post)}
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => onDelete(post.id)}
                        >
                            Delete
                        </button>

                    </div>
                </div>
            ))
        )}
    </div>
);
}

export default PostList;

