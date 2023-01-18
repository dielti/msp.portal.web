'use client'

import React, { useEffect, useState } from "react"
import Header from "./(Header)/Header"
import { LoadedContext, UserContext } from "./Contexts"

export default ({ children, auth }: { children: React.ReactNode, auth: boolean }) => {
    const [loaded, _loaded] = useState(!1)
    useEffect(() => {
        _loaded(!0)
    }, [])
    return <LoadedContext.Provider value={loaded}>
        <UserContext.Provider value={auth}>
            <div>
                <Header />
                <div className="pageBody">{children}</div>
            </div>
        </UserContext.Provider>
    </LoadedContext.Provider>
}