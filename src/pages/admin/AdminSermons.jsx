import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaVideo, FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";
import { useConfirm } from "@/context/ConfirmContext";

export default function AdminSermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const confirm = useConfirm();

  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    date: "",
    scripture: "",
    description: "",
    videoUrl: "",
    audioUrl: "",
    duration: "",
    thumbnail: "",
    transcript: "",
    notesUrl: "",
  });

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/sermons");
      setSermons(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load sermons list");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    setUploading(true);
    try {
      const res = await api.post("/settings/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, thumbnail: res.data.data.imageUrl }));
      toast.success("Sermon thumbnail uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Thumbnail upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      speaker: "Pastor Taiwo Clement",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      scripture: "",
      description: "",
      videoUrl: "",
      audioUrl: "",
      duration: "",
      thumbnail: "",
      transcript: "",
      notesUrl: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (sermon) => {
    setEditingId(sermon._id);
    setFormData({
      title: sermon.title,
      speaker: sermon.speaker,
      date: sermon.date,
      scripture: sermon.scripture,
      description: sermon.description,
      videoUrl: sermon.videoUrl,
      audioUrl: sermon.audioUrl || "",
      duration: sermon.duration || "",
      thumbnail: sermon.thumbnail || "",
      transcript: sermon.transcript || "",
      notesUrl: sermon.notesUrl || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.speaker ||
      !formData.date ||
      !formData.scripture ||
      !formData.videoUrl ||
      !formData.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/sermons/${editingId}`, formData);
        toast.success("Sermon updated successfully!");
      } else {
        await api.post("/sermons", formData);
        toast.success("Sermon created successfully!");
      }
      setModalOpen(false);
      fetchSermons();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save sermon");
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm({
      title: "Delete Sermon",
      message: "Are you sure you want to delete this sermon?",
      confirmText: "Delete",
      isDanger: true,
    });
    if (!isConfirmed) return;

    try {
      await api.delete(`/sermons/${id}`);
      toast.success("Sermon deleted successfully!");
      fetchSermons();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete sermon");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-400 font-bold uppercase tracking-wider animate-pulse">
          Loading sermons data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wider text-white">
            SERMONS MANAGER
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
            Publish YouTube video sermons, scriptures, transcripts, and downloadable study notes.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl flex items-center gap-2 border border-gold/15 transition"
        >
          <FaPlus className="text-gold" /> ADD NEW SERMON
        </button>
      </div>

      {/* Sermons grid */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 shadow-md">
        <h3 className="font-extrabold text-sm uppercase tracking-widest text-white pb-6 border-b border-slate-850 mb-6">
          PUBLISHED SERMONS ({sermons.length})
        </h3>

        {sermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
              <div
                key={sermon._id}
                className="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-video w-full bg-slate-950 relative">
                  {sermon.thumbnail ? (
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-650 gap-2 bg-slate-900/60">
                      <FaVideo size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        No Thumbnail
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/85 px-2 py-0.5 rounded text-[9px] font-bold text-slate-350">
                    {sermon.duration || "N/A"}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider">
                      {sermon.speaker} — {sermon.date}
                    </span>
                    <h4 className="font-bold text-white text-sm leading-snug mt-1.5 line-clamp-2">
                      {sermon.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">
                      {sermon.scripture}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-850 pt-3 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-slate-550 truncate max-w-[120px]">{sermon.videoUrl}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(sermon)}
                        className="text-slate-400 hover:text-gold transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sermon._id)}
                        className="text-red-400 hover:text-red-500 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 text-xs font-semibold">
            No sermons published. Click "ADD NEW SERMON" to publish study resources.
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-6 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-extrabold text-base uppercase tracking-widest text-white flex items-center gap-2">
                <FaVideo className="text-gold" />{" "}
                {editingId ? "EDIT SERMON RECORD" : "PUBLISH NEW SERMON"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Thumbnail Image */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Sermon Thumbnail Image (R2 Storage)
                </label>
                <div className="relative border border-slate-800 rounded-lg p-4 bg-slate-950 flex flex-col sm:flex-row items-center gap-4">
                  {formData.thumbnail ? (
                    <div className="w-24 h-16 rounded overflow-hidden border border-slate-800 bg-slate-900">
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-16 rounded border border-dashed border-slate-800 bg-slate-900/40 flex items-center justify-center text-slate-650 text-xs">
                      No Image
                    </div>
                  )}
                  <div className="flex-grow space-y-2">
                    <input
                      type="text"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleInputChange}
                      placeholder="Or enter R2 image URL here..."
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded transition">
                      <FaUpload /> {uploading ? "Uploading..." : "Upload Photo to R2"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Title & Speaker Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Sermon Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Walking in Divine Faith & Power"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Preacher/Speaker
                  </label>
                  <input
                    type="text"
                    name="speaker"
                    required
                    value={formData.speaker}
                    onChange={handleInputChange}
                    placeholder="e.g. Pastor Taiwo Clement"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Date & Scripture Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Preaching Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g. June 28, 2026"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Scripture Reference
                  </label>
                  <input
                    type="text"
                    name="scripture"
                    required
                    value={formData.scripture}
                    onChange={handleInputChange}
                    placeholder="e.g. Hebrews 11:1-6"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Video URL & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    YouTube Video Embed Link
                  </label>
                  <input
                    type="text"
                    name="videoUrl"
                    required
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="e.g. https://www.youtube.com/embed/M7lc1UVf-VE"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Duration (Min/Sec)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 45:20"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Audio URL & Notes URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Audio MP3 Link (Optional)
                  </label>
                  <input
                    type="text"
                    name="audioUrl"
                    value={formData.audioUrl}
                    onChange={handleInputChange}
                    placeholder="e.g. MP3 URL"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Sermon Notes Download Link (Optional)
                  </label>
                  <input
                    type="text"
                    name="notesUrl"
                    value={formData.notesUrl}
                    onChange={handleInputChange}
                    placeholder="e.g. PDF link or URL"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Summarize the core message of the sermon..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              {/* Transcript */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Sermon Transcript / Notes Text (Optional)
                </label>
                <textarea
                  name="transcript"
                  rows={4}
                  value={formData.transcript}
                  onChange={handleInputChange}
                  placeholder="Write the introduction or complete sermon manuscript..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              <div className="flex justify-end gap-4 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-950 border border-slate-800 text-slate-400 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg border border-gold/15 transition"
                >
                  {editingId ? "Update Sermon" : "Publish Sermon"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
