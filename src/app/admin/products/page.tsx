"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  price?: number;
  priceOnRequest: boolean;
  imageUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", category: "IP_CAMERAS", brand: "", description: "", imageUrl: "", priceOnRequest: true, price: "", isFeatured: false, isActive: true });

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products?all=1");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const save = async () => {
    const url = editing ? `/api/products/${editing.id}` : "/api/products";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: form.price ? parseFloat(form.price) : undefined }),
    });
    if (res.ok) {
      toast.success(editing ? "Product updated" : "Product created");
      setShowForm(false);
      setEditing(null);
      fetchProducts();
    } else {
      toast.error("Failed to save");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); fetchProducts(); }
    else toast.error("Failed to delete");
  };

  const catLabel = (cat: string) => PRODUCT_CATEGORIES.find((c) => c.id === cat)?.label || cat;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Products</h1>
          <p className="text-white/40 text-sm mt-1">{products.length} products</p>
        </div>
        <Button onClick={() => { setEditing(null); setForm({ name: "", category: "IP_CAMERAS", brand: "", description: "", imageUrl: "", priceOnRequest: true, price: "", isFeatured: false, isActive: true }); setShowForm(true); }}>
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-bold mb-4">{editing ? "Edit Product" : "Add Product"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "name", label: "Name *", placeholder: "Product name" },
              { key: "brand", label: "Brand", placeholder: "Brand name" },
              { key: "imageUrl", label: "Image URL", placeholder: "https://..." },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-white/60 text-xs mb-1">{label}</label>
                <input
                  value={(form as unknown as Record<string, string>)[key] || ""}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>
            ))}
            <div>
              <label className="block text-white/60 text-xs mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-blue"
              >
                {PRODUCT_CATEGORIES.filter((c) => c.id !== "ALL").map((c) => (
                  <option key={c.id} value={c.id} className="bg-navy">{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Price (₹)</label>
              <input
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="Leave empty for 'Price on request'"
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-white/60 text-xs mb-1">Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-blue resize-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} />
              Active
            </label>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={save}>Save Product</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Product", "Category", "Brand", "Price", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-white/30 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5">
                          <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                          <Tag className="w-4 h-4 text-brand-blue/40" />
                        </div>
                      )}
                      <span className="text-white font-medium text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm">{catLabel(p.category)}</td>
                  <td className="px-4 py-3 text-white/50 text-sm">{p.brand || "—"}</td>
                  <td className="px-4 py-3 text-white/60 text-sm">
                    {p.priceOnRequest ? "On request" : p.price ? formatCurrency(p.price) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={p.isActive ? "green" : "outline"} size="sm">
                      {p.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditing(p); setForm({ name: p.name, category: p.category, brand: p.brand || "", description: "", imageUrl: p.imageUrl || "", priceOnRequest: p.priceOnRequest, price: p.price?.toString() || "", isFeatured: p.isFeatured, isActive: p.isActive }); setShowForm(true); }} className="p-1.5 text-white/40 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(p.id)} className="p-1.5 text-white/40 hover:text-brand-red transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && products.length === 0 && (
            <div className="text-center py-16 text-white/30">No products yet. Add your first product.</div>
          )}
        </div>
      </div>
    </div>
  );
}
