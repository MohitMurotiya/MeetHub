"use client"

import { useEffect, useState } from "react"

import { InviteModal } from "@/components/modals/invite-modal"
import { MembersModal } from "@/components/modals/members-modal"
import { CreateServerModal } from "@/components/modals/create-server-modal"
import { ServerSettingsModal } from "@/components/modals/server-settings-modal"

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
        </>
    )
}