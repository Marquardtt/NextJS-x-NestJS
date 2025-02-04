"use client"

import { HeaderComponent } from "@/components/Header/HeaderComponent";
import "../style/globals.css";
import { UserContext } from "@/contexts/UserContext";
import { useState } from "react";
import { User } from "@/models/User";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>();
  return (
    <html lang="pt-br" className="w-screen h-screen">
      <UserContext.Provider value={{ user, setUser }}>
        <body className="font-mono">
          <header>
            <HeaderComponent />
          </header>
          <main className="w-screen h-screen">
            {children}
          </main>
        </body>
      </UserContext.Provider>
    </html>
  );
}
