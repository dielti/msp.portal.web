'use client'

import React, { useEffect, useState } from "react"
import moment from 'moment'
import Header from "./(Header)/Header"
import { LoadedContext, UserContext } from "./Contexts"
import Sidebar from "./Sidebar"

export default ({ children, auth }: { children: React.ReactNode, auth: boolean }) => {
    const [loaded, _loaded] = useState(!1)
    useEffect(() => {
        _loaded(!0)
    }, [])
    return <LoadedContext.Provider value={loaded}>
        <UserContext.Provider value={auth}>
            <div>
                <Header />
                <div className="pageBody">
                    <Sidebar/>
                    <div style={{flex: 1}}>{children}</div>
                    </div>
            </div>
        </UserContext.Provider>
    </LoadedContext.Provider>
}