"use client";

import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="pl-60">
        {children}
      </main>
    </div>
  );
}
