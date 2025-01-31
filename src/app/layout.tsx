"use client"

import { HeaderComponent } from "@/components/Header/HeaderComponent";
import "../style/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <header>
          <HeaderComponent />
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
