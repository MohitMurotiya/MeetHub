import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};

/**custom response type for socket */
import { NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};