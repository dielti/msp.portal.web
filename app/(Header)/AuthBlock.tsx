'use client'

import { deleteCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { bottomArrow, account, logOut as logOutIcon} from "../icons"

export default () => {
    const [shown, _shown] = useState(!1),
    trigger = useRef<HTMLButtonElement>(null),
    wrapper = useRef<HTMLDivElement>(null),
    router = useRouter(),
    logOut = () => {
        deleteCookie('at')
        router.refresh()
    }

    useEffect(() => {
        if (shown) {
            const clickOutside = ({ target }: MouseEvent) => {
                if (!wrapper.current?.contains(target as Node) && !trigger.current?.contains(target as Node)) { _shown(!1) }
            }
            document.addEventListener('mousedown', clickOutside)
            return () => document.removeEventListener('mousedown', clickOutside)
        }
    }, [shown])

    return <>
    {[<button key={1} ref={trigger} onClick={() => _shown(s => !s)} className={`pageHeader-pdTrigger${shown ? ' active' : ''}`}><div className="pdPic">А</div>{bottomArrow}</button>,
    <div key={2} ref={wrapper} className={`pageHeader-pdWrap${shown ? ' shown' : ''}`}>
        <div className="pageHeader-pdItem pdHeader"><span>Ви авторизовані як <strong>Анжела Петрівна</strong></span></div>
        <Link className="pageHeader-pdItem" onClick={() => _shown(!1)} href='/Profile_Bank'>{account}Мій кабінет</Link>
        <button className="pageHeader-pdItem" onClick={() => {_shown(!1); logOut()}}>{logOutIcon}Вихід</button>
    </div>
]}
    </>
}