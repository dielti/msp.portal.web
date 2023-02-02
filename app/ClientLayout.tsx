'use client'

import React, { useEffect, useState } from "react"
import moment from 'moment'
import Header from "./(Header)/Header"
import { HeaderExtContext, LoadedContext, UserContext } from "./Contexts"
import Sidebar from "./Sidebar"
import { usePathname } from "next/navigation"

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
                    <Header />
                    {headerExt && <div className="pageHeader-extWrap">
                        <div className="pageHeader-extContent">
                            <img width={300} src='/images/msp_logo_vert.png' />
                        </div>
                    </div>}
                    <div {...(headerExt && { style: { marginTop: 318 } })} className="pageBody">
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