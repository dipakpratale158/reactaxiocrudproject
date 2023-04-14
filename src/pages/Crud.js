import { useState, useEffect } from "react";
import axios from "axios";

function Curd() {
  const [emailid, setEmailid] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [users, setUsers] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://crudcrud.com/api/507967515e8e496e9cb66ef4d483915d/appointmentData"
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const obj = {
      emailid,
      name,
      phonenumber
    };

    if (editItem === null) {
      axios
        .post(
          "https://crudcrud.com/api/507967515e8e496e9cb66ef4d483915d/appointmentData",
          obj
        )
        .then((response) => {
          setUsers([...users, response.data]);
          setEmailid("");
          setName("");
          setPhoneNumber("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(
          `https://crudcrud.com/api/507967515e8e496e9cb66ef4d483915d/appointmentData/${editItem}`,
          obj
        )
        .then(() => {
          obj._id = editItem;
          const updatedUsers = users.map((user) =>
            user._id === editItem ? obj : user
          );
          setUsers(updatedUsers);
          setEmailid("");
          setName("");
          setPhoneNumber("");
          setEditItem(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (userId) => {
    axios
      .delete(
        `https://crudcrud.com/api/507967515e8e496e9cb66ef4d483915d/appointmentData/${userId}`
      )
      .then(() => {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (emailid, name, phonenumber, userId) => {
    setEditItem(userId);
    setEmailid(emailid);
    setName(name);
    setPhoneNumber(phonenumber);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">email:</label>
        <input
          id="emailid"
          type="text"
          name="emailid"
          value={emailid}
          required
          onChange={(e) => setEmailid(e.target.value)}
        />
        <br />
        <label htmlFor="name">userName:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="name">PhoneNumber:</label>
        <input
          id="phonenumber"
          type="text"
          name="phonenumber"
          value={phonenumber}
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.emailid}-{user.name}-{user.phonenumber}
            <button onClick={() => handleDelete(user._id)}>delete</button>
            <button
              onClick={() =>
                handleEdit(user.emailid, user.name, user.phonenumber, user._id)
              }
            >
              edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Curd;
