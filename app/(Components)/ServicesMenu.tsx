'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { bigBack, bigForward } from "../icons"

const items: { label: string, details: string, url?: string }[][] = [[{ label: 'Ваші заяви до органів МСП України', details: 'Тут ви можете переглянути всі ваші заяви до органів Міністерства соціальної політики України' },
{ label: 'Ваші інформаційні повідомлення з ЄІССС', details: 'Тут ви можете переглянути всі ваші інформаційні повідомлення з Єдиної інформаційної системи соціальної сфери'},
{ label: 'Заява про потребу в наданні соціальної послуги', details: 'Тут ви можете зформувати заяву про потребу в надані соціальної послуги' }
], [
    { label: 'Ваші заяви до органів МСП України', details: 'Тут ви можете переглянути всі ваші заяви до органів Міністерства соціальної політики України' },
    { label: 'Ваші інформаційні повідомлення з ЄІССС', details: 'Тут ви можете переглянути всі ваші інформаційні повідомлення з Єдиної інформаційної системи соціальної сфери' },
    { label: 'Внесення змін до тарифів на надання соціальних послуг', details: 'Тут ви можете внести зміни до тарифів на надання соціальних послуг' },
    { label: 'Індивідуальні плани щодо надання соціальних послуг', details: 'Тут ви можете взаємодіяти з індивідуальними планами щодо надання соціальних послуг' },
    { label: 'Договори щодо надання соціальних послуг', details: 'Тут ви можете взаємодіяти з договорами щодо надання соціальних послуг' },
    { label: 'Звітні відомості щодо факту надання послуг', details: 'Тут ви можете взаємодіяти зі звітними відомостями щодо факту надання послуг' },
    { label: 'Акт про надання кризово-екстрених послуг', details: 'Тут ви можете скласти акт про надання кризово-екстрених послуг' },

], [
    { label: 'Кабінет спеціаліста банку', url: '/Profile_Bank', details: 'Тут ви можете переглядати та взаємодіяти з виплатними відомостями' }
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
        <div ref={slider} className="services-wrap">
            {/* {items[tab].map(({ label, pic, url }, key) => <Link href={url || '/'} onClick={e => url || e.preventDefault()} key={key} className='slideMenu-item'>
                <div className="slideMenu-image" style={{ backgroundImage: `url('${pic}')` }} />
                {label}
            </Link>)} */}
            <div className="row">
                {items[tab].map(({ label, details, url }, key) => <div key={key} className="col-6 col-md-4">
                    <div className="services-item">
                        <Link href={url || '/'} onClick={e => url || e.preventDefault()} className='services-title'>
                            {label}
                        </Link>
                        <div className="services-info">
                            {details}
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </>
} 