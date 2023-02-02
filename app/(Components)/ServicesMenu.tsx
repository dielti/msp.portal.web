'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { bigBack, bigForward } from "../icons"

const items: {label: string, pic: string, url?: string}[][] = [[{ label: 'Всі ваші заяви до органів Міністерства соціальної політики України', pic: 'https://diia.gov.ua/storage/app/uploads/public/62b/edf/143/62bedf14369d4357926475.png' },
{ label: 'Ваші інформаційні повідомлення з ЄІССС', pic: 'https://diia.gov.ua/storage/app/uploads/public/633/ebb/1f8/633ebb1f85e81285995174.png' },
{ label: 'Формування заяви про потребу в наданні соціальної послуги', pic: 'https://diia.gov.ua/storage/app/uploads/public/62b/f44/42a/62bf4442ae5f0006480450.png' },
{ label: 'Заява про потребу в наданні соціальної послуги', pic: 'https://diia.gov.ua/storage/app/uploads/public/62b/ee9/ed3/62bee9ed35a9e257625326.png' }
], [
    { label: 'Всі ваші заяви до органів Міністерства соціальної політики України', pic: 'https://diia.gov.ua/storage/app/uploads/public/62b/edf/143/62bedf14369d4357926475.png' },
    { label: 'Ваші інформаційні повідомлення з ЄІССС', pic: 'https://diia.gov.ua/storage/app/uploads/public/633/ebb/1f8/633ebb1f85e81285995174.png' },
    { label: 'Внесення змін до тарифів на надання соціальних послуг', pic: 'https://diia.gov.ua/storage/app/uploads/public/61e/40d/4b5/61e40d4b531cd972392919.jpg' },
    { label: 'Індивідуальні плани щодо надання соціальних послуг', pic: 'https://diia.gov.ua/storage/app/uploads/public/620/3bf/427/6203bf427e74f758868561.jpg' },
    { label: 'Договори щодо надання соціальних послуг', pic: 'https://diia.gov.ua/storage/app/uploads/public/61e/402/3c0/61e4023c09a57103291390.jpg' },
    { label: 'Звітні відомості щодо факту надання послуг', pic: 'https://diia.gov.ua/storage/app/uploads/public/61e/40d/b13/61e40db13b28d679883573.jpg' },
    { label: 'Акт про надання кризово-екстрених послуг', pic: 'https://diia.gov.ua/storage/app/uploads/public/61e/404/249/61e404249d547144221090.jpeg' },

], [
    {label: 'Кабінет спеціаліста банку', url: '/Profile_Bank', pic: 'https://diia.gov.ua/storage/app/uploads/public/61e/402/3c0/61e4023c09a57103291390.jpg'}
]
]

export default () => {
    const [tab, _tab] = useState(0),
        slider = useRef<HTMLDivElement>(null)

    useEffect(() => {
        slider.current && (slider.current.scrollLeft = 0)
    }, [tab])

    return <>
        <div className="ui-navTabs">
            <a className={tab == 0 ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); _tab(0) }}>Громадянам</a>
            <a className={tab == 1 ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); _tab(1) }}>Надавачам соц. послуг</a>
            <a className={tab == 2 ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); _tab(2) }}>Представникам банків</a>
        </div>
        <div ref={slider} className="slideMenu-wrap">
            {items[tab].map(({ label, pic, url }, key) => <Link href={url || '/'} onClick={e => url || e.preventDefault()} key={key} className='slideMenu-item'>
                <div className="slideMenu-image" style={{ backgroundImage: `url('${pic}')` }} />
                {label}
            </Link>)}
        </div>
        <div className="slideMenu-controlls">
            <button onClick={() => { slider.current && (slider.current.scrollLeft -= 318) }}>{bigBack}</button>
            <button onClick={() => { slider.current && (slider.current.scrollLeft += 318) }}>{bigForward}</button>
        </div>
    </>
} 