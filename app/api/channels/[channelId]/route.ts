import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { SERVER_ERROR, UNAUTHORIZED } from "@/lib/constants";

export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId');
        if (!profile) return new NextResponse(UNAUTHORIZED, { status: 401 });
        if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });
        if (!params.channelId) return new NextResponse("Channel ID Missing", { status: 400 });

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general"
                        }
                    }
                }
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error);
        return new NextResponse(SERVER_ERROR, { status: 500 });
    }
}