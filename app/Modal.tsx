import { useEffect } from "react";
import { createPortal } from "react-dom";

export default ({children, cn, open, closeModal}: {children: any, cn?: string, open: boolean, closeModal: () => void}): JSX.Element => {
    useEffect(() => {
        return () => {window.modalOpen = !1, window.closeModal = null}
    }, [])

    useEffect(() => {
        open ? (window.modalOpen = !0, window.closeModal = closeModal) : (window.modalOpen=!1)
    }, [open])

    const modal = typeof document !== 'undefined' && document.getElementById('modalWrap1')
    return modal && open ? createPortal(<div className={`modalWrap${cn ? ` ${cn}` : ''}`}>
        <div className="modalBackground" onClick={closeModal}/>
        <div className='modalContainer'>{children}</div>
    </div>, modal) : <span/>
}