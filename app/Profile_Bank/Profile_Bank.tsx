'use client'

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { calendar, expand, search, upload } from "../icons"
import { opfu, payrollStatuses, prcCodes, prTypes, services, sources } from './data'
import DateField from "../(FormComponents)/DateField"
import SelectField from "../(FormComponents)/SelectField"
import TextField from "../(FormComponents)/TextField"
import Item from "./Item"

const items = [[[
    'Відомість на зарахування субсидій',
    '2022',
    'Серпень',
    '517.87',
    '9',
    'Отримано банком'
]], [['454', '12.12.2012', 8, '415.86'], ['545', '11.11.2013', 3, '212.00']],
[['233', '30.01.2019', '9500.00', '2', 'Завантажено']]],
    tabs = [['Назва відомості', 'Рік', 'Місяць', 'Загальна сума', 'Загальна кількість рядків', 'Статус'], ['Номер платіжного доручення', 'Дата проведення платіжного доручення', 'Кількість виплатних відомостей', 'Сума'], ['Номер платіжного доручення', 'Дата платіжного доручення', 'Загальна сума платіжного доручення', 'Загальна кількість рядків в файлі', 'Статус']],
    details = [{ label: 'Назва відомості', value: 'Відомість на зарахування субсидій' }, { label: 'Послуга', value: 'Субсидії' }, { label: 'Джерело', value: 'ДСВ' }, { label: 'Тип відомості', value: 'Основна' }, { label: 'Рік', value: '2022' }, { label: 'Місяць', value: 'Серпень' }, { label: 'Назва банку', value: 'Ощадбанк' }, { label: 'Загальна сума', value: '517.87' }, { label: 'Загальна кількість', value: '9' }, { label: 'Орган МСП', value: 'Головне управління у Вінницькій області' }, { label: 'Дата отримання в банку', value: '30.11.2022 23:20' }, { label: 'Статус', value: 'Отримано банком' }, { label: 'Ідентифікатор пакета', value: '12602' }]

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
        formRef = useRef<HTMLFormElement>(null),
        { register, getValues, handleSubmit, setError, formState: { errors }, reset } = useForm<FormValues>({ mode: 'onSubmit' }),
        onSubmit = (data: any, e?: React.BaseSyntheticEvent) => {
            e?.preventDefault()
            _searched(!0)
        }

    useEffect(() => {
        formRef.current?.reset()
        _searched(!1)
    }, [type])

    return <>
        <div className="pageSubBlock" style={{padding: '15px 20px'}}><div className="page-header">Кабінет спеціаліста банку - виплатні відомості</div></div>
        <div className="pageBlock mt0">
            <div className="pageBlock-head">
                <div className="pageBlock-header">Параметри пошуку</div>
                {/* <div className="pageBlock-tabs">
                    <button className={`pageBlock-tab${type == 0 ? ' active' : ''}`} onClick={() => _type(0)}>Виплатні відомості</button>
                    <button className={`pageBlock-tab${type == 1 ? ' active' : ''}`} onClick={() => _type(1)}>Платіжні доручення</button>
                    <button className={`pageBlock-tab${type == 2 ? ' active' : ''}`} onClick={() => _type(2)}>Повернення коштів</button>
                    <div style={{ transform: `translateX(${100 * type}%)`, width: '33.33%' }} className="pageBlock-slider" />
                </div> */}
            </div>
            <div style={{ marginTop: 0 }} className="pageBlock-body">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                    {{
                        0: <div className="row">
                            <div className="col-md-6">
                                <DateField label="Дата виплати з" />
                            </div>
                            <div className="col-md-6">
                                <DateField label="Дата виплати по" />
                            </div>
                            <div className="col-md-6">
                                <SelectField label='Органи Міністерства соціальної політики України' value='Code' caption='Caption' options={opfu} emptyDefault={true} />
                            </div>
                            <div className="col-md-6">
                                <SelectField label="Тип відомості" options={prTypes} emptyDefault={true} />
                            </div>
                            <div className="col-md-6">
                                <SelectField label='Послуга' options={services} emptyDefault={true} />
                            </div>
                            <div className="col-md-6">
                                <SelectField label="Джерело" options={sources} emptyDefault={true} />
                            </div>
                            <div className="col-md-6">
                                <SelectField label='Статус відомості' options={payrollStatuses} emptyDefault={true} />
                            </div>
                            <div className="col-md-6">
                                <TextField label='Ідентифікатор пакета' />
                            </div>
                            <fieldset className="searchForm-buttons">
                                <button type='submit' className="searchForm-button animatedButton">{search}Пошук</button>
                            </fieldset>
                        </div>,
                        1: <div className="row">
                            <div className="col-md-6">
                                <DateField label='Дата платіжного доручення з' />
                            </div>
                            <div className="col-md-6">
                                <DateField label='Дата платіжного доручення по' />
                            </div>
                            <div className="col-md-6">
                                <SelectField label='Статус реєстру виплатних відомостей' options={[{ value: 1, caption: 'відправлено' }, { value: 2, caption: 'отримано банком' }]} emptyDefault={!0} />
                            </div>
                            <div className="col-md-6">
                                <SelectField label='Результат опрацювання Реєстру виплатних відомостей' options={prcCodes} emptyDefault={!0} value='Id' caption="Caption" />
                            </div>
                            <fieldset className="searchForm-fieldset searchForm-buttons">
                                <button type='submit' className="searchForm-button animatedButton">{search}Пошук</button>
                            </fieldset>
                        </div>,
                        2: <div className="row">
                            <div className="col-md-6">
                                <DateField label='Дата платіжного доручення з' />
                            </div>
                            <div className="col-md-6">
                                <DateField label='Дата платіжного доручення по' />
                            </div>
                            <div className="col-md-6">
                                <SelectField label='Статус реєстра повернених коштів' options={[{ value: 1, caption: 'Завантажено' }, { value: 2, caption: 'Знайдено ПД' }, { value: 3, caption: 'Помилка суми' }, { value: 4, caption: 'Оброблено' }]} emptyDefault={!0} />
                            </div>
                            <fieldset className="searchForm-buttons">
                                <button type="button" className="searchForm-button animatedButton" style={{ width: 186 }}>{upload}Додати файл</button>
                                <button type='submit' className="searchForm-button animatedButton">{search}Пошук</button>
                            </fieldset>
                        </div>
                    }[type]}
                </form>
            </div>
        </div>
        <div className='pageBlock p0'>
            <div className="pageBlock-head">
                <div className="pageBlock-header">
                    Результати пошуку
                </div>
            </div>
            <table className="searchResults-table">
                <thead className="searchResults-head">
                    <tr>
                        {tabs[type].map((v, key) => <th key={key}>{v}</th>)}
                        <th style={{ width: 70 }} />
                    </tr>
                </thead>
                <tbody className="searchResults-body">
                    {searched && items[type].map((v, key) => <Item details={details} v={v} key={key} />)}
                </tbody>
            </table>
        </div>
    </>
}