import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";

const ChatRoom = ({ username, room }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat-${room}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    socket.emit("join-room", { username, room });

    socket.on("user-joined", (user) => {
      const time = new Date().toLocaleTimeString();
      const message = {
        system: true,
        text: `${user} has joined the room`,
        time,
      };
      setMessages((prev) => {
        const updated = [...prev, message];
        localStorage.setItem(`chat-${room}`, JSON.stringify(updated));
        return updated;
      });
    });

    socket.on("chat-message", (message) => {
      message.time = new Date().toLocaleTimeString();
      setMessages((prev) => {
        const updated = [...prev, message];
        localStorage.setItem(`chat-${room}`, JSON.stringify(updated));
        return updated;
      });
    });

    return () => {
      socket.off("user-joined");
      socket.off("chat-message");
    };
  }, [room, username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = {
      sender: username,
      text: input,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("chat-message", { room, message });

    setMessages((prev) => {
      const updated = [...prev, message];
      localStorage.setItem(`chat-${room}`, JSON.stringify(updated));
      return updated;
    });

    setInput("");
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-4xl h-[90vh] bg-gray-800/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Room: {room} Username: {username}
        </h2>

        <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
          {messages.map((msg, i) =>
            msg.system ? (
              <div
                key={i}
                className="text-center text-sm text-white bg-gray-700 px-4 py-1 rounded inline-block mx-auto"
              >
                {msg.text}{" "}
                <span className="ml-2 text-xs text-gray-300">{msg.time}</span>
              </div>
            ) : (
              <div
                key={i}
                className={`flex ${
                  msg.sender === username ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-xl p-3 max-w-[75%] ${
                    msg.sender === username ? "bg-blue-600" : "bg-gray-700"
                  } text-white`}
                >
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span>{msg.sender}</span>
                    <span className="ml-2 font-normal text-gray-300">
                      {msg.time}
                    </span>
                  </div>
                  <div>{msg.text}</div>
                </div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>

        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 p-3 flex-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 ml-2 rounded-xl transition-all duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
