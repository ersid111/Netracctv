"use client";

import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#040D18]">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-6 overflow-auto">{children}</main>
    </div>
  );
}
