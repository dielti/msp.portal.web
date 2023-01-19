'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"
import { UserContext } from "./Contexts"
import { file, home, home_filled, cases, balance, receipt, monitoring, tips, transportation, medicalInfo, workspace, workspace_filled } from "./icons"

export default () => {
    const auth = useContext(UserContext),
    pathname = usePathname()

    return <div className="pageSidebar-wrap">
        {auth && <Link href='/Profile_Bank' className={`pageSidebar-item${pathname == '/Profile_Bank' ? ' active' : ''}`}>{pathname == '/Profile_Bank' ? workspace_filled : workspace}Мій кабінет</Link>}
        <Link href='/' className={`pageSidebar-item${pathname == '/' ? ' active' : ''}`}>{pathname == '/' ? home_filled : home}Головна</Link>
        <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{cases}Кейси</Link>
        <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{balance}Баланс</Link>
        <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{receipt}Квитанція</Link>
        <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{monitoring}Моніторинг</Link>
        <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{tips}Підказки</Link>
        <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{transportation}Транспортація</Link>
        <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{medicalInfo}Медична довідка</Link>
        <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{file}Документація</Link>
    </div>
}