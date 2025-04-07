"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const socket_1 = require("./config/socket");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = (_a = process.env.NODE_PORT) !== null && _a !== void 0 ? _a : 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, socket_1.initSocket)(exports.io);
server.listen(PORT, () => {
    (0, db_1.default)();
    console.log(`Server running on port ${PORT}`);
});
