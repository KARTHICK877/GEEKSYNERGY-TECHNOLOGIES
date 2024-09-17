import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUser } from '../api';
import { toast } from 'react-toastify';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', phoneNo: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to fetch users');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, phoneNo: user.phoneNo });
  };

  const handleUpdate = async (id) => {
    try {
      await updateUser(id, formData);
      toast.success('User updated successfully');
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update user');
    }
  };

  const handleDelete = async (id) => {
  try {
    await deleteUser(id);  // Delete user by ID
    toast.success('User deleted successfully');
    fetchUsers();  // Refresh the user list
  } catch (err) {
    toast.error('Failed to delete user');
  }
};

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{editUser && editUser._id === user._id ? <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /> : user.name}</td>
              <td>{user.email}</td>
              <td>{editUser && editUser._id === user._id ? <input value={formData.phoneNo} onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })} /> : user.phoneNo}</td>
              <td>{user.profession}</td>
              <td>
                {editUser && editUser._id === user._id ? (
                  <>
                    <button onClick={() => handleUpdate(user._id)} className="btn btn-success">Save</button>
                    <button onClick={() => setEditUser(null)} className="btn btn-secondary">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="btn btn-warning">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
