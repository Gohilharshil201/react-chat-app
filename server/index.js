const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", ({ username, room }) => {
    socket.join(room);
    socket.to(room).emit("user-joined", username);
  });

  socket.on("chat-message", ({ room, message }) => {
    socket.to(room).emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    // Optionally: handle disconnect notifications
  });
});

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
