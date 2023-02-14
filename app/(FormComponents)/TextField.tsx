'use client'

export default ({placeholder = '', label}: {placeholder?: string, label: string}) => {

    return <fieldset className="searchForm-fieldset searchForm-inputWrap">
        <input aria-label={label} type="text" placeholder={placeholder} className='searchForm-input'/>
        <label className="searchForm-label">{label}</label>
    </fieldset>
}