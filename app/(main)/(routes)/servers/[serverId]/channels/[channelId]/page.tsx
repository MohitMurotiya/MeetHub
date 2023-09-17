import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ChatHeader } from "@/components/chat/chat-header";
import { db } from "@/lib/db";
import { ChatInput } from "@/components/chat/chat-input";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {

    const profile = await currentProfile();
    if (!profile) return redirectToSignIn();

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    });

    /* If someone tires to access the channel which he is not a part of will redirect to home page */
    if (!channel || !member) {
        redirect("/");
    }
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            <div className="flex-1">Channel Messages</div>
            <ChatInput
                name={channel.name}
                apiUrl="/api/socket/messages"
                queryString={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
                type="channel"
            />
        </div>
    )
}

export default ChannelIdPage;