import React from "react";

const Leaderboard = ({ users }) => (
  <div className="leaderboard-section">
    <h2>Leaderboard</h2>
    <ul className="leaderboard">
      {users
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((user, index) => (
          <li key={user._id} className="leaderboard-item">
            <span className="rank">#{index + 1}</span>
            <span className="username">{user.name}</span>
            <span className="totalPoints">{user.totalPoints} pts</span>
          </li>
        ))}
    </ul>
  </div>
);

export default Leaderboard;
