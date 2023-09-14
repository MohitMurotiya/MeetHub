import { Hash } from "lucide-react";

import { MobileSidebar } from "@/components/mobile-sidebar";

interface ChatHeaderProps {
    name: string;
    serverId: string;
    imageUrl?: string;
    type: "channel" | "coversation"
}

/** We can use this component for 1:1 conversation and for channel conversation as well */
export const ChatHeader = ({
    name,
    type,
    serverId,
    imageUrl,
}: ChatHeaderProps) => {
    return (

        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileSidebar serverId={serverId} />
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}
            <p className="font-semibold text-md text-black dark:text-white">
                {name}
            </p>
        </div>
    )
}