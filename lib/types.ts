import { Member, Message, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};

// For response from fetch Message API
export type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

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