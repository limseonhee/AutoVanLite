import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";
import { SubHeader } from "@/components/layout/sub-header";
import { ManualSendModalProvider } from "@/contexts/manual-send-modal-context";
import "./globals.css";

export const metadata: Metadata = {
    title: "AutoVan",
    description: "AutoVan - 차계부 관리 및 고객관리 플랫폼",
    icons: {
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiByeD0iNCIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzNfMTIpIi8+CjxwYXRoIGQ9Ik0xNS4yMzQgMjcuNjU2NEw4Ljk2NiAxNi44QzguNTgxMSAxNi4xMzMzIDkuMDYyMjMgMTUuMyA5LjgzMjAzIDE1LjNIMTYuMUMxNi42NTIzIDE1LjMgMTcuMSAxNS43NDc3IDE3LjEgMTYuM1YyNy4xNTY0QzE3LjEgMjguMTc5NSAxNS43NDU1IDI4LjU0MjQgMTUuMjM0IDI3LjY1NjRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTguOSAyNi45MTlWNy45MTgwMkMxOC45IDcuMTc0NjQgMTkuNjgyMyA2LjY5MTE0IDIwLjM0NzIgNy4wMjM1OUwyNy4wNTY0IDEwLjM3ODJDMjcuNTMwMSAxMC42MTUgMjcuNzM3IDExLjE4MDEgMjcuNTI4MyAxMS42NjY4TDIwLjgxOSAyNy4zMTMxQzIwLjM5MDUgMjguMzEyNCAxOC45IDI4LjAwNjMgMTguOSAyNi45MTlaIiBmaWxsPSJ3aGl0ZSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzNfMTIiIHgxPSIwIiB5MT0iMCIgeDI9IjM2IiB5Mj0iMzYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRTNENyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDcyQjkiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className={`${GeistSans.className} bg-[#F9FAFC] dark:bg-gray-900`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ManualSendModalProvider>
                        <div className="relative flex min-h-screen flex-col">
                            <Header />
                            <SubHeader />
                            <main className="flex-1">{children}</main>
                        </div>
                    </ManualSendModalProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
