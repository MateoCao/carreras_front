// Crea un archivo separado socket.ts
import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const getSocket = () => {
    if (!socketInstance) {
        socketInstance = io("http://localhost:5000", {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 5000,
            autoConnect: true,
            forceNew: true,
            withCredentials: false,
        });
    }
    return socketInstance;
};