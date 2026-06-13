import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { priorityColors, statusColors } from "@/lib/lead-scoring";
import Link from "next/link";
import { Download, MessageSquare } from "lucide-react";

const STATUSES = ["ALL", "NEW", "IN_REVIEW", "QUOTED", "WON", "LOST", "ARCHIVED"];

async function getEnquiries(status: string, search: string) {
  return prisma.enquiry.findMany({
    where: {
      ...(status && status !== "ALL" ? { status } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } },
              { phone: { contains: search } },
              { company: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: [{ leadScore: "desc" }, { createdAt: "desc" }],
    include: { notes: { take: 1, orderBy: { createdAt: "desc" } } },
  });
}

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string };
}) {
  const status = searchParams.status || "ALL";
  const search = searchParams.search || "";
  const enquiries = await getEnquiries(status, search);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Enquiries</h1>
          <p className="text-white/40 text-sm mt-1">{enquiries.length} enquiries</p>
        </div>
        <a
          href="/api/leads/export"
          className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-blue-dark transition-all"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/enquiries?status=${s}${search ? `&search=${search}` : ""}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              status === s
                ? "bg-brand-blue text-white"
                : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Search */}
      <form className="mb-6">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search by name, email, phone..."
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-blue"
        />
        {status !== "ALL" && <input type="hidden" name="status" value={status} />}
      </form>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Client", "Contact", "Property", "Product Interest", "Score", "Priority", "Status", "Date", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-white/30 font-medium uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium text-sm">{e.name}</p>
                    {e.company && <p className="text-white/30 text-xs">{e.company}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white/70 text-sm">{e.phone}</p>
                    <p className="text-white/30 text-xs">{e.email}</p>
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm capitalize">{e.propertyType}</td>
                  <td className="px-4 py-3 text-white/60 text-xs max-w-[150px] truncate">{e.productInterest || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-blue rounded-full" style={{ width: `${e.leadScore}%` }} />
                      </div>
                      <span className="text-white text-xs font-bold">{e.leadScore}</span>
                    </div>
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
                  <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{formatDate(e.createdAt)}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://wa.me/${e.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${e.name}, this is NETRA CCTV regarding your security enquiry.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#25D366] hover:text-emerald-400 transition-colors text-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {enquiries.length === 0 && (
            <div className="text-center py-16 text-white/30">No enquiries found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
