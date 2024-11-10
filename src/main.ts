import { Server } from "socket.io";
import cors from "cors";
import http from "node:http";
import express from "express";
const app = express();
app.use(cors()); // Corrected to call the cors function
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  io.emit("connection", "Hello World");
  res.send("Hello World");
});

// Ideas for live features
// what can we build with socket io
// chat app
// live comment section
// live feed
// live location sharing
// live video streaming
// live audio streaming
// live code editor
// live drawing board
// live quiz app
// live voting app
// live whiteboard
// live document editor
// live collaborative tools
// live multiplayer games
// live notifications
// live status update
// live social media feed
// live stock market
// live weather updates
// live cryptocurrency updates
// live sports updates
// live event updates
// live news updates

// lets consider live comment section
// 1. user can post a comment
// 2. user can see all comments
// 3. user can see comments in real time
// 4. user can see comments from other users in real time
// 5. user can see comments from other users in real time without refreshing the page

// add comment

app.post("/comment", async (req: Request, res: Response) => {
  const { comment } = req.body;
  // probably save the comment to a database

  io.emit("comment_added", comment);
  res.send("Comment added successfully");
});

// get all comments
app.get("/comments", async (req: Request, res: Response) => {
  // get all comments from the database
  res.send("All comments");
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
