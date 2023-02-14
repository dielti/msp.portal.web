'use client'

import { expand } from "../icons"

export default ({label, options, value='value', caption='caption', emptyDefault}: {label: string, value?: string, caption?: string, emptyDefault?: boolean, options: any[]}) => {

    return <fieldset className="searchForm-fieldset searchForm-inputWrap">
        <select aria-label={label} {...(emptyDefault && {default: ''})} className='searchForm-input'>
            {emptyDefault && <option value=''/>}
            {options.map((s, key) => <option key={key} value={s[value]}>{s[caption]}</option>)}
        </select>
        <label className="searchForm-label">{label}</label>
        <div className="authForm-icon">{expand}</div>
    </fieldset>
}