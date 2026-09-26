"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { title: "", category: "", file: null };

async function parseResponse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Server error (${res.status}): ${text.slice(0, 200) || "empty response"}`);
  }
}

export default function AdminImagesPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ title: "", category: "", file: null });
  const [savingEdit, setSavingEdit] = useState(false);

  const loadImages = () => {
    setLoading(true);
    fetch("/api/admin/images")
      .then((res) => res.json())
      .then(setImages)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadImages();
  }, []);

  const toggle = async (id) => {
    const target = images.find((img) => img.id === id);
    if (!target) return;
    const nextActive = !target.active;

    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, active: nextActive } : img)));

    try {
      await fetch(`/api/admin/images/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      });
    } catch {
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, active: !nextActive } : img)));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError("");

    if (!form.title.trim() || !form.category.trim() || !form.file) {
      setUploadError("Title, category, and an image file are all required.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("title", form.title.trim());
      body.append("category", form.category.trim());
      body.append("file", form.file);

      const res = await fetch("/api/admin/images", { method: "POST", body });
      const data = await parseResponse(res);
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setImages((prev) => [...prev, data]);
      setForm(EMPTY_FORM);
      e.target.reset();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (img) => {
    setEditingId(img.id);
    setEditDraft({ title: img.title, category: img.category, file: null });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({ title: "", category: "", file: null });
  };

  const saveEdit = async (id) => {
    setSavingEdit(true);
    try {
      const body = new FormData();
      body.append("title", editDraft.title.trim());
      body.append("category", editDraft.category.trim());
      if (editDraft.file) body.append("file", editDraft.file);

      const res = await fetch(`/api/admin/images/${id}`, { method: "PATCH", body });
      const data = await parseResponse(res);
      if (!res.ok) throw new Error(data.error || "Update failed");

      setImages((prev) => prev.map((img) => (img.id === id ? data : img)));
      cancelEdit();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setSavingEdit(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this image? It will be hidden from the site but not permanently deleted.")) return;

    setImages((prev) => prev.filter((img) => img.id !== id));
    try {
      await fetch(`/api/admin/images/${id}`, { method: "DELETE" });
    } catch {
      loadImages();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-6 sm:px-8 pt-8 pb-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-dark">Image Management</h1>
        <p className="text-ink/50 text-sm">Upload, edit, or remove gallery images.</p>
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
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-ink/60 mb-1.5">Image file</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
              className="w-full text-xs text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-maroon/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-maroon"
            />
          </div>
          <button type="submit" className="btn btn-gold sm:col-span-1" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          {uploadError && <p className="sm:col-span-4 text-maroon text-xs font-medium">{uploadError}</p>}
        </form>

        <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-3">
          {loading && <p className="text-ink/50 text-sm py-2">Loading...</p>}
          {!loading && images.length === 0 && <p className="text-ink/50 text-sm py-2">No images yet.</p>}
          {!loading &&
            images.map((img) => (
              <div
                key={img.id}
                className="flex items-center justify-between gap-4 border-t border-ink/5 pt-3 first:border-t-0 first:pt-0"
              >
                {editingId === img.id ? (
                  <div className="flex-1 min-w-0 grid sm:grid-cols-3 gap-3 items-center">
                    <input
                      type="text"
                      value={editDraft.title}
                      onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="text"
                      value={editDraft.category}
                      onChange={(e) => setEditDraft((d) => ({ ...d, category: e.target.value }))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditDraft((d) => ({ ...d, file: e.target.files?.[0] || null }))}
                      className="text-xs text-ink/70 file:mr-2 file:rounded-full file:border-0 file:bg-maroon/10 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-maroon"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 min-w-0">
                    {img.url ? (
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-11 h-11 shrink-0 rounded-xl object-cover"
                      />
                    ) : (
                      <span className="w-11 h-11 shrink-0 rounded-xl bg-maroon/10 flex items-center justify-center text-lg">
                        🖼️
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="font-medium text-ink text-sm truncate">{img.title}</div>
                      <div className="text-ink/50 text-xs">{img.category}</div>
                    </div>
                  </div>
                )}

                <div className="shrink-0 flex items-center gap-2">
                  {editingId === img.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(img.id)}
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
                      {img.url && (
                        <a
                          href={img.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10"
                        >
                          View
                        </a>
                      )}
                      <button
                        onClick={() => startEdit(img)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 text-ink/60 hover:bg-ink/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggle(img.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                          img.active
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-ink/10 text-ink/50 hover:bg-ink/15"
                        }`}
                      >
                        {img.active ? "Active" : "Hidden"}
                      </button>
                      <button
                        onClick={() => remove(img.id)}
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
