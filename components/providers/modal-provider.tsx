"use client"

import { useEffect, useState } from "react"
import { InviteModal } from "@/components/modals/invite-modal"
import { ServerSettingsModal } from "../modals/server-settings-modal"
import { CreateServerModal } from "@/components/modals/create-server-modal"

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
        </>
    )
}