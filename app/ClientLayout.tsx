'use client'

import React, { useEffect, useState } from "react"
import moment from 'moment'
import Header from "./(Header)/Header"
import { HeaderExtContext, LoadedContext, UserContext } from "./Contexts"
import Sidebar from "./Sidebar"
import { usePathname } from "next/navigation"
import TextField from "./(FormComponents)/TextField"
import Link from "next/link"

export default ({ children, auth }: { children: React.ReactNode, auth: boolean }) => {
    const [loaded, _loaded] = useState(!1),
        pathname = usePathname(),
        [headerExt, _headerExt] = useState(pathname == '/')
    useEffect(() => {
        _loaded(!0)
    }, [])
    return <LoadedContext.Provider value={loaded}>
        <UserContext.Provider value={auth}>
            <HeaderExtContext.Provider value={[headerExt, _headerExt]}>
                <div className={headerExt ? `setLH` : ''}>
                    <div className="pageShadowWrap"><div className="pageShadow" /></div>
                    <Header />
                    {headerExt && <div className="pageHeader-extWrap">
                        <div className="pageHeader-extContent">
                            <div className="pageHeader-extLogoWrap">
                                <div className="pageHeader-extHerb" />
                                <div className="pageHeader-extLogo" />
                            </div>
                            <div className="pageHeader-extTitle">Електронний кабінет соціальних послуг</div>
                            <form className="pageHeader-searchForm">
                                <div className="col-md-6 mw600">
                                    <div className="searchField-wrap">
                                        <div className="searchField-inputWrap">
                                            <input type="search" placeholder='Назва послуги' className="searchField-input"/>
                                            <input type="submit" value='' className="clear-btn searchField-submit"/>
                                        </div>
                                        <div className="searchField-text">Наприклад: <Link className="inline-link" href="/Profile_Bank">Кабінет спеціаліста банку</Link></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>}
                    <div {...(headerExt && { style: { marginTop: 420 } })} className="pageBody">
                        {children}
                    </div>
                    <div className="pageFooter-wrap">
                        <div className="pageFooter-content">
                            <div className="pageFooter-block">
                                <a target='_blank' href='https://www.msp.gov.ua/'>© 2023, Міністерство соціальної політики України</a>
                                <div>Розробник: ТОВ "Медирент"</div>
                            </div>
                            <table className="contactsTable">
                                <tbody>
                                    <tr>
                                        <td><a href='mailto:info@mlsp.gov.ua'>info@mlsp.gov.ua</a></td>
                                        <td><span className="small">тел.</span>(044) 289-86-22</td>
                                    </tr>
                                    <tr>
                                        <td>м. Київ, вул. Еспланадна, 8/10</td>
                                        <td><span className="small">тел.</span>(044) 289-70-60</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </HeaderExtContext.Provider>
        </UserContext.Provider>
    </LoadedContext.Provider>
}