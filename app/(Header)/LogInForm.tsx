'use client'

import { useEffect, useRef, useState } from "react"
import { clear, expand, vis, visOff } from "../icons"
import Modal from "../Modal"
import { useForm } from 'react-hook-form'
import caList from './caList'
import { setCookie } from "cookies-next"
import { useRouter } from 'next/navigation'

type FormValues = {
    password: string;
    typePerson: string;
    acsk: string;
    keyFile: FileList;
}

const typeLoginPers = [
    {
        Id: 'P',
        Name: 'Надавач соціальних послуг'
    },
    {
        Id: 'C',
        Name: 'Фізична особа - отримувач соціальних послуг'
    },
    {
        Id: 'B',
        Name: 'Спеціаліст банку'
    },
    {
        Id: 'V',
        Name: 'Спеціаліст органів виконавчої влади'
    }
    /*{
        Id: 'D',
        Name: 'Лікар або уповноважена особа ЗОЗ'
    },
    {
        Id: 'Z',
        Name: "Адміністратор ЗОЗ"
    },*/
]

export default ({ open, close, onLogIn }: { open: boolean, close: () => void, onLogIn?: () => void }) => {
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
            onLogIn && onLogIn();
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
                <div className="authForm-herb"/>
                <h1 className="formHeader"><span>Увійти до системи</span></h1>
                <div className="authForm-typeTabs">
                    <a onClick={(e) => { e.preventDefault(); _type(0) }} href='#' className={`authForm-typeTab${type == 0 ? ' active' : ''}`}>За КЕП</a>
                    <a onClick={(e) => { e.preventDefault(); _type(1) }} href='#' className={`authForm-typeTab${type == 1 ? ' active' : ''}`}>За токеном</a>
                    <div style={{ transform: type == 1 ? 'translateX(100%)' : '' }} className="authForm-typeSlider" />
                </div>
            </div>
            <div className="authForm-body">
                <form style={{ width: '100%', margin: '20px 0 12px' }} onSubmit={handleSubmit(onSubmit)}>
                    {{
                        0: <div>
                            <fieldset className="authForm-fieldset">
                                <div className="searchForm-inputWrap">
                                    <select className="searchForm-input" {...register('typePerson')}>
                                        {typeLoginPers.map(({ Id, Name }, key) => <option value={Id} key={key}>
                                            {Name}
                                        </option>)}
                                    </select>
                                </div>
                                <label className="searchForm-label">Увійти як</label>
                                <div className="authForm-icon">{expand}</div>
                            </fieldset>
                            <fieldset className="authForm-fieldset">
                                <div className="searchForm-inputWrap">
                                    <select defaultValue='' className="searchForm-input" {...register('acsk', { required: 'Необхідно вибрати АЦСК' })}>
                                        <option disabled value='' />
                                        {caList.map(({ issuerCNs: [Name], address: Id }, key) => <option value={Id} key={key}>
                                            {Name}
                                        </option>)}
                                    </select>
                                </div>
                                <label className="searchForm-label">Виберіть АЦСК</label>
                                <div className="authForm-icon">{expand}</div>
                                <div className="authForm-error" role="alert">{errors.acsk && errors.acsk.message}</div>
                            </fieldset>
                            <fieldset className="authForm-fieldset">
                                <div className="searchForm-inputWrap">
                                    <div onClick={() => { uploadButton.current?.click() }} style={{ paddingRight: 80 }} className="searchForm-input">
                                        <span>{fileName}</span>
                                    </div>
                                </div>
                                <label className="searchForm-label">Оберіть файл ключа</label>
                                <input className="form-fileInput" type="file" {...rest} ref={e => { ref(e); e && (uploadButton.current = e) }} onChange={(e) => _fileName((e.target.files && e.target.files[0].name) || '')} />
                                <button type="button" onClick={() => { uploadButton.current?.click() }} className="form-uploadButton animatedButton">Обрати</button>
                                <div className="authForm-error" role="alert">{errors.keyFile && errors.keyFile.message}</div>
                            </fieldset>
                            <fieldset className="authForm-fieldset">
                                <div className="searchForm-inputWrap">
                                    <input type={pswVisible ? "text" : "password"} className="searchForm-input" {...register('password', { required: 'Необхідно ввести пароль' })} />
                                </div>
                                <label className="searchForm-label">Пароль ключа</label>
                                <button type="button" onClick={() => _pswVisible(v => !v)} className="authForm-visToggle">{pswVisible ? visOff : vis}</button>
                                <div className="authForm-error" role="alert">{errors.password && errors.password.message}</div>
                            </fieldset>
                            <fieldset style={{ padding: '0 110px' }} className="authForm-fieldset">
                                <button type="submit" className="authForm-submitButton animatedButton">Увійти</button>
                            </fieldset>
                        </div>,
                        1: <div>...авторизація за токеном</div>
                    }[type]}
                </form>
            </div>
        </div>
    </Modal>
}