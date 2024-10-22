import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./App.css";
import UserSelect from "./components/UserSelect";
import Leaderboard from "./components/Leaderboard";
import AddUser from "./components/AddUser";

const socket = io.connect("https://backend-leader-board-app.vercel.app");


const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // Fetch users from the backend
  const fetchUsers = async () => {
    const { data } = await axios.get(
      "https://backend-leader-board-app.vercel.app/users/users"
    );
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers(); // Initial fetch
  }, []);

  // Listen for real-time leaderboard updates via Socket.io
  useEffect(() => {
    socket.on("leaderboard-updated", (updatedUser) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id
            ? { ...user, points: updatedUser.points }
            : user
        )
      );
    });
  }, []);

  return (
    <div className="app-container">
      <h1>Leaderboard App</h1>
      <UserSelect
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        refreshUsers={fetchUsers}
      />
      <AddUser refreshUsers={fetchUsers} />
      <Leaderboard users={users} />
    </div>
  );
};

export default App;
