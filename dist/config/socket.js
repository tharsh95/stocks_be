"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const service_1 = require("../components/crypto/service");
let pollingInterval = null;
const initSocket = (io) => {
    io.on("connection", (socket) => {
        socket.on("change-symbol", (newSymbol) => {
            (0, service_1.updateCryptoCode)(newSymbol);
            console.log(`Crypto code changed to: ${newSymbol}`);
        });
        socket.on("start-polling", () => {
            if (!pollingInterval) {
                pollingInterval = setInterval(service_1.pollData, 3500);
                console.log("Polling started");
            }
        });
        socket.on("stop-polling", () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
                pollingInterval = null;
                console.log("Polling stopped");
            }
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
exports.initSocket = initSocket;
