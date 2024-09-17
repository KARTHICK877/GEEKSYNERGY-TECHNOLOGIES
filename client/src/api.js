import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; 

export const registerUser = (data) => axios.post(`${API_URL}/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
export const getAllUsers = () => axios.get(API_URL);
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
