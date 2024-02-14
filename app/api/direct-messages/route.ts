import { SERVER_ERROR, UNAUTHORIZED } from "@/lib/constants";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import { DirectMessage } from "@prisma/client"
import { db } from "@/lib/db";

const MESSAGES_BATCH = 10;

/**
 * cursor based pagination for infinite-scroll
 * reference: https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
 */
export async function GET(
    req: Request,
) {
    try {
        const profile = await currentProfile();
        if(!profile) return new NextResponse(UNAUTHORIZED, { status: 401 });
        
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get('cursor');
        const conversationId = searchParams.get('conversationId');

        if(!conversationId) return new NextResponse("Conversation ID Missing", { status: 404 });
        
        let messages: DirectMessage[] = [];
        if(cursor){
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        } else {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        }

        let nextCursor = null;
        if(messages.length === MESSAGES_BATCH){
            nextCursor = messages[MESSAGES_BATCH - 1].id
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        });
    } catch (error) {
        console.log("[DIRECT_MESSAGES_GET]", error);
        return new NextResponse(SERVER_ERROR, { status: 500});
    }
}