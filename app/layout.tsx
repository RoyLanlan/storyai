import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '小说高潮生成器',
  description: 'AI写作辅助工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}


