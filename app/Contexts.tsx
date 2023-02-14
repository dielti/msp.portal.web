import React, { SetStateAction } from 'react'

export const LoadedContext = React.createContext(!1)
export const UserContext = React.createContext<any>(null)
export const HeaderExtContext = React.createContext<any>(!1)
export const AccessibilityContext = React.createContext<[boolean,any]>([!1,null])