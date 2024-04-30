import React, { useState } from 'react';
import '../assets/css/EditBlogForm.css';

function EditBlogForm({ blog, onSave, onCancel }) {
  const [formData, setFormData] = useState(blog);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          className="input"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="input textarea"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          className="input"
          value={formData.image}
          onChange={handleChange}
        />
        <div>
          <button type="submit" className="button">Save Changes</button>
          <button type="button" onClick={onCancel} className="button cancelButton">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditBlogForm;
