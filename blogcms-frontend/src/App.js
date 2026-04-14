
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

import { getPosts, createPost, updatePost, deletePost } from "./services/api";

function App() {

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [search, setSearch] = useState("");

  // FETCH POSTS (WITH SEARCH)
  const fetchPosts = async () => {
    try {
      if (search === "") {
        const res = await getPosts(); // using service
        setPosts(res.data);
      } else {
        const res = await axios.get(
          `http://localhost:8080/posts/search?keyword=${search}`
        );
setPosts(res.data);
      }
    } catch (error) {
  console.log(error);
}
  };

useEffect(() => {
  fetchPosts();
}, [search]);

// ADD POST
const addPost = async (post) => {
  await createPost(post);
  fetchPosts();
};

// UPDATE POST
const updateExistingPost = async (id, post) => {
  await updatePost(id, post);
  setEditingPost(null);
  fetchPosts();
};

// DELETE POST
const handleDelete = async (id) => {
  await deletePost(id);
  fetchPosts();
};

// EDIT POST
const handleEdit = (post) => {
  setEditingPost(post);
};

return (
  <>
    <Navbar />

    <div className="container mt-4">

      {/* FORM */}
      <PostForm
        addPost={addPost}
        editingPost={editingPost}
        updateExistingPost={updateExistingPost}
      />

      {/* SEARCH BOX */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* POST LIST */}
      <PostList
        posts={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  </>
);
}

export default App;

