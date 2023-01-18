'use client'

import { useState } from "react"
import LogInForm from "./LogInForm"

export default () => {
    const [logIn, _logIn] = useState(!1)

    return [<button key={1} onClick={() => _logIn(!0)} className="authButton">Увійти</button>, <LogInForm key={2} open={logIn} close={() => _logIn(!1)}/>]
}