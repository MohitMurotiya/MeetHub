// API to connect with socket.io

import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/lib/types";

export const config = {
    api: {
        bodyParser: false,
    },
};

/**
 * check res.socket.server.io, which does not exist by default and indicates that the socket connection is not in existence, 
 * inside the default exported function. If the io object on res.socket.server does not exist, 
 * we create a new socket connection by instantiating a Server and passing it to the res.socket.server as an input.
 * The resulting object is then put to res.socket.server.io so that when a new request comes in after the instantiation, 
 * res.socket.server.io is not undefined.
 * And, We just finish the request outside of the if statement to prevent it from becoming stalled.
 */

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        // adapt Next's net Server to http Server
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socket/io",
            // @ts-ignore
            addTrailingSlash: false,
        });
        res.socket.server.io = io;
    }

    res.end();
}

export default ioHandler;
