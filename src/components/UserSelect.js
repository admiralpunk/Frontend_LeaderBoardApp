import React from "react";
import axios from "axios";

const UserSelect = ({ users, selectedUser, setSelectedUser, refreshUsers }) => {
  const claimPoints = async () => {
    if (selectedUser) {
      const { data } = await axios.post("http://localhost:5000/claim/claim", {
        userId: selectedUser,
      });
      refreshUsers(); // Fetch the latest user data after claiming points
    }
  };

  return (
    <div className="claim-points-section">
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="user-select"
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={claimPoints} className="claim-button">
        Claim Points
      </button>
    </div>
  );
};

export default UserSelect;
