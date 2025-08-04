import { useState } from "react";

const JoinRoom = ({ setUsername, setRoom, setJoined }) => {
  const [user, setUser] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && roomName) {
      setUsername(user);
      setRoom(roomName);
      setJoined(); // Marks session as joined
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg text-white p-10 rounded-3xl shadow-2xl space-y-6 border border-white/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Join a Room
          </h2>

          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter room name"
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
