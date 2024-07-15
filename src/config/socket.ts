import { Server as SocketIOServer, Socket } from "socket.io";
import { pollData, updateCryptoCode } from "../components/crypto/service";

let pollingInterval: NodeJS.Timeout | null  = null;

export const initSocket = (io: SocketIOServer): void => {
  io.on("connection", (socket: Socket) => {

    socket.on("change-symbol", (newSymbol: string) => {
      updateCryptoCode(newSymbol);
      console.log(`Crypto code changed to: ${newSymbol}`);
    });
    

  socket.on("start-polling", () => {
    if (!pollingInterval) {
      pollingInterval = setInterval(pollData, 3500);
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
