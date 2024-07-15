import express, { Express } from "express";
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv"
import connectToDB from "./config/db";
import { initSocket } from "./config/socket"

dotenv.config();

const PORT = process.env.NODE_PORT ?? 8080;

const app: Express = express();

const server: HTTPServer = createServer(app);

export const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

initSocket(io);

server.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});


