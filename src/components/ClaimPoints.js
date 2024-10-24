import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("https://backend-leader-board-app.vercel.app"); // Adjust as per your backend URL

function ClaimPoints() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "https://backend-leader-board-app.vercel.app/users/users"
      );
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleClaim = async () => {
    if (!selectedUser) return;
    const res = await axios.post(
      "https://backend-leader-board-app.vercel.app/claim/claim",
      {
        userId: selectedUser,
      }
    );
    socket.emit("claim-points", res.data.user); // Emit event for real-time update
  };

  return (
    <div>
      <h2>Claim Points</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)}>
        <option>Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleClaim}>Claim Points</button>
    </div>
  );
}

export default ClaimPoints;
