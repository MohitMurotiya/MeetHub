import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

import { 
    CHANNEL_SETTINGS_MODAL,
    CREATE_CHANNEL_MODAL, 
    CREATE_SERVER_MODAL, 
    DELETE_CHANNEL_MODAL, 
    DELETE_SERVER_MODAL, 
    INVITE_MODAL, 
    LEAVE_SERVER_MODAL, 
    MEMBERS_MODAL, 
    SERVER_SETTINGS_MODAL 
} from "@/lib/constants";

export type ModalType = typeof CREATE_SERVER_MODAL 
                        | typeof INVITE_MODAL 
                        | typeof SERVER_SETTINGS_MODAL 
                        | typeof MEMBERS_MODAL 
                        | typeof CREATE_CHANNEL_MODAL
                        | typeof DELETE_SERVER_MODAL
                        | typeof LEAVE_SERVER_MODAL
                        | typeof DELETE_CHANNEL_MODAL
                        | typeof CHANNEL_SETTINGS_MODAL;

interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null }),
}));