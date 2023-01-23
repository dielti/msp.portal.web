'use client'

import {useEffect, useState} from 'react'
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import 'moment/locale/uk'
import { Moment } from 'moment'
import { calendar } from '../icons'

export default ({label}: {label: string}) => {
    const [open, _open] = useState(!1),
    [value, _value] = useState<Moment|null>(null)

    return <fieldset className="searchForm-fieldset">
        <LocalizationProvider adapterLocale='uk' dateAdapter={AdapterMoment}>
            <DatePicker inputFormat='DD.MM.yyyy' onClose={() => _open(!1)} open={open} value={value} onChange={v => {console.log('change', v), _value(v)}} renderInput={({inputProps,inputRef}) => <input ref={inputRef} className='searchForm-input' {...inputProps} placeholder='__.__.____'/>}/>
            <button type='button' onClick={() => _open(v => !v)} style={{paddingTop: 1}} className='form-uploadButton'>{calendar}</button>
            <label className='searchForm-label'>{label}</label>
        </LocalizationProvider>
    </fieldset>
}