import { SERVER_ERROR, UNAUTHORIZED } from "@/lib/constants";
import { currentProfileForPages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/lib/types";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const profile = await currentProfileForPages(req);
        const { serverId, channelId } = req.query;
        const { content } = req.body;

        if (!profile) return res.status(401).json({ error: UNAUTHORIZED });
        if (!serverId)  return res.status(400).json({ error: "Server ID missing" });
        if (!channelId) return res.status(400).json({ error: "Channel ID missing" });
        if (!content) return res.status(400).json({ error: "Content missing" });

        // confirm if member who's sending a message is a part of that server
        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            include: {
                members: true
            }
        });
        if (!server) return res.status(404).json({ message: "Server not found" });

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string,
            }
        });
        if (!channel) return res.status(404).json({ message: "Channel not found" });

        const member = server.members.find((member) => member.profileId === profile.id);
        if (!member) return res.status(404).json({ message: "Member not found" });

        const message = await db.message.create({
            data: {
                content,
                channelId: channelId as string,
                memberId: member.id
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    }
                }
            }
        });

        // sending event and message to all connected clients in a WebSocket
        const channelKey = `chat:${channelId}:messages`;
        res?.socket?.server?.io.emit(channelKey, message);

        return res.status(200).json(message);
    } catch (error) {
        console.log("[MESSAGE_POST]", error);
        return res.status(500).json({ error: SERVER_ERROR });
    }
}