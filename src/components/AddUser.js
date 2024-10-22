import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ refreshUsers }) => {
  const [newUserName, setNewUserName] = useState("");

  const addNewUser = async () => {
    if (newUserName) {
      await axios.post(
        "https://backend-leader-board-app.vercel.app/users/add",
        {
          name: newUserName,
        }
      );
      setNewUserName("");
      refreshUsers(); 
      // Refresh the user list after adding a new user
    }
  };

  return (
    <div className="add-user-section">
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Enter new user name"
        className="user-input"
      />
      <button onClick={addNewUser} className="add-button">
        Add User
      </button>
    </div>
  );
};

export default AddUser;
