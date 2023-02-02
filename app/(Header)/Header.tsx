'use client'

import dynamic from "next/dynamic"
import Link from "next/link"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { HeaderExtContext, LoadedContext, UserContext } from "../Contexts"
import { accessibility } from "../icons"

//@ts-ignore
const NoAuthBlock = dynamic(() => import('./NoAuthBlock'), { ssr: false })
//@ts-ignore
const AuthBlock = dynamic(() => import('./AuthBlock'), { ssr: false })

export default () => {
    const loaded = useContext(LoadedContext),
        user = useContext(UserContext),
        [ext] = useContext(HeaderExtContext),
        [forcedHeader, _forcedHeader] = useState(!1)

    useEffect(() => {
        if (ext) {
            const onScroll = () => {
                _forcedHeader(window.scrollY > 258)
            }
            onScroll()
            window.addEventListener('scroll', onScroll)
            return () => window.removeEventListener('scroll',onScroll)
        }
    },[ext])

    return <div className={`pageHeader-wrap${ext ? ' withExt' : ''}${forcedHeader ? ' forced' : ''}`}>
        <div className='pageHeader-content'>
            <Link href='/' className="pageHeader-logo">
                <img style={{ height: 'inherit' }} src="/images/msp_logo3.png" />
            </Link>
            <div style={{ flexGrow: 1 }} />
            <div className="pageHeader-personal">
                <button className="accButton animatedButton">{accessibility}Для людей з<br/>порушенням зору</button>
                {loaded && (user ? <AuthBlock /> : <NoAuthBlock />)}
            </div>
        </div>
    </div>
}