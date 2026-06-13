"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Globe, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface Portfolio {
  id: string;
  title: string;
  clientIndustry?: string;
  location?: string;
  camerasInstalled?: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [form, setForm] = useState({ title: "", clientName: "", clientIndustry: "", location: "", summary: "", challenge: "", solution: "", outcome: "", camerasInstalled: "", afterImageUrl: "", isPublished: false, isFeatured: false });

  const fetch_ = async () => {
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    const url = editing ? `/api/portfolio/${editing.id}` : "/api/portfolio";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, camerasInstalled: form.camerasInstalled ? parseInt(form.camerasInstalled) : undefined }),
    });
    if (res.ok) { toast.success("Saved"); setShowForm(false); fetch_(); }
    else toast.error("Failed");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); fetch_(); }
    else toast.error("Failed");
  };

  const textareas = [
    { key: "summary", label: "Summary *" },
    { key: "challenge", label: "Challenge *" },
    { key: "solution", label: "Solution *" },
    { key: "outcome", label: "Outcome *" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Portfolio</h1>
          <p className="text-white/40 text-sm mt-1">{items.length} projects</p>
        </div>
        <Button onClick={() => { setEditing(null); setForm({ title: "", clientName: "", clientIndustry: "", location: "", summary: "", challenge: "", solution: "", outcome: "", camerasInstalled: "", afterImageUrl: "", isPublished: false, isFeatured: false }); setShowForm(true); }}>
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-bold mb-4">{editing ? "Edit Project" : "Add Project"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { key: "title", label: "Title *" },
              { key: "clientName", label: "Client Name" },
              { key: "clientIndustry", label: "Industry" },
              { key: "location", label: "Location" },
              { key: "camerasInstalled", label: "Cameras Installed" },
              { key: "afterImageUrl", label: "After Image URL" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-white/60 text-xs mb-1">{label}</label>
                <input
                  value={(form as unknown as Record<string, string>)[key] || ""}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>
            ))}
          </div>
          <div className="space-y-3 mb-4">
            {textareas.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-white/60 text-xs mb-1">{label}</label>
                <textarea
                  value={(form as unknown as Record<string, string>)[key] || ""}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-blue resize-none"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))} />
              Published
            </label>
            <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} />
              Featured
            </label>
          </div>
          <div className="flex gap-3">
            <Button onClick={save}>Save</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {["Title", "Industry", "Location", "Cameras", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs text-white/30 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 text-white font-medium text-sm">{item.title}</td>
                <td className="px-4 py-3 text-white/60 text-sm">{item.clientIndustry || "—"}</td>
                <td className="px-4 py-3 text-white/60 text-sm">{item.location || "—"}</td>
                <td className="px-4 py-3 text-white/60 text-sm">{item.camerasInstalled || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    {item.isPublished ? (
                      <span className="flex items-center gap-1 text-emerald-400"><Globe className="w-3 h-3" /> Published</span>
                    ) : (
                      <span className="flex items-center gap-1 text-white/30"><EyeOff className="w-3 h-3" /> Draft</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditing(item); setShowForm(true); }} className="p-1.5 text-white/40 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(item.id)} className="p-1.5 text-white/40 hover:text-brand-red">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="text-center py-16 text-white/30">No projects yet.</div>}
      </div>
    </div>
  );
}
