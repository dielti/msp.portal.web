import ClientLayout from './ClientLayout'
import {cookies} from 'next/headers'
import localFont from '@next/font/local'
import './fonts.css'
import './globals.css'
import './root.css'

const eUkraine = localFont({
  src: [
    {
      path: './(Fonts)/e-Ukraine-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './(Fonts)/e-Ukraine-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './(Fonts)/e-Ukraine-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './(Fonts)/e-Ukraine-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--eUkraine'
});
const eUkraineHead = localFont({
  src: [
    {
      path: './(Fonts)/e-UkraineHead-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './(Fonts)/e-UkraineHead-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './(Fonts)/e-UkraineHead-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './(Fonts)/e-UkraineHead-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--eUkraineHead'
})

export default async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const auth = cookies().get('at')?.value

  return (
    <html className={`${eUkraine.variable} ${eUkraineHead.variable}`}>
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
