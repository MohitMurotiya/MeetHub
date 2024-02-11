"use client"

import { Fragment } from "react";
import { format } from "date-fns";
import { Member } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";

import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatQuery } from "@/hooks/use-chat-query";
import { ChatWelcome } from "./chat-welcome";
import { MessageWithMemberWithProfile } from "@/lib/types";
import { DATE_FORMAT } from "@/lib/constants";
import { ChatItem } from "./chat-item";

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

export const ChatMessages = ({
    type,
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
}: ChatMessagesProps) => {

    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:udpate`;

    const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useChatQuery({
        queryKey: `chat:${chatId}`,
        apiUrl,
        paramKey,
        paramValue
    });

    if(status === "loading"){
        return (
            <div className="flex flex-col items-center justify-center flex-1">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-s text-zinc-500 dark:text-zinc-400">Loading Messages...</p>
            </div>
        )
    }

    if(status === "error"){
        return (
            <div className="flex flex-col items-center justify-center flex-1">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4"/>
                <p className="text-s text-zinc-500 dark:text-zinc-400">Something went wrong!</p>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <ChatWelcome
                type={type}
                name={name}
            />
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message : MessageWithMemberWithProfile) => (
                            <ChatItem
                                key={message.id}
                                message={message}
                                member={message.member}
                                currentMember={member}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}