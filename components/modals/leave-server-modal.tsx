"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LEAVE_SERVER_MODAL } from "@/lib/constants";
import { useModal } from "@/hooks/use-modal-store";

export const LeaveServerModal = () => {

    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === LEAVE_SERVER_MODAL;

    const { server } = data;
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/servers/${server?.id}/leave`);
            onClose();
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Leave {server?.name}
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                    Are you sure you want to leave <span className="font-semibold text-indigo-500">{server?.name}</span>?
                    You won't be able to rejoin this server unless you are re-invited. 
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} variant="ghost" onClick={onClose} >
                            Cancel
                        </Button>
                        <Button disabled={isLoading} variant="primary" onClick={onClick}>
                            Leave Server
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}