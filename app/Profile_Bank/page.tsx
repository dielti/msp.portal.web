import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Profile_Bank from "./Profile_Bank"

export default () => {
    const auth = cookies().get('at')?.value
    if (!auth) redirect('/')
    return <Profile_Bank/>
}