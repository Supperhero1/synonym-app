import type { Metadata } from 'next'
import '@/styles/global.scss'

export const metadata: Metadata = {
  description: 'Find synonyms efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
          <title>Synonym app</title>
          <link
              rel="icon"
              href="/icon?<generated>"
              type="image/<generated>"
              sizes="<generated>"
          />
      </head>
      <body>{children}</body>
    </html>
  )
}
