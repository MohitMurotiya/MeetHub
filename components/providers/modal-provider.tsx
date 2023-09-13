"use client"

import { useEffect, useState } from "react"

import { InviteModal } from "@/components/modals/invite-modal"
import { MembersModal } from "@/components/modals/members-modal"
import { CreateServerModal } from "@/components/modals/create-server-modal"
import { CreateChannelModal } from "@/components/modals/create-channel-modal"
import { ServerSettingsModal } from "@/components/modals/server-settings-modal"
import { DeleteServerModal } from "@/components/modals/delete-server-modal"
import { LeaveServerModal } from "@/components/modals/leave-server-modal"
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal"

export const ModalProvider = () => {

    const [firstRender, setFirstRender] = useState(false)

    useEffect(() => {
        setFirstRender(true)
    }, [])

    if(!firstRender) return null;

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <ServerSettingsModal />
            <MembersModal />
            <CreateChannelModal />
            <DeleteServerModal />
            <LeaveServerModal />
            <DeleteChannelModal />
        </>
    )
}