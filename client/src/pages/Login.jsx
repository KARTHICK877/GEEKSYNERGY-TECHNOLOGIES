import React, { useState } from 'react';
import { loginUser } from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      toast.success('Login successful!');
      localStorage.setItem('token', res.data.token);  // Store token for authentication
      
      navigate('/home'); // Redirect to home page
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
