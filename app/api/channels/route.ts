import { SERVER_ERROR, UNAUTHORIZED } from "@/lib/constants";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");
        if(!profile) return new NextResponse(UNAUTHORIZED, {status: 401});
        if(!serverId) return new NextResponse("Server ID Missing", {status: 400 });

        /* only a member can create a channel whose role must be admin or moderator */
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
                    create: {
                        name,
                        type,
                        profileId: profile.id
                    }
                }
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_POST]", error);
        return new NextResponse(SERVER_ERROR, { status: 500 })
        
    }
}