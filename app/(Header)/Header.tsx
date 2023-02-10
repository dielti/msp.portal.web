'use client'

import { deleteCookie } from "cookies-next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { HeaderExtContext, LoadedContext, UserContext } from "../Contexts"
import { accessibility, account, logOut as logOutIcon, close, menu } from "../icons"

//@ts-ignore
const NoAuthBlock = dynamic(() => import('./NoAuthBlock'), { ssr: false })
//@ts-ignore
const AuthBlock = dynamic(() => import('./AuthBlock'), { ssr: false })

export default () => {
    const loaded = useContext(LoadedContext),
        user = useContext(UserContext),
        [ext] = useContext(HeaderExtContext),
        [menuOpen, _menuOpen] = useState(!1),
        [forcedHeader, _forcedHeader] = useState(!1),
        [translate, _translate] = useState(0),
        router = useRouter(),
        logOut = () => {
            deleteCookie('at')
            router.refresh()
        }

    useEffect(() => {
        if (ext) {
            const onScroll = () => {
                window.scrollY > 420 && _translate(window.scrollY < 480 ? 480 - window.scrollY : 0)
                _forcedHeader(window.scrollY > 420)
            }
            onScroll()
            window.addEventListener('scroll', onScroll)
            return () => window.removeEventListener('scroll', onScroll)
        }
    }, [ext])

    return <><div {...(forcedHeader && { style: { transform: `translateY(-${translate}px)` } })} className={`pageHeader-wrap${ext ? ' withExt' : ''}${forcedHeader ? ' forced' : ''}`}>
        <div className='pageHeader-content'>
            <Link href='/' className="pageHeader-logo">
                <div className="pageHeader-herb" />
                <div className="pageHeader-title">
                    <span className="pageHeader-mspTitle">Міністерство соціальної політики України</span>
                    <span className="pageHeader-ekTitle">Електронний кабінет соціальних послуг</span>
                </div>
                {/* <img style={{ height: 'inherit' }} src="/images/msp_logo3.png" /> */}
            </Link>
            <div style={{ flexGrow: 1 }} />
            <div className="pageHeader-personal">
                {/* <button className="accButton animatedButton">{accessibility}Для людей з<br/>порушенням зору</button> */}
                {loaded && (user ? <AuthBlock /> : <NoAuthBlock />)}
                <button onClick={() => _menuOpen(v => !v)} className="pageHeader-menuTrigger">{menu}</button>
            </div>
        </div>
    </div>
        <div className={`pageHeader-menu${menuOpen ? ' open' : ''}`}>
            <div className="pageHeader-menuTop">
                <Link className="pageHeader-menuLogoWrap" href='/'>
                    <div className="pageHeader-menuHerb" />
                    <div className="pageHeader-menuLogo">Міністерство<br />соціальної політики<br />України</div>
                </Link>
                <button className="pageHeader-menuClose" onClick={() => _menuOpen(!1)}>{close}</button>
            </div>
            <div className="pageHeader-menuPersonal">
                {user ? <><div className="pageHeader-menuTitle"><span>Ви авторизовані як <strong>Анжела Петрівна</strong></span></div>
                    <Link className="pageHeader-menuButton" onClick={() => _menuOpen(!1)} href='/Profile_Bank'>{account}<span>Мій кабінет</span></Link>
                    <button className="pageHeader-menuLogout animatedButton" onClick={() => { _menuOpen(!1); logOut() }}>{logOutIcon}<span>Вихід</span></button></> : <NoAuthBlock onLogIn={() => _menuOpen(!1)}/>}
            </div>
        </div>
    </>
}