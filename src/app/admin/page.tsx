"use client";

import { TrendingUp, MessageSquare, CheckCircle, Users } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Enquiries", value: "—", icon: MessageSquare, color: "blue" },
  { label: "New Today", value: "—", icon: TrendingUp, color: "green" },
  { label: "Conversion Rate", value: "—", icon: CheckCircle, color: "yellow" },
  { label: "High Priority", value: "—", icon: Users, color: "red" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Connect a database to view live analytics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/50 text-sm">{s.label}</span>
              <s.icon className="w-4 h-4 text-white/20" />
            </div>
            <div className="text-3xl font-black text-white">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
        <p className="text-white/40 text-sm mb-4">
          This is a static preview. Admin features require a live database connection.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/admin/products" className="text-brand-blue hover:underline text-sm">Manage Products</Link>
          <Link href="/admin/portfolio" className="text-brand-blue hover:underline text-sm">Manage Portfolio</Link>
          <Link href="/admin/enquiries" className="text-brand-blue hover:underline text-sm">View Enquiries</Link>
        </div>
      </div>
    </div>
  );
}
