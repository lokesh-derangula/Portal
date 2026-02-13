import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Job & Student Management Portal',
    description: 'AI-Powered Job Portal for Students and Recruiters',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={clsx(inter.className, "bg-black min-h-screen text-white antialiased")}>{children}</body>
        </html>
    )
}
