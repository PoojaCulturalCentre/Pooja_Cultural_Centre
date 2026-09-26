"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { title: "", duration: "", file: null };

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ title: "", duration: "", file: null });
  const [savingEdit, setSavingEdit] = useState(false);

  const loadVideos = () => {
    setLoading(true);
    fetch("/api/admin/videos")
      .then((res) => res.json())
      .then(setVideos)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const toggle = async (id) => {
    const target = videos.find((v) => v.id === id);
    if (!target) return;
    const nextActive = !target.active;

    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, active: nextActive } : v)));

    try {
      await fetch(`/api/admin/videos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      });
    } catch {
      setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, active: !nextActive } : v)));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError("");

    if (!form.title.trim() || !form.duration.trim() || !form.file) {
      setUploadError("Title, duration, and a video file are all required.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("title", form.title.trim());
      body.append("duration", form.duration.trim());
      body.append("file", form.file);

      const res = await fetch("/api/admin/videos", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setVideos((prev) => [...prev, data]);
      setForm(EMPTY_FORM);
      e.target.reset();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (v) => {
    setEditingId(v.id);
    setEditDraft({ title: v.title, duration: v.duration, file: null });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({ title: "", duration: "", file: null });
  };

  const saveEdit = async (id) => {
    setSavingEdit(true);
    try {
      const body = new FormData();
      body.append("title", editDraft.title.trim());
      body.append("duration", editDraft.duration.trim());
      if (editDraft.file) body.append("file", editDraft.file);

      const res = await fetch(`/api/admin/videos/${id}`, { method: "PATCH", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setVideos((prev) => prev.map((v) => (v.id === id ? data : v)));
      cancelEdit();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setSavingEdit(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this video? It will be hidden from the site but not permanently deleted.")) return;

    setVideos((prev) => prev.filter((v) => v.id !== id));
    try {
      await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    } catch {
      loadVideos();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Video Management</h1>
        <p className="text-ink/50 text-sm">Upload, edit, or remove videos.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8 flex flex-col gap-6">
        <form
          onSubmit={handleUpload}
          className="bg-white rounded-2xl shadow-card p-6 grid sm:grid-cols-4 gap-4 items-end"
        >
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Duration</label>
            <input
              type="text"
              placeholder="e.g. 5:45"
              value={form.duration}
              onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Video file</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
              className="w-full text-xs text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-maroon/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-maroon"
            />
          </div>
          <button type="submit" className="btn btn-gold sm:col-span-1" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
          {uploadError && <p className="sm:col-span-4 text-maroon text-xs font-medium">{uploadError}</p>}
        </form>

        <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-3">
          {loading && <p className="text-ink/50 text-sm py-2">Loading...</p>}
          {!loading && videos.length === 0 && <p className="text-ink/50 text-sm py-2">No videos yet.</p>}
          {!loading &&
            videos.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between gap-4 border-t border-ink/5 pt-3 first:border-t-0 first:pt-0"
              >
                {editingId === v.id ? (
                  <div className="flex-1 min-w-0 grid sm:grid-cols-3 gap-3 items-center">
                    <input
                      type="text"
                      value={editDraft.title}
                      onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="text"
                      value={editDraft.duration}
                      onChange={(e) => setEditDraft((d) => ({ ...d, duration: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setEditDraft((d) => ({ ...d, file: e.target.files?.[0] || null }))}
                      className="text-xs text-ink/70 file:mr-2 file:rounded-full file:border-0 file:bg-maroon/10 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-maroon"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-11 h-11 shrink-0 rounded-xl bg-maroon/10 flex items-center justify-center text-lg">
                      🎬
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-ink text-sm truncate">{v.title}</div>
                      <div className="text-ink/50 text-xs">{v.duration}</div>
                    </div>
                  </div>
                )}

                <div className="shrink-0 flex items-center gap-2">
                  {editingId === v.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(v.id)}
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
                      {v.url && (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10"
                        >
                          View
                        </a>
                      )}
                      <button
                        onClick={() => startEdit(v)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggle(v.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                          v.active
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-ink/10 text-ink/50 hover:bg-ink/15"
                        }`}
                      >
                        {v.active ? "Active" : "Hidden"}
                      </button>
                      <button
                        onClick={() => remove(v.id)}
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
