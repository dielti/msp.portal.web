'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "./Contexts"
import { file, home, home_filled, cases, balance, receipt, monitoring, tips, transportation, medicalInfo, workspace, workspace_filled, arrowBack, chevronRight } from "./icons"

export default () => {
    const auth = useContext(UserContext),
        pathname = usePathname(),
        [subMenu, _subMenu] = useState(0),
        [loaded, _loaded] = useState(!1)

    useEffect(() => {
        _loaded(!0)
    }, [])

    return <div className={`pageSidebar-wrap${loaded ? ' animated' : ''}`}><div className={`pageSidebar-mainMenu${subMenu ? ' translated' : ''}`}>
        {auth && <Link href='/Profile_Bank' className={`pageSidebar-item${pathname == '/Profile_Bank' ? ' active' : ''}`}>{pathname == '/Profile_Bank' ? home_filled : home}Мій кабінет</Link>}
        <a href='/' onClick={(e) => { e.preventDefault(); _subMenu(1) }} className="pageSidebar-item">{cases}<span className="pageSidebar-itemText">Надавачу соціальних послуг</span>{chevronRight}</a>
        <a href='/' onClick={(e) => { e.preventDefault(); _subMenu(2) }} className="pageSidebar-item">{cases}<span className="pageSidebar-itemText">Отримувачу соціальних послуг</span>{chevronRight}</a>
        <a href='/' onClick={(e) => { e.preventDefault(); _subMenu(3) }} className="pageSidebar-item">{balance}<span className="pageSidebar-itemText">Представнику органів виконавчої влади</span>{chevronRight}</a>
        <a href='/' onClick={(e) => { e.preventDefault(); _subMenu(4) }} className="pageSidebar-item">{receipt}<span className="pageSidebar-itemText">Представнику банку</span>{chevronRight}</a>
    </div>
        <div className={`pageSidebar-subMenu${subMenu == 1 ? ' visible' : ''}`}>
            <a className="pageSidebar-item" onClick={(e) => {e.preventDefault(), _subMenu(0)}}>{arrowBack}Головне меню</a>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{balance}<span className="pageSidebar-itemText">Заява на первинну реєстрацію надавача соціальних послуг в Реєстрі надавачів та отримувачів соціальних послуг</span></Link>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{balance}<span className="pageSidebar-itemText">Заява на внесення змін в реєстраційні дані надавача соціальних послуг в Реєстрі надавачів та отримувачів соціальних послуг</span></Link>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{balance}<span className="pageSidebar-itemText">Ваші заяви до органів Міністерства соціальної політики України</span></Link>
        </div>
        <div className={`pageSidebar-subMenu${subMenu == 2 ? ' visible' : ''}`}>
            <a className="pageSidebar-item" onClick={(e) => {e.preventDefault(), _subMenu(0)}}>{arrowBack}Головне меню</a>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{balance}<span className="pageSidebar-itemText">Формування заяви про потребу в наданні соціальної послуги</span></Link>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{balance}<span className="pageSidebar-itemText">Всі ваші заяви до органів Міністерства соціальної політики України</span></Link>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{balance}<span className="pageSidebar-itemText">Ваші заяви до органів Міністерства соціальної політики України</span></Link>
        </div>
        <div className={`pageSidebar-subMenu${subMenu == 3 ? ' visible' : ''}`}>
            <a className="pageSidebar-item" onClick={(e) => {e.preventDefault(), _subMenu(0)}}>{arrowBack}Головне меню</a>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{cases}<span className="pageSidebar-itemText">Один</span></Link>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{cases}<span className="pageSidebar-itemText">Два</span></Link>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{cases}<span className="pageSidebar-itemText">Три</span></Link>
        </div>
        <div className={`pageSidebar-subMenu${subMenu == 4 ? ' visible' : ''}`}>
            <a className="pageSidebar-item" onClick={(e) => {e.preventDefault(), _subMenu(0)}}>{arrowBack}Головне меню</a>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{cases}<span className="pageSidebar-itemText">Один</span></Link>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{cases}<span className="pageSidebar-itemText">Два</span></Link>
            <Link href='/' onClick={(e) => e.preventDefault()} className="pageSidebar-item">{cases}<span className="pageSidebar-itemText">Три</span></Link>
        </div>
    </div>
}