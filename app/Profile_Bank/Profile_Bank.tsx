'use client'

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import 'moment/locale/uk'
import moment, { Moment } from "moment"
import { useState, useEffect, useRef, Ref } from "react"
import { useForm } from "react-hook-form"
import { calendar, expand, search } from "../icons"
import { opfu, payrollStatuses, prTypes, services, sources } from './data'

const items = [{
    PR_NAME: 'Відомість на зарахування субсидій',
    PAY_YEAR: '2022',
    PAY_MONTH: 'Серпень',
    PR_SUM: '517.87',
    PR_ROW_CNT: '9',
    PR_STATUS: 'Отримано банком/поштою'
}],
    tabs = [['Назва відомості', 'Рік', 'Місяць', 'Загальна сума', 'Загальна кількість рядків', 'Статус'], ['Номер платіжного доручення', 'Дата проведення платіжного доручення', 'Кількість виплатних відомостей', 'Сума'], ['Номер платіжного доручення', 'Дата платіжного доручення', 'Загальна сума платіжного доручення', 'Загальна кількість рядків в файлі', 'Статус']]

type FormValues = {
    dateFrom: Date;
    dateTo: Date;
    opfu: string;
    vidType: string;
    service: string;
    source: string;
    status: string;
    packetId: string;
}

export default () => {
    const [type, _type] = useState(0),
        [searched, _searched] = useState(!1),
        [date1, _date1] = useState<Moment | null>(null),
        [date2, _date2] = useState<Moment | null>(null),
        [dp1, _dp1] = useState(!1),
        [dp2, _dp2] = useState(!1),
        { register, getValues, handleSubmit, setError, formState: { errors }, reset } = useForm<FormValues>({ mode: 'onSubmit' }),
        onSubmit = (data: any, e?: React.BaseSyntheticEvent) => {
            e?.preventDefault()
            _searched(!0)
        }

    useEffect(() => {
        _searched(!1)
    }, [type])

    return <>{[<div key={1} className="pageBlock">
        <div className="pageBlock-head">
            <div className="pageBlock-header">Кабінет спеціаліста банку/пошти</div>
            <div className="pageBlock-tabs">
                <button className={`pageBlock-tab${type == 0 ? ' active' : ''}`} onClick={() => _type(0)}>Виплатні відомості</button>
                <button className={`pageBlock-tab${type == 1 ? ' active' : ''}`} onClick={() => _type(1)}>Платіжні доручення від ПФУ</button>
                <button className={`pageBlock-tab${type == 2 ? ' active' : ''}`} onClick={() => _type(2)}>Повернення коштів в ПФУ</button>
                <div style={{ transform: `translateX(${100 * type}%)`, width: '33.33%' }} className="pageBlock-slider" />
            </div>
        </div>
        <div style={{ marginTop: 20 }} className="pageBlock-body">
            {{
                0: <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className="col-md-6">
                        <fieldset className="searchForm-fieldset">
                            <LocalizationProvider adapterLocale='uk' dateAdapter={AdapterMoment}><DatePicker inputFormat="DD.MM.yyyy" onClose={() => _dp1(!1)} value={date1} open={dp1} onChange={v => _date1(v)} renderInput={({ inputProps, inputRef, InputProps }) => <input ref={inputRef} className="searchForm-input" {...inputProps} placeholder='__.__.____'/>} /></LocalizationProvider>
                            <button type="button" onClick={() => { _dp1(v => !v) }} style={{ paddingTop: 1 }} className="form-uploadButton">{calendar}</button>
                            <label className="searchForm-label">Дата виплати з</label>
                            {/* <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div> */}
                        </fieldset>
                        <fieldset className="searchForm-fieldset">
                            <select defaultValue='' className="searchForm-input">
                                <option value='' />
                                {opfu.map(({ Code, Caption }, key) => <option value={Code} key={key}>{Caption}</option>)}
                            </select>
                            <label className="searchForm-label">ОПФУ</label>
                            <div className="authForm-icon">{expand}</div>
                            {/* <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div> */}
                        </fieldset>
                        <fieldset className="searchForm-fieldset">
                            <select defaultValue='' className="searchForm-input">
                                <option value='' />
                                {services.map(({ value, caption }, key) => <option value={value} key={key}>{caption}</option>)}
                            </select>
                            <label className="searchForm-label">Послуга</label>
                            <div className="authForm-icon">{expand}</div>
                            {/* <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div> */}
                        </fieldset>
                        <fieldset className="searchForm-fieldset">
                            <select defaultValue='' className="searchForm-input">
                                <option value='' />
                                {payrollStatuses.map(({ value, caption }, key) => <option value={value} key={key}>{caption}</option>)}
                            </select>
                            <label className="searchForm-label">Статус відомості</label>
                            <div className="authForm-icon">{expand}</div>
                            {/* <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div> */}
                        </fieldset>
                    </div>
                    <div className="col-md-6">
                        <fieldset className="searchForm-fieldset">
                            <LocalizationProvider adapterLocale='uk' dateAdapter={AdapterMoment}><DatePicker inputFormat="DD.MM.yyyy" onClose={() => _dp2(!1)} value={date2} open={dp2} onChange={v => _date2(v)} renderInput={({ inputProps, inputRef, InputProps }) => <input ref={inputRef} className="searchForm-input" {...inputProps} placeholder='__.__.____'/>} /></LocalizationProvider>
                            <button type="button" onClick={() => { _dp2(v => !v) }} style={{ paddingTop: 1 }} className="form-uploadButton">{calendar}</button>
                            <label className="searchForm-label">Дата виплати по</label>
                            {/* <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div> */}
                        </fieldset>
                        <fieldset className="searchForm-fieldset">
                            <select defaultValue='' className="searchForm-input">
                                <option value='' />
                                {prTypes.map(({ value, caption }, key) => <option value={value} key={key}>{caption}</option>)}
                            </select>
                            <label className="searchForm-label">Тип відомості</label>
                            <div className="authForm-icon">{expand}</div>
                            {/* <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div> */}
                        </fieldset>
                        <fieldset className="searchForm-fieldset">
                            <select defaultValue='' className="searchForm-input">
                                <option value='' />
                                {sources.map(({ value, caption }, key) => <option value={value} key={key}>{caption}</option>)}
                            </select>
                            <label className="searchForm-label">Джерело</label>
                            <div className="authForm-icon">{expand}</div>
                            {/* <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div> */}
                        </fieldset>
                        <fieldset className="searchForm-fieldset">
                            <input is-empty='false' type='text' placeholder='' className="searchForm-input" />
                            <label className="searchForm-label">Ідентифікатор пакета</label>
                            {/* <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div> */}
                        </fieldset>
                    </div>
                    <fieldset className="searchForm-fieldset searchForm-buttons">
                        <button type='submit' className="searchForm-button">{search}Пошук</button>
                    </fieldset>
                </form>,
                1: <div>Потім</div>,
                2: <div>Теж потім</div>
            }[type]}
        </div>
    </div>,
    <div key={2} style={{ marginTop: 24 }} className='pageBlock'>
        <div className="pageBlock-head">
            <div className="pageBlock-header">
                Результати пошуку
            </div>
        </div>
        <table className="searchResults-table">
            <thead className="searchResults-head">
                <tr>
                    {tabs[type].map((v, key) => <th key={key}>{v}</th>)}
                </tr>
            </thead>
            <tbody className="searchResults-body">
                {searched && items.map(({ PR_NAME, PAY_YEAR, PAY_MONTH, PR_SUM, PR_STATUS, PR_ROW_CNT }, key) => <tr key={key}>
                    <td>{PR_NAME}</td>
                    <td>{PAY_YEAR}</td>
                    <td>{PAY_MONTH}</td>
                    <td>{PR_SUM}</td>
                    <td>{PR_ROW_CNT}</td>
                    <td>{PR_STATUS}</td>
                </tr>)}
            </tbody>
        </table>
    </div>]}</>
}