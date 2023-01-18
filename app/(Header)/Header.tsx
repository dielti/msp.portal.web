'use client'

import dynamic from "next/dynamic"
import Link from "next/link"
import { useContext } from "react"
import { LoadedContext, UserContext } from "../Contexts"

//@ts-ignore
const NoAuthBlock = dynamic(() => import('./NoAuthBlock'), { ssr: false })
//@ts-ignore
const AuthBlock = dynamic(() => import('./AuthBlock'), { ssr: false })

export default () => {
    const loaded = useContext(LoadedContext),
        user = useContext(UserContext)

    return <div className="pageHeader-wrap">
        <div className="pageHeader-content">
            <Link href='/' className="pageHeader-logo">
                <img style={{ height: 'inherit' }} src="/images/msp_logo.png" />
            </Link>
            <div style={{ flexGrow: 1 }} />
            <div className="pageHeader-personal">
                {loaded && (user ? <AuthBlock /> : <NoAuthBlock />)}
            </div>
        </div>
    </div>
}