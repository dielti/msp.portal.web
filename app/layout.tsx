import ClientLayout from './ClientLayout'
import {cookies} from 'next/headers'
import './fonts.css'
import './globals.css'
import './root.css'

export default async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const auth = cookies().get('at')?.value

  return (
    <html>
      <head />
      <body>
        <ClientLayout auth={!!auth}>
          <div id="modalWrap1" />
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
