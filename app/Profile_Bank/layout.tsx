import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Sidebar from "../Sidebar"

export default ({ children }: { children: any }) => {
    const auth = cookies().get('at')?.value
    if (!auth) redirect('/')
    return <>
        <Sidebar />
        <div style={{ flex: 1 }}>{children}</div>
    </>
}