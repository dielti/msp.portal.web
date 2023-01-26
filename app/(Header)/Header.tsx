'use client'

import dynamic from "next/dynamic"
import Link from "next/link"
import { useContext } from "react"
import { LoadedContext, UserContext } from "../Contexts"
import { accessibility } from "../icons"

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
                <img style={{ height: 'inherit' }} src="/images/msp_logo2.png" />
            </Link>
            <div style={{ flexGrow: 1 }} />
            <div className="pageHeader-personal">
                <button className="accButton">{accessibility}Для людей з<br/>порушенням зору</button>
                {loaded && (user ? <AuthBlock /> : <NoAuthBlock />)}
            </div>
        </div>
    </div>
}