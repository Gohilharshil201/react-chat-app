import { useEffect, useState } from "react";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false); // Tracks whether user has joined during this session

  useEffect(() => {
    // Only preserve chat room on refresh (same session)
    const savedUsername = localStorage.getItem("username");
    const savedRoom = localStorage.getItem("room");
    const sessionJoined = sessionStorage.getItem("joined");

    if (savedUsername && savedRoom && sessionJoined) {
      setUsername(savedUsername);
      setRoom(savedRoom);
      setJoined(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      {joined ? (
        <ChatRoom username={username} room={room} />
      ) : (
        <JoinRoom
          setUsername={(u) => {
            setUsername(u);
            localStorage.setItem("username", u);
          }}
          setRoom={(r) => {
            setRoom(r);
            localStorage.setItem("room", r);
          }}
          setJoined={() =>
            sessionStorage.setItem("joined", "true") || setJoined(true)
          }
        />
      )}
    </div>
  );
}

export default App;
