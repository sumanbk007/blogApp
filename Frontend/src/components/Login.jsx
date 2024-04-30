import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../assets/css/LoginForm.css';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/authSlice';


function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
     const navigate = useNavigate();
      const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
      event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Handle login success
                console.log('Login successful:', data);
                
                 // Storing the token in local storage
                localStorage.setItem('token', data.token);

               
                dispatch(logIn())
                navigate('/'); 
            } else {
                // Handle errors
                console.error('Login error:', data);
                alert(data.error || 'Failed to log in');
            }
        } catch (error) {
            console.error('Login exception:', error);
            alert('Error logging in');
        }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="form-button">Login</button>

        <div className="signup-link">
          Haven't registered yet? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
