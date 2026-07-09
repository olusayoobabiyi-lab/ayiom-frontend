import { useState, useEffect } from "react";
import { FaTrash, FaUpload, FaSave, FaPlus } from "react-icons/fa";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";

export default function AdminAbout() {
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchAboutConfig() {
      try {
        setLoading(true);
        const res = await api.get("/about");
        setCarousel(res.data.data?.carousel || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load about page configuration");
      } finally {
        setLoading(false);
      }
    }
    fetchAboutConfig();
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
      const uploadedUrl = res.data.data.imageUrl;
      const updatedCarousel = [...carousel, uploadedUrl];
      setCarousel(updatedCarousel);

      // Auto-save
      await api.put("/about", { carousel: updatedCarousel });
      toast.success("Image uploaded and configuration saved live!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload or configuration save failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (indexToRemove) => {
    const updatedCarousel = carousel.filter((_, idx) => idx !== indexToRemove);
    setCarousel(updatedCarousel);

    try {
      setSaving(true);
      const res = await api.put("/about", { carousel: updatedCarousel });
      setCarousel(res.data.data.carousel || []);
      toast.success("Image removed and configuration saved live!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes automatically after removal");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      const res = await api.put("/about", { carousel });
      setCarousel(res.data.data.carousel || []);
      toast.success("About page configuration saved live!");
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
            ABOUT PAGE BANNER CONFIG
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
            Manage the carousel of random pictures displayed on the About Us page.
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

      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 shadow-md space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-850">
          <h3 className="font-extrabold text-sm uppercase tracking-widest text-white">
            CAROUSEL PICTURES ({carousel.length})
          </h3>

          <label className="cursor-pointer bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg border border-slate-800 transition flex items-center gap-2">
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

        {carousel.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {carousel.map((url, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner group relative"
              >
                <img
                  src={url}
                  alt={`Carousel item ${idx + 1}`}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <button
                    onClick={() => handleRemoveImage(idx)}
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
            No carousel pictures found. Click "Upload Photo to R2" to add pictures to your About Us
            page.
          </div>
        )}
      </div>
    </div>
  );
}
