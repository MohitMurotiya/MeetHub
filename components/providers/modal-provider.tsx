"use client"

import { CreateServerModal } from "@/components/modals/create-server-modal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {

    const [firstRender, setFirstRender] = useState(false)

    useEffect(() => {
        setFirstRender(true)
    }, [])

    if(!firstRender) return null;

    return (
        <>
            <CreateServerModal />
        </>
    )
}