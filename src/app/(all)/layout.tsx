"use client"

import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="transition-all w-full h-full">{children}</div>
  );
}
