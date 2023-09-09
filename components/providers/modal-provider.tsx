"use client"

import { CreateServerModal } from "@/components/modals/create-server-modal"
import { useEffect, useState } from "react"
import { InviteModal } from "@/components/modals/invite-modal"

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
        </>
    )
}