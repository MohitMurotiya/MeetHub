import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";

interface MemberIdPageProps {
    params: {
        memberId: string;
        serverId: string;
    }
}

const MemberIdPage = async ({
    params
}: MemberIdPageProps) => {

    const profile = await currentProfile();
    if (!profile) return redirectToSignIn();

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        },
    });

    if (!currentMember) redirect("/");

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);
    if(!conversation) return redirect(`/servers/${params.serverId}`);

    const { memberOne, memberTwo } = conversation;
    // To find out the conversations from otherMember
    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                imageUrl={otherMember.profile.imageUrl}
                name={otherMember.profile.name}
                serverId={params.serverId}
                type="conversation"
            />
            <ChatMessages
                type="conversation"
                name={otherMember.profile.name}
                member={currentMember}
                chatId={conversation.id}
                apiUrl="/api/direct-messages"
                socketUrl="/api/socket/direct-messages"
                socketQuery={{
                    conversationId: conversation.id
                }}
                paramKey="conversationId"
                paramValue={conversation.id}
            />
            <ChatInput
                type="conversation"
                name={otherMember.profile.name}
                apiUrl="/api/socket/direct-messages"
                queryString={{
                    conversationId: conversation.id
                }}
            />
        </div>
    )
}

export default MemberIdPage;