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
    <div className="pageSubBlock">
      <div className="page-header1">Послуги</div>
      <ServicesMenu />
    </div>
  </div>
}