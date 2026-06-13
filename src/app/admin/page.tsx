import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { priorityColors, statusColors } from "@/lib/lead-scoring";
import { TrendingUp, MessageSquare, CheckCircle, Users, Download } from "lucide-react";
import Link from "next/link";

async function getDashboardData() {
  const [total, newToday, won, recent] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
    prisma.enquiry.count({ where: { status: "WON" } }),
    prisma.enquiry.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, phone: true, propertyType: true, status: true, priority: true, leadScore: true, createdAt: true, productInterest: true },
    }),
  ]);

  return { total, newToday, won, conversionRate: total > 0 ? Math.round((won / total) * 100) : 0, recent };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const data = await getDashboardData();

  const stats = [
    { label: "Total Enquiries", value: data.total, icon: MessageSquare, color: "blue" },
    { label: "New Today", value: data.newToday, icon: TrendingUp, color: "green" },
    { label: "Deals Won", value: data.won, icon: CheckCircle, color: "emerald" },
    { label: "Conversion Rate", value: `${data.conversionRate}%`, icon: Users, color: "purple" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Welcome back, {session?.user?.name || "Admin"}</p>
        </div>
        <a
          href="/api/leads/export"
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/50 text-sm">{stat.label}</p>
              <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-brand-blue" />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-white font-bold">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-brand-blue text-sm hover:text-blue-300 transition-colors">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Name", "Property", "Product Interest", "Score", "Priority", "Status", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-white/30 font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recent.map((e) => (
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/enquiries?id=${e.id}`} className="text-white font-medium hover:text-brand-blue text-sm">
                      {e.name}
                    </Link>
                    <p className="text-white/30 text-xs">{e.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm capitalize">{e.propertyType}</td>
                  <td className="px-4 py-3 text-white/60 text-xs">{e.productInterest || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-white font-bold text-sm">{e.leadScore}</span>
                    <span className="text-white/30 text-xs">/100</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-white text-xs font-medium ${priorityColors[e.priority]}`}>
                      {e.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-white text-xs font-medium ${statusColors[e.status]}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs">{formatDate(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.recent.length === 0 && (
            <div className="text-center py-12 text-white/30">No enquiries yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
