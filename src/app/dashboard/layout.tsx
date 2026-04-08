"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileNav />
      <main className="pl-60 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
