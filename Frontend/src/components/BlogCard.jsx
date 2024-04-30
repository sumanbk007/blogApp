// BlogCard.js
import React from 'react';
import '../assets/css/BlogCard.css';

function BlogCard({ blog, onDelete, onEdit }) {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <h3>{blog.title}</h3>
        <p className="blog-description">{blog.description}</p>
        <p className="blog-date">{new Date(blog.date).toLocaleDateString()}</p>
        <p className="blog-author">{blog.author}</p>
        <div className="card-actions">
          <button onClick={() => onEdit(blog._id)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(blog._id)} className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
