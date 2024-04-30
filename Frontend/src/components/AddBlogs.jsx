import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/AddBlog.css';

function AddBlogForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        author: ''
    });

    const navigate=useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to create blog post');
            }
            alert('Blog added successfully!');
            setFormData({ title: '', description: '', image: '', author: '' }); 

            navigate('/')
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding blog');
        }
    };

    return (
        <div className="addBlogContainer">
            <form onSubmit={handleSubmit} className="form">
                <h2>Add New Blog</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submitBtn">Add Blog</button>
            </form>
        </div>
    );
}

export default AddBlogForm;
