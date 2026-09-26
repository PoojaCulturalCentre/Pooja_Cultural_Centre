"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { title: "", place: "", event_date: "", description: "" };

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(EMPTY_FORM);
  const [savingEdit, setSavingEdit] = useState(false);

  const loadEvents = () => {
    setLoading(true);
    fetch("/api/admin/events")
      .then((res) => res.json())
      .then(setEvents)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const toggle = async (id) => {
    const target = events.find((e) => e.id === id);
    if (!target) return;
    const nextActive = !target.active;

    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, active: nextActive } : e)));

    try {
      await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      });
    } catch {
      setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, active: !nextActive } : e)));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim() || !form.place.trim() || !form.event_date) {
      setFormError("Title, place, and date are required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create failed");

      setEvents((prev) => [...prev, data].sort((a, b) => a.event_date.localeCompare(b.event_date)));
      setForm(EMPTY_FORM);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (ev) => {
    setEditingId(ev.id);
    setEditDraft({
      title: ev.title,
      place: ev.place,
      event_date: ev.event_date,
      description: ev.description || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft(EMPTY_FORM);
  };

  const saveEdit = async (id) => {
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDraft),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setEvents((prev) => prev.map((e) => (e.id === id ? data : e)));
      cancelEdit();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSavingEdit(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this event? It will be hidden from the site but not permanently deleted.")) return;

    setEvents((prev) => prev.filter((e) => e.id !== id));
    try {
      await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    } catch {
      loadEvents();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Event Management</h1>
        <p className="text-ink/50 text-sm">Add, edit, or remove upcoming events shown on the website.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8 flex flex-col gap-6">
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-2xl shadow-card p-6 grid sm:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Place</label>
            <input
              type="text"
              value={form.place}
              onChange={(e) => setForm((f) => ({ ...f, place: e.target.value }))}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Date</label>
            <input
              type="date"
              value={form.event_date}
              onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button type="submit" className="btn btn-gold" disabled={saving}>
            {saving ? "Adding..." : "Add Event"}
          </button>
          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          {formError && <p className="sm:col-span-4 text-maroon text-xs font-medium">{formError}</p>}
        </form>

        <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-3">
          {loading && <p className="text-ink/50 text-sm py-2">Loading...</p>}
          {!loading && events.length === 0 && <p className="text-ink/50 text-sm py-2">No events yet.</p>}
          {!loading &&
            events.map((ev) => (
              <div
                key={ev.id}
                className="flex items-center justify-between gap-4 border-t border-ink/5 pt-3 first:border-t-0 first:pt-0"
              >
                {editingId === ev.id ? (
                  <div className="flex-1 min-w-0 grid sm:grid-cols-4 gap-3 items-center">
                    <input
                      type="text"
                      value={editDraft.title}
                      onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="text"
                      value={editDraft.place}
                      onChange={(e) => setEditDraft((d) => ({ ...d, place: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="date"
                      value={editDraft.event_date}
                      onChange={(e) => setEditDraft((d) => ({ ...d, event_date: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="text"
                      value={editDraft.description}
                      onChange={(e) => setEditDraft((d) => ({ ...d, description: e.target.value }))}
                      placeholder="Description"
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                ) : (
                  <div className="min-w-0">
                    <div className="font-medium text-ink text-sm truncate">{ev.title}</div>
                    <div className="text-ink/50 text-xs">
                      📍 {ev.place} · {ev.event_date}
                    </div>
                  </div>
                )}

                <div className="shrink-0 flex items-center gap-2">
                  {editingId === ev.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(ev.id)}
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
                        onClick={() => startEdit(ev)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggle(ev.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                          ev.active
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-ink/10 text-ink/50 hover:bg-ink/15"
                        }`}
                      >
                        {ev.active ? "Active" : "Hidden"}
                      </button>
                      <button
                        onClick={() => remove(ev.id)}
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
