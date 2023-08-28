import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { db } from "@/lib/db";
import { UNAUTHORIZED } from "@/lib/constants";
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse(UNAUTHORIZED, { status: 401 });
        }

        const server = await db.server.create({
            data: {
                name,
                imageUrl,
                inviteCode: uuidv4(),
                profileId: profile.id,
                channels: {
                    create: [
                        { name: 'general', profileId: profile.id}
                    ]
                },
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.ADMIN }
                    ]
                }
            }
        })
        return NextResponse.json(server);
    } catch (err) {
        console.log("[SERVER_POST]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}