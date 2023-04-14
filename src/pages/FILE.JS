import React, { useState, useEffect } from "react";
import axios from "axios";

const Crud = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const getUsers = async () => {
    const response = await axios.get(
      "https://crudcrud.com/api/4d9c9702d67f4c028f1140e34c5d9207/appointmentData"
    );
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://crudcrud.com/api/4d9c9702d67f4c028f1140e34c5d9207/appointmentData/${userId}`
      );
      removeUserFromScreen(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserFromScreen = (userId) => {
    const filteredUsers = users.filter((user) => user._id !== userId);
    setUsers(filteredUsers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/4d9c9702d67f4c028f1140e34c5d9207/appointmentData",
        {
          name,
          email,
        }
      );
      setUsers([...users, response.data]);
      setName("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Crud;