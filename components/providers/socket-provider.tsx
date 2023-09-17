"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
}

// Create a context to hold the socket instance and the status of the connection
const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
});

// Custom hook to access the SocketContextType from the context
export const useSocket = () => {
    return useContext(SocketContext);
};

// SocketProvider component to manage the SocketContextType and provide it through context
export const SocketProvider = ({
    children
}: { children: React.ReactNode }) => {

    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // set-up the socket connection when the component mounts
    useEffect(() => {
        const socketIntance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });

        socketIntance.on("connect", () => {
            setIsConnected(true);
        });

        socketIntance.on("disconnect", () => {
            setIsConnected(false);
        });

        setSocket(socketIntance);

        return () => {
            socketIntance.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
} 