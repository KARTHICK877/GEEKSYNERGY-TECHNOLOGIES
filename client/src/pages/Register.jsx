import React, { useState } from 'react';
import { registerUser } from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    profession: ''
  });

  const { name, email, password, phoneNo, profession } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);

      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error('Error during registration.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="text" name="phoneNo" value={phoneNo} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Profession</label>
          <input type="text" name="profession" value={profession} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
