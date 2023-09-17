/**
 * reference: https://clerk.com/docs/references/nextjs/get-auth
 */

import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";
import { db } from "@/lib/db";

export const currentProfileForPages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req);
    if(!userId) return null;

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });
    return profile;
}