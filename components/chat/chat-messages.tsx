"use client"

import { format } from "date-fns";
import { Member } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useRef, ElementRef } from "react";

import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import { ChatItem } from "./chat-item";
import { ChatWelcome } from "./chat-welcome";
import { DATE_FORMAT } from "@/lib/constants";
import { MessageWithMemberWithProfile } from "@/lib/types";

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

    //socket events
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:udpate`;

    //for chat-scroll
    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useChatQuery({
        queryKey: `chat:${chatId}`,
        apiUrl,
        paramKey,
        paramValue
    });

    useChatSocket({queryKey, addKey, updateKey});
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0
    })

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
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            { !hasNextPage && <div className="flex-1" />}
            { !hasNextPage && (
                <ChatWelcome
                    type={type}
                    name={name}
                />
            )}
            { hasNextPage && (
                <div className="flex justify-center">
                    { isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                    ) : (
                        <button
                            onClick={() => fetchNextPage()}
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 text-xs my-4 transition"
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
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
            <div ref={bottomRef} />
        </div>
    )
}