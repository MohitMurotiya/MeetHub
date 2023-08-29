import { create } from "zustand";

import { CREATE_SERVER_MODAL } from "@/lib/constants";

export type ModalType = typeof CREATE_SERVER_MODAL;

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({ isOpen: true, type}),
    onClose: () => set({ isOpen: false, type: null}),
}));