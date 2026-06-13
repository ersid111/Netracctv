"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { priorityColors, statusColors } from "@/lib/lead-scoring";
import { Download, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  status: string;
  priority: string;
  leadScore: number;
  productInterest?: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/enquiries")
      .then((r) => r.json())
      .then((d) => setEnquiries(Array.isArray(d) ? d : []))
      .catch(() => setEnquiries([]))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      toast.success("Status updated");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Enquiries</h1>
          <p className="text-white/40 text-sm mt-1">{loading ? "Loading…" : `${enquiries.length} enquiries`}</p>
        </div>
        <a href="/api/leads/export" download>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </a>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Name", "Contact", "Property", "Score", "Status", "Priority", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-white/30 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium text-sm">{e.name}</div>
                    {e.productInterest && <div className="text-white/30 text-xs">{e.productInterest}</div>}
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm">{e.phone}</td>
                  <td className="px-4 py-3 text-white/60 text-sm">{e.propertyType}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-white text-sm">{e.leadScore}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={e.status}
                      onChange={(ev) => updateStatus(e.id, ev.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                    >
                      {["NEW", "IN_REVIEW", "QUOTED", "WON", "LOST"].map((s) => (
                        <option key={s} value={s} className="bg-navy">{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={e.priority === "URGENT" ? "red" : e.priority === "HIGH" ? "yellow" : "outline"} size="sm">
                      {e.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs">{formatDate(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && enquiries.length === 0 && (
            <div className="text-center py-16 text-white/30 flex flex-col items-center gap-3">
              <MessageSquare className="w-8 h-8 text-white/10" />
              <p>No enquiries yet. They appear here after form submissions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
