import express from "express";
import { Response, Request } from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "node:http";

const app = express();
app.use(cors()); // Corrected to call the cors function
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    console.log(`data ${data?.message} by user: ${socket.id}`);
    socket.broadcast.emit("received_message", data);
  });
});

server.listen(3001, () => {
  // Corrected to use server.listen with numeric port
  console.log("Server running on port: 3001");
});
