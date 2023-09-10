import { SERVER_ERROR, UNAUTHORIZED } from "@/lib/constants";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();
        if(!profile) return new NextResponse(UNAUTHORIZED, {status: 401});
        if(!params.serverId) return new NextResponse("Server Id Missing", { status: 404});
        
        const { name, imageUrl } = await req.json();
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        });
        return NextResponse.json(server);
        
    } catch (error) {
        console.log("[SERVER_ID_PATCH]", error);
        return new NextResponse(SERVER_ERROR, {status: 500})
    }
}