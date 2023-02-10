'use client'

import { useState } from "react"
import LogInForm from "./LogInForm"

export default ({onLogIn}: {onLogIn?: ()=>void}) => {
    const [logIn, _logIn] = useState(!1)

    return [<button key={1} onClick={() => _logIn(!0)} className="authButton animatedButton">Увійти до кабінету</button>, <LogInForm key={2} onLogIn={onLogIn} open={logIn} close={() => _logIn(!1)}/>]
}