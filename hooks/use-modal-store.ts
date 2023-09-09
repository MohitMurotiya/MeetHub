import { Server } from "@prisma/client";
import { create } from "zustand";

import { CREATE_SERVER_MODAL, INVITE_MODAL } from "@/lib/constants";

export type ModalType = typeof CREATE_SERVER_MODAL | typeof INVITE_MODAL;

interface ModalData {
    server?: Server;
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