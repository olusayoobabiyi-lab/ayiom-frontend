import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaTimes, FaImages, FaUpload, FaChevronLeft, FaEye } from "react-icons/fa";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";
import { useConfirm } from "@/context/ConfirmContext";
import { motion } from "framer-motion";

export default function AdminGallery() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const confirm = useConfirm();

  const [albumForm, setAlbumForm] = useState({
    title: "",
    description: "",
    coverImage: "",
    date: "",
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery/albums");
      setAlbums(res.data.data || []);
      // If we are currently viewing an album, refresh it
      if (selectedAlbum) {
        const refreshed = (res.data.data || []).find((a) => a._id === selectedAlbum._id);
        if (refreshed) setSelectedAlbum(refreshed);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load gallery albums");
    } finally {
      setLoading(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    setUploading(true);
    try {
      const res = await api.post("/settings/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAlbumForm((prev) => ({ ...prev, coverImage: res.data.data.imageUrl }));
      toast.success("Cover image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Cover image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedAlbum) return;

    const form = new FormData();
    form.append("image", file);

    setUploading(true);
    try {
      const uploadRes = await api.post("/settings/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = uploadRes.data.data.imageUrl;

      const albumRes = await api.post(`/gallery/albums/${selectedAlbum._id}/images`, { imageUrl });
      setSelectedAlbum(albumRes.data.data);
      toast.success("Photo added to album successfully!");
      fetchAlbums();
    } catch (err) {
      console.error(err);
      toast.error("Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!albumForm.title || !albumForm.description || !albumForm.coverImage || !albumForm.date) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await api.post("/gallery/albums", albumForm);
      toast.success("Gallery album created successfully!");
      setModalOpen(false);
      fetchAlbums();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create album");
    }
  };

  const handleDeleteAlbum = async (id, e) => {
    e.stopPropagation();
    const isConfirmed = await confirm({
      title: "Delete Album",
      message: "Are you sure you want to delete this album and all its images?",
      confirmText: "Delete",
      isDanger: true,
    });
    if (!isConfirmed) return;

    try {
      await api.delete(`/gallery/albums/${id}`);
      toast.success("Album deleted successfully!");
      if (selectedAlbum?._id === id) setSelectedAlbum(null);
      fetchAlbums();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete album");
    }
  };

  const handleRemovePhoto = async (imageUrl) => {
    const isConfirmed = await confirm({
      title: "Remove Photo",
      message: "Are you sure you want to remove this photo from the album?",
      confirmText: "Remove",
      isDanger: true,
    });
    if (!isConfirmed) return;

    try {
      // DELETE request with body/query
      const res = await api.delete(`/gallery/images/remove`, {
        data: { url: imageUrl },
      });
      setSelectedAlbum(res.data.data);
      toast.success("Photo removed successfully!");
      fetchAlbums();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove photo");
    }
  };

  if (loading && albums.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-400 font-bold uppercase tracking-wider animate-pulse">
          Loading gallery albums...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {selectedAlbum ? (
            <button
              onClick={() => setSelectedAlbum(null)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white mb-2 transition"
            >
              <FaChevronLeft /> Back to Albums
            </button>
          ) : null}
          <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wider text-white">
            {selectedAlbum ? selectedAlbum.title : "GALLERY ALBUMS"}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
            {selectedAlbum
              ? selectedAlbum.description
              : "Upload and manage photos from outreaches, crusades, and widows care events."}
          </p>
        </div>
        {!selectedAlbum ? (
          <button
            onClick={() => {
              setAlbumForm({ title: "", description: "", coverImage: "", date: "" });
              setModalOpen(true);
            }}
            className="bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl flex items-center gap-2 border border-gold/15 transition shrink-0"
          >
            <FaPlus className="text-gold" /> CREATE NEW ALBUM
          </button>
        ) : (
          <label className="cursor-pointer bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl flex items-center gap-2 border border-gold/15 transition shrink-0">
            <FaUpload /> {uploading ? "Uploading..." : "ADD PHOTO TO ALBUM"}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {/* Album Detail View */}
      {selectedAlbum ? (
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 shadow-md space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-850">
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-white">
              ALBUM PHOTOS ({selectedAlbum.images?.length || 0})
            </h3>
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              {selectedAlbum.date}
            </span>
          </div>

          {selectedAlbum.images && selectedAlbum.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selectedAlbum.images.map((url, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner group relative"
                >
                  <img
                    src={url}
                    alt={`Album photo ${idx + 1}`}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <button
                      onClick={() => handleRemovePhoto(url)}
                      className="bg-red-750 hover:bg-red-850 text-white font-bold text-xs uppercase tracking-wider py-2 px-4 rounded border border-gold/15 transition"
                    >
                      Delete Photo
                    </button>
                  </div>
                  <div className="p-3 text-[10px] text-slate-500 font-semibold truncate">{url}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500 text-xs font-semibold">
              This album is empty. Click "ADD PHOTO TO ALBUM" above to upload photos to R2.
            </div>
          )}
        </div>
      ) : (
        /* Albums Grid List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album._id}
              onClick={() => setSelectedAlbum(album)}
              className="group cursor-pointer bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-md hover:border-gold/30 transition flex flex-col justify-between"
            >
              <div className="aspect-video w-full bg-slate-900 relative">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/75 px-3 py-1 rounded text-[10px] font-extrabold text-gold uppercase tracking-wider">
                  {album.images?.length || 0} Photos
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider">
                    {album.date}
                  </span>
                  <h4 className="font-bold text-white text-base leading-snug mt-1 uppercase tracking-wide group-hover:text-gold transition">
                    {album.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2 line-clamp-2">
                    {album.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-850 pt-4 text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-gold flex items-center gap-1">
                    <FaEye /> VIEW PHOTOS
                  </span>
                  <button
                    onClick={(e) => handleDeleteAlbum(album._id, e)}
                    className="text-red-400 hover:text-red-500 flex items-center gap-1"
                  >
                    <FaTrash /> Delete Album
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Album Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-6 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-extrabold text-base uppercase tracking-widest text-white flex items-center gap-2">
                <FaImages className="text-gold" /> CREATE ALBUM
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateAlbum} className="space-y-5">
              {/* Cover Image Upload */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Album Cover Image (R2 Storage)
                </label>
                <div className="relative border border-slate-800 rounded-lg p-3 bg-slate-950 flex items-center gap-3">
                  {albumForm.coverImage ? (
                    <div className="w-16 h-12 rounded overflow-hidden border border-slate-800 shrink-0">
                      <img
                        src={albumForm.coverImage}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-12 rounded border border-dashed border-slate-800 bg-slate-900/40 flex items-center justify-center text-slate-650 text-[10px]">
                      No Cover
                    </div>
                  )}
                  <div className="flex-grow space-y-1.5">
                    <input
                      type="text"
                      name="coverImage"
                      value={albumForm.coverImage}
                      onChange={(e) => setAlbumForm((p) => ({ ...p, coverImage: e.target.value }))}
                      placeholder="Cover image URL..."
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded transition">
                      <FaUpload /> {uploading ? "Uploading..." : "Browse R2 Cover"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Album Title
                </label>
                <input
                  type="text"
                  required
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Widows Care Outreach 2026"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Outreach Date/Period
                </label>
                <input
                  type="text"
                  required
                  value={albumForm.date}
                  onChange={(e) => setAlbumForm((p) => ({ ...p, date: e.target.value }))}
                  placeholder="e.g. June 2026 or May 2025"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Album Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={albumForm.description}
                  onChange={(e) => setAlbumForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Provide a brief summary of the outreach..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-950 border border-slate-800 text-slate-400 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-lg border border-gold/15 transition"
                >
                  Create Album
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
