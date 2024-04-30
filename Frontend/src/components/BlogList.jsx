import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import EditBlogForm from './EditBlogForm';
import { useSelector } from 'react-redux';


function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('http://localhost:3001/blog');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    }

    fetchBlogs();
  }, []);

  // Function to handle deletion of a blog
  const handleDelete = async (id) => {
   
    if (!isLoggedIn) {
      alert("Please log in first.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/blog/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
        alert("Blog deleted successfully!");
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Error deleting blog');
    }
  };

  // Handle edit operation
   const handleEdit = (id) => {
    if (!isLoggedIn) {
      alert("Please log in first.");
      return;
    }
    const blog = blogs.find(blog => blog._id === id);
    setEditingBlog(blog);
  };

  // Handle update operation
  const handleUpdate = async (blogData) => {
    try {
      const response = await fetch(`http://localhost:3001/blog/${blogData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(blogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
        setEditingBlog(null);
        alert("Blog updated successfully!");
      } else {
        throw new Error('Failed to update blog');
      }
    } catch (error) {
      console.error('Failed to update blog:', error);
      alert('Error updating blog');
    }
  };


  const handleCancel = () => {
    setEditingBlog(null); 
  };


  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', marginBlock:'3rem'}}>
     {editingBlog ? (
        <EditBlogForm
          blog={editingBlog}
          onSave={handleUpdate}
          onCancel={handleCancel}
        />
      ) : (
        blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} onEdit={handleEdit} />
        ))
      )}
    </div>
  );
}

export default BlogList;
