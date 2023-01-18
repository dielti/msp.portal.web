import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default () => {
    const auth = cookies().get('at')?.value
    if (!auth) redirect('/')
    return <div>
        Кабінет банкіру
    </div>
}