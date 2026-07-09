import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaUpload, FaSave, FaCross, FaEdit, FaArrowUp, FaArrowDown } from "react-icons/fa";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";

export default function AdminHomepage() {
  const [heroCarousel, setHeroCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const toast = useToast();

  const [newSlide, setNewSlide] = useState({
    image: "",
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    async function fetchHomepageConfig() {
      try {
        setLoading(true);
        const res = await api.get("/homepage");
        setHeroCarousel(res.data.data?.heroCarousel || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load homepage carousel configuration");
      } finally {
        setLoading(false);
      }
    }
    fetchHomepageConfig();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await api.post("/settings/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewSlide((prev) => ({ ...prev, image: res.data.data.imageUrl }));
      toast.success("Image uploaded to Cloudflare R2 successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAddSlide = async () => {
    if (!newSlide.image) {
      toast.error("Please upload an image for the slide");
      return;
    }

    const updatedCarousel = [...heroCarousel, newSlide];
    setHeroCarousel(updatedCarousel);
    setNewSlide({ image: "", title: "", subtitle: "" });

    try {
      setSaving(true);
      const res = await api.put("/homepage", { heroCarousel: updatedCarousel });
      setHeroCarousel(res.data.data.heroCarousel || []);
      toast.success("Slide added and configuration saved live!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes automatically");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveSlide = async (indexToRemove) => {
    if (editingIndex === indexToRemove) {
      setEditingIndex(null);
      setNewSlide({ image: "", title: "", subtitle: "" });
    } else if (editingIndex > indexToRemove) {
      setEditingIndex((prev) => prev - 1);
    }

    const updatedCarousel = heroCarousel.filter((_, idx) => idx !== indexToRemove);
    setHeroCarousel(updatedCarousel);
 
    try {
      setSaving(true);
      const res = await api.put("/homepage", { heroCarousel: updatedCarousel });
      setHeroCarousel(res.data.data.heroCarousel || []);
      toast.success("Slide removed and configuration saved live!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes automatically after removal");
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = (index) => {
    setEditingIndex(index);
    setNewSlide({
      image: heroCarousel[index].image || "",
      title: heroCarousel[index].title || "",
      subtitle: heroCarousel[index].subtitle || "",
    });
  };

  const handleUpdateSlide = async () => {
    if (!newSlide.image) {
      toast.error("Please upload or provide an image for the slide");
      return;
    }

    const updatedCarousel = [...heroCarousel];
    updatedCarousel[editingIndex] = newSlide;
    setHeroCarousel(updatedCarousel);
    setNewSlide({ image: "", title: "", subtitle: "" });
    setEditingIndex(null);

    try {
      setSaving(true);
      const res = await api.put("/homepage", { heroCarousel: updatedCarousel });
      setHeroCarousel(res.data.data.heroCarousel || []);
      toast.success("Slide updated and configuration saved live!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save updated configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewSlide({ image: "", title: "", subtitle: "" });
  };

  const handleMoveSlide = async (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === heroCarousel.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updatedCarousel = [...heroCarousel];

    const temp = updatedCarousel[index];
    updatedCarousel[index] = updatedCarousel[targetIndex];
    updatedCarousel[targetIndex] = temp;

    if (editingIndex === index) {
      setEditingIndex(targetIndex);
    } else if (editingIndex === targetIndex) {
      setEditingIndex(index);
    }

    setHeroCarousel(updatedCarousel);

    try {
      setSaving(true);
      const res = await api.put("/homepage", { heroCarousel: updatedCarousel });
      setHeroCarousel(res.data.data.heroCarousel || []);
      toast.success("Slides reordered and configuration saved live!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save reordered configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      const res = await api.put("/homepage", { heroCarousel });
      setHeroCarousel(res.data.data.heroCarousel || []);
      toast.success("Homepage configuration saved live!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-400 font-bold uppercase tracking-wider animate-pulse">
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wider text-white">
            HOMEPAGE BANNER CONFIG
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
            Upload new banner slides and change the text overlay on the Hero carousel section.
          </p>
        </div>
        <button
          onClick={handleSaveConfig}
          disabled={saving}
          className="bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl flex items-center gap-2 border border-gold/15 transition disabled:opacity-50"
        >
          <FaSave className="text-sm text-gold" />{" "}
          {saving ? "SAVING CHANGES..." : "SAVE CONFIGURATION"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Slides list (col-span-7) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
          <h3 className="font-extrabold text-sm uppercase tracking-widest text-white pb-4 border-b border-slate-850">
            CURRENT BANNER SLIDES ({heroCarousel.length})
          </h3>

          <div className="space-y-6">
            {heroCarousel.length > 0 ? (
              heroCarousel.map((slide, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch"
                >
                  <div className="w-full md:w-44 h-32 md:h-auto shrink-0 bg-slate-950 relative">
                    <img
                      src={slide.image}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-bold text-gold">
                      SLIDE {idx + 1}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        {slide.title || "No Title"}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium mt-1">
                        {slide.subtitle || "No Subtitle"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                      <span className="text-[10px] text-slate-500 font-bold truncate max-w-[120px] md:max-w-xs">
                        {slide.image}
                      </span>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        {idx > 0 && (
                          <button
                            onClick={() => handleMoveSlide(idx, "up")}
                            className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center p-1.5 rounded bg-slate-950 border border-slate-850 hover:bg-slate-900 transition"
                            title="Move Up"
                          >
                            <FaArrowUp />
                          </button>
                        )}
                        {idx < heroCarousel.length - 1 && (
                          <button
                            onClick={() => handleMoveSlide(idx, "down")}
                            className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center p-1.5 rounded bg-slate-950 border border-slate-850 hover:bg-slate-900 transition"
                            title="Move Down"
                          >
                            <FaArrowDown />
                          </button>
                        )}
                        <button
                          onClick={() => handleStartEdit(idx)}
                          className="text-gold hover:text-yellow-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleRemoveSlide(idx)}
                          className="text-red-400 hover:text-red-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs font-semibold">
                No hero slides defined. Click "Add Slide" to build your banner carousel.
              </div>
            )}
          </div>
        </div>

        {/* Right: Add new slide form (col-span-5) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
          <h3 className="font-extrabold text-sm uppercase tracking-widest text-white pb-4 border-b border-slate-850">
            {editingIndex !== null ? `EDIT BANNER SLIDE (SLIDE ${editingIndex + 1})` : "ADD NEW BANNER SLIDE"}
          </h3>

          <div className="space-y-5">
            {/* File selection box */}
            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                Slide Image File
              </label>
              <div className="relative border-2 border-dashed border-slate-800 hover:border-gold/30 rounded-xl p-6 flex flex-col items-center justify-center text-center transition bg-slate-900/30">
                {newSlide.image ? (
                  <div className="space-y-4">
                    <img
                      src={newSlide.image}
                      alt="Upload Preview"
                      className="max-h-32 object-contain rounded border border-slate-800"
                    />
                    <p className="text-[10px] text-emerald-400 font-bold">
                      Image Uploaded Successfully
                    </p>
                    <button
                      onClick={() => setNewSlide((p) => ({ ...p, image: "" }))}
                      className="text-xs text-red-400 hover:text-red-500 font-bold uppercase"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <>
                    <FaUpload className="text-slate-600 text-3xl mb-3" />
                    <p className="text-xs text-slate-500 font-semibold mb-2">
                      JPEG, PNG formats up to 10MB
                    </p>
                    <label className="cursor-pointer bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded border border-slate-800 transition">
                      {uploading ? "Uploading..." : "Browse Local File"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Slide Title */}
            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                Overlay Header Title
              </label>
              <input
                type="text"
                value={newSlide.title}
                onChange={(e) => setNewSlide((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. AMEND YOUR WAYS"
                className="w-full bg-slate-900 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
              />
            </div>

            {/* Slide Subtitle */}
            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                Overlay Subtitle Description
              </label>
              <input
                type="text"
                value={newSlide.subtitle}
                onChange={(e) => setNewSlide((p) => ({ ...p, subtitle: e.target.value }))}
                placeholder="e.g. International Outreach Ministry"
                className="w-full bg-slate-900 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
              />
            </div>

            {editingIndex !== null ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleUpdateSlide}
                  className="w-full bg-gold hover:bg-yellow-600 text-slate-950 font-bold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 border border-gold/15 transition"
                >
                  <FaSave className="text-slate-950" /> UPDATE SLIDE IN CAROUSEL
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800 transition"
                >
                  CANCEL EDIT
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddSlide}
                className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 border border-slate-800 transition"
              >
                <FaPlus className="text-gold" /> ADD SLIDE TO STAGING
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
