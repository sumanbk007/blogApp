import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/SignupForm.css';

function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate(); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Handle success
                console.log('Signup success:', data);
                alert("Signup successful: " + data.message);
                navigate('/Login'); 
            } else {
                // Handle other statuses
                console.error('Signup error:', data);
                alert(data.error); 
            }
        } catch (error) {
            console.error('Signup error:', error); 
            alert('Signup failed: ' + error.message); 
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="submit-btn">Sign Up</button>
        </form>
    );
}

export default SignupForm;
