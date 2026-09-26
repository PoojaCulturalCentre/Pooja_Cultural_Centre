"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { author_name: "", role: "", quote: "" };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(EMPTY_FORM);
  const [savingEdit, setSavingEdit] = useState(false);

  const loadTestimonials = () => {
    setLoading(true);
    fetch("/api/admin/testimonials")
      .then((res) => res.json())
      .then(setTestimonials)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const toggle = async (id) => {
    const target = testimonials.find((t) => t.id === id);
    if (!target) return;
    const nextActive = !target.active;

    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, active: nextActive } : t)));

    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      });
    } catch {
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, active: !nextActive } : t)));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.author_name.trim() || !form.quote.trim()) {
      setFormError("Name and quote are required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create failed");

      setTestimonials((prev) => [data, ...prev]);
      setForm(EMPTY_FORM);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditDraft({ author_name: t.author_name, role: t.role || "", quote: t.quote });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft(EMPTY_FORM);
  };

  const saveEdit = async (id) => {
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDraft),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setTestimonials((prev) => prev.map((t) => (t.id === id ? data : t)));
      cancelEdit();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSavingEdit(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this testimonial? It will be hidden from the site but not permanently deleted.")) return;

    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    } catch {
      loadTestimonials();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Testimonial Management</h1>
        <p className="text-ink/50 text-sm">Add, edit, or remove testimonials shown on the website.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8 flex flex-col gap-6">
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-2xl shadow-card p-6 grid sm:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Name</label>
            <input
              type="text"
              value={form.author_name}
              onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Role</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              placeholder="e.g. Parent, Beginner Batch"
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button type="submit" className="btn btn-gold" disabled={saving}>
            {saving ? "Adding..." : "Add Testimonial"}
          </button>
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Quote</label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
              rows={2}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          {formError && <p className="sm:col-span-3 text-maroon text-xs font-medium">{formError}</p>}
        </form>

        <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-3">
          {loading && <p className="text-ink/50 text-sm py-2">Loading...</p>}
          {!loading && testimonials.length === 0 && <p className="text-ink/50 text-sm py-2">No testimonials yet.</p>}
          {!loading &&
            testimonials.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-4 border-t border-ink/5 pt-3 first:border-t-0 first:pt-0"
              >
                {editingId === t.id ? (
                  <div className="flex-1 min-w-0 grid sm:grid-cols-3 gap-3 items-center">
                    <input
                      type="text"
                      value={editDraft.author_name}
                      onChange={(e) => setEditDraft((d) => ({ ...d, author_name: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="text"
                      value={editDraft.role}
                      onChange={(e) => setEditDraft((d) => ({ ...d, role: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="text"
                      value={editDraft.quote}
                      onChange={(e) => setEditDraft((d) => ({ ...d, quote: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                ) : (
                  <div className="min-w-0">
                    <div className="font-medium text-ink text-sm truncate">&ldquo;{t.quote}&rdquo;</div>
                    <div className="text-ink/50 text-xs">
                      {t.author_name}
                      {t.role ? ` · ${t.role}` : ""}
                    </div>
                  </div>
                )}

                <div className="shrink-0 flex items-center gap-2">
                  {editingId === t.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(t.id)}
                        disabled={savingEdit}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                      >
                        {savingEdit ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/10 text-ink/60 hover:bg-ink/15"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(t)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggle(t.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                          t.active
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-ink/10 text-ink/50 hover:bg-ink/15"
                        }`}
                      >
                        {t.active ? "Active" : "Hidden"}
                      </button>
                      <button
                        onClick={() => remove(t.id)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-maroon/10 text-maroon hover:bg-maroon/20"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
