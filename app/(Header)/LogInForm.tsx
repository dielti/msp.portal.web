'use client'

import { useEffect, useRef, useState } from "react"
import { clear, expand, vis, visOff } from "../icons"
import Modal from "../Modal"
import { useForm } from 'react-hook-form'
import caList from './caList'
import { setCookie } from "cookies-next"
import {useRouter} from 'next/navigation'

type FormValues = {
    password: string;
    typePerson: string;
    acsk: string;
    keyFile: FileList;
}

const typeLoginPers = [{
    Id: 'F',
    Name: 'Фізична особа'
},
{
    Id: 'J',
    Name: 'Юридична особа'
},
{
    Id: 'I',
    Name: 'Інспектор праці'
},
{
    Id: 'N',
    Name: 'Інспектор НАБУ'
},
/*{
    Id: 'D',
    Name: 'Лікар або уповноважена особа ЗОЗ'
},
{
    Id: 'Z',
    Name: "Адміністратор ЗОЗ"
},*/
{
    Id: 'B',
    Name: 'Спеціаліст банку/Пошти'
},
{
    Id: 'S',
    Name: 'Надавач житлово-комунальних послуг'
},
{
    Id: 'L',
    Name: 'Нотаріус'
},
{
    Id: 'G',
    Name: 'Підприємство пробірного контролю'
},
{
    Id: 'M',
    Name: 'Постачальник електронних комунікаційних послуг'
}]

export default ({ open, close }: { open: boolean, close: () => void }) => {
    const [type, _type] = useState(0),
        { register, getValues, handleSubmit, setError, formState: { errors }, reset } = useForm<FormValues>({ mode: 'onSubmit' }),
        [pswVisible, _pswVisible] = useState(!1),
        [fileName, _fileName] = useState(''),
        router = useRouter(),
        uploadButton = useRef<HTMLInputElement>(),
        { ref, ...rest } = register('keyFile', { required: 'Необхідно обрати файл ключа' }),
        onSubmit = async (body: FormValues) => {
            setCookie('at', 1)
            await router.replace('/Profile_Bank');
            router.refresh()
        }

        useEffect(() => {
            reset()
            _fileName('')
            _pswVisible(!1)
        }, [open])

    return <Modal cn="modal-authForm" open={open} closeModal={close}>
        <div className="authForm-wrap">
            <div className="authForm-head">
                <button className="authForm-closeButton" onClick={close} >{clear}</button>
                <img src="/images/msp_logo_mini.png" className="authForm-logo" />
                <h1 style={{ color: '#e3e3e3' }} className="formHeader"><span>Увійти до системи</span></h1>
                <div className="authForm-typeTabs">
                    <a onClick={(e) => { e.preventDefault(); _type(0) }} href='#' className={`authForm-typeTab${type == 0 ? ' active' : ''}`}>За КЕП</a>
                    <a onClick={(e) => { e.preventDefault(); _type(1) }} href='#' className={`authForm-typeTab${type == 1 ? ' active' : ''}`}>За токеном</a>
                    <div style={{ transform: type == 1 ? 'translateX(100%)' : '' }} className="authForm-typeSlider" />
                </div>
            </div>
            <div className="authForm-body">
                <form style={{ width: '100%', margin: '20px 0' }} onSubmit={handleSubmit(onSubmit)}>
                    {{
                        0: <div>
                            <fieldset className="authForm-fieldset">
                                <select is-empty="false" className="authForm-input animatedInput" {...register('typePerson')}>
                                    {typeLoginPers.map(({ Id, Name }, key) => <option value={Id} key={key}>
                                        {Name}
                                    </option>)}
                                </select>
                                <label className="animatedPlaceholder">Увійти як</label>
                                <div className="authForm-icon">{expand}</div>
                            </fieldset>
                            <fieldset className="authForm-fieldset">
                                <select defaultValue='' is-empty="false" className="authForm-input animatedInput" {...register('acsk', { required: 'Необхідно вибрати АЦСК' })}>
                                    <option disabled value='' />
                                    {caList.map(({ issuerCNs: [Name], address: Id }, key) => <option value={Id} key={key}>
                                        {Name}
                                    </option>)}
                                </select>
                                <label className="animatedPlaceholder">Виберіть АЦСК</label>
                                <div className="authForm-icon">{expand}</div>
                                <div className="authForm-error" role="alert">{errors.acsk && errors.acsk.message}</div>
                            </fieldset>
                            <fieldset className="authForm-fieldset">
                                <div is-empty="false" style={{ paddingRight: 80 }} className="authForm-input animatedInput">
                                    <input className="form-fileInput" type="file" {...rest} ref={e => { ref(e); e && (uploadButton.current = e) }} onChange={(e) => _fileName((e.target.files && e.target.files[0].name) || '')} />
                                    <span>{fileName}</span>
                                </div>
                                <label className="animatedPlaceholder">Оберіть файл ключа</label>
                                <button type="button" onClick={() => { uploadButton.current?.click() }} className="form-uploadButton">Обрати</button>
                                <div className="authForm-error" role="alert">{errors.keyFile && errors.keyFile.message}</div>
                            </fieldset>
                            <fieldset className="authForm-fieldset">
                                <input is-empty={`${!getValues('password')}`} type={pswVisible ? "text" : "password"} placeholder='Пароль ключа' className="authForm-input animatedInput" {...register('password', { onChange: ({ target }) => { target.setAttribute("is-empty", !target.value) }, required: 'Необхідно ввести пароль' })} />
                                <label className="animatedPlaceholder">Пароль ключа</label>
                                <button type="button" onClick={() => _pswVisible(v => !v)} className="authForm-visToggle">{pswVisible ? visOff : vis}</button>
                                <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div>
                            </fieldset>
                            <fieldset className="authForm-fieldset">
                                <button type="submit" className="authForm-submitButton">Увійти</button>
                            </fieldset>
                        </div>,
                        1: <div>...авторазація за токеном</div>
                    }[type]}
                </form>
            </div>
        </div>
    </Modal>
}