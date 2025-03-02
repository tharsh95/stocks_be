import express, { Express } from "express";
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv"
import connectToDB from "./config/db";
import { initSocket } from "./config/socket"
import cors from "cors";

dotenv.config();

const PORT = process.env.NODE_PORT ?? 8080;
const app: Express = express();
app.use(cors());

const server: HTTPServer = createServer(app);

export const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

initSocket(io);

server.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});

