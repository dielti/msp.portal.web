'use client'

import { useContext, useEffect, useRef, useState } from "react"
import ServicesMenu from "./(Components)/ServicesMenu"
import { HeaderExtContext } from "./Contexts"
import { arrowBack, arrowForward, bigBack, bigForward, support } from "./icons"

export default () => {
  const [, _ext] = useContext(HeaderExtContext),
    [transform, _transform] = useState(0),
    slider = useRef<HTMLDivElement>(null)
  useEffect(() => {
    _ext(!0)
    return () => _ext(!1)
  }, [])
  return <div style={{ flex: 1, overflow: 'hidden' }}>
    <div className="pageSubBlock digBg">
      <div className='page-header'>Електронний портал соціальних послуг</div>
      <div style={{fontSize: 20, fontWeight: 300, margin: '0 50% 0 24px'}}>Сервіс, що дозволяє вам поринутися у світ соціальних послуг. Цим сервісом можуть користуватися фізичні особи, юридичні особи ти представники банків</div>
    </div>
    <div className="pageSubBlock">
      <div className="page-header">Корисні сервіси</div>
      <ServicesMenu/>
    </div>
  </div>
}