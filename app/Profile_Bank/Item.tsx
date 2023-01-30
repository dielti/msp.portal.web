'use client'

import { useState } from "react"
import { expand } from "../icons"

export default ({ v, details }: { v: any[], details: any[] }) => {
    const [expanded, _expanded] = useState(!1)
    return <>
        <tr className={expanded ? 'active' : ''} onClick={() => _expanded(v => !v)}>
            {v.map((v, key) => <td key={key}>{v}</td>)}
            <td style={{ paddingTop: 2 }}>{expand}</td>
        </tr>
        {expanded && <tr className="details">
            <td colSpan={v.length+1}>
                <table className="detailsTable" style={{width: '100%'}}>
                    <tbody>
                        {details.map(({label, value}, key) => <tr key={key}>
                            <td>
                                {label}
                            </td>
                            <td>
                                {value}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </td>
        </tr>}
    </>
}