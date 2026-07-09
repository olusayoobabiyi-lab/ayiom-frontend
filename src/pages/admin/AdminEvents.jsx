import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaCalendarAlt, FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";
import { useConfirm } from "@/context/ConfirmContext";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const confirm = useConfirm();

  const [formData, setFormData] = useState({
    day: 1,
    month: "MAY",
    year: 2025,
    category: "outreach",
    title: "",
    venue: "",
    time: "",
    description: "",
    details: "",
    image: "",
  });

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const categories = [
    { value: "outreach", label: "Outreach" },
    { value: "prayer", label: "Prayer & Revival" },
    { value: "widows", label: "Widows Welfare" },
    { value: "school", label: "School Support" },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/events");
      setEvents(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events list");
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
      setFormData((prev) => ({ ...prev, image: res.data.data.imageUrl }));
      toast.success("Event image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "day" || name === "year" || name === "endDay" || name === "endYear"
            ? parseInt(value, 10) || ""
            : value,
    }));
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      day: new Date().getDate(),
      month: months[new Date().getMonth()],
      year: new Date().getFullYear(),
      category: "outreach",
      title: "",
      venue: "",
      time: "",
      description: "",
      details: "",
      image: "",
      isMultiDay: false,
      endDay: new Date().getDate(),
      endMonth: months[new Date().getMonth()],
      endYear: new Date().getFullYear(),
      isRecurring: false,
      recurrencePattern: "none",
      overridesText: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingId(event._id);
    const oText = (event.recurrenceVenueOverrides || [])
      .map((o) => `${o.dateKey}: ${o.venue}`)
      .join("\n");
    setFormData({
      day: event.day,
      month: event.month,
      year: event.year,
      category: event.category,
      title: event.title,
      venue: event.venue,
      time: event.time,
      description: event.description,
      details: event.details,
      image: event.image || "",
      isMultiDay: event.isMultiDay || false,
      endDay: event.endDay || event.day,
      endMonth: event.endMonth || event.month,
      endYear: event.endYear || event.year,
      isRecurring: event.isRecurring || false,
      recurrencePattern: event.recurrencePattern || "none",
      overridesText: oText,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.venue ||
      !formData.time ||
      !formData.description ||
      !formData.details
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const parsedOverrides = (formData.overridesText || "")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.includes(":"))
      .map((line) => {
        const [dateKey, ...venueParts] = line.split(":");
        return {
          dateKey: dateKey.trim(),
          venue: venueParts.join(":").trim(),
        };
      });

    const submitData = {
      ...formData,
      recurrenceVenueOverrides: parsedOverrides,
    };
    delete submitData.overridesText;

    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, submitData);
        toast.success("Event updated successfully!");
      } else {
        await api.post("/events", submitData);
        toast.success("Event created successfully!");
      }
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save event");
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm({
      title: "Delete Event",
      message: "Are you sure you want to delete this event?",
      confirmText: "Delete",
      isDanger: true,
    });
    if (!isConfirmed) return;

    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-400 font-bold uppercase tracking-wider animate-pulse">
          Loading events data...
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
            EVENTS MANAGER
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
            Create, update, and delete events. All events automatically sync with the Homepage and
            Calendar.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl flex items-center gap-2 border border-gold/15 transition"
        >
          <FaPlus className="text-gold" /> ADD NEW EVENT
        </button>
      </div>

      {/* Events table */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-md">
        <div className="p-6 border-b border-slate-850">
          <h3 className="font-extrabold text-sm uppercase tracking-widest text-white">
            SCHEDULED EVENTS ({events.length})
          </h3>
        </div>

        {events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 font-extrabold uppercase tracking-wider">
                  <th className="p-5">Date</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Event Title</th>
                  <th className="p-5">Venue</th>
                  <th className="p-5">Time</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/60">
                {events.map((event) => (
                  <tr
                    key={event._id}
                    className="hover:bg-slate-900/30 transition-all font-medium text-slate-300"
                  >
                    <td className="p-5 font-bold text-white whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span>
                          {event.day} {event.month} {event.year}
                        </span>
                        {event.isRecurring && (
                          <span className="text-[9px] text-gold font-extrabold uppercase tracking-wide">
                            🔁 Recurring
                          </span>
                        )}
                        {event.isMultiDay && (
                          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">
                            📅 Multi-day
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-5 whitespace-nowrap">
                      <span
                        className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                          event.category === "outreach"
                            ? "bg-green-600/20 text-green-400"
                            : event.category === "prayer"
                              ? "bg-yellow-600/20 text-yellow-400"
                              : event.category === "widows"
                                ? "bg-red-600/20 text-red-400"
                                : "bg-blue-600/20 text-blue-400"
                        }`}
                      >
                        {event.category}
                      </span>
                    </td>
                    <td className="p-5 font-bold text-white max-w-xs truncate">{event.title}</td>
                    <td className="p-5 truncate max-w-[150px]">{event.venue}</td>
                    <td className="p-5 whitespace-nowrap">{event.time}</td>
                    <td className="p-5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="bg-slate-900 hover:bg-slate-800 hover:text-gold border border-slate-800 text-slate-400 p-2.5 rounded-lg transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="bg-slate-900 hover:bg-red-950/40 hover:text-red-400 border border-slate-800 text-slate-400 p-2.5 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 text-xs font-semibold">
            No events scheduled. Click "Add New Event" to start scheduling.
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
                <FaCalendarAlt className="text-gold" /> {editingId ? "EDIT EVENT" : "ADD NEW EVENT"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Image */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Event Image Banner (R2 Storage)
                </label>
                <div className="relative border border-slate-800 rounded-lg p-4 bg-slate-950 flex flex-col sm:flex-row items-center gap-4">
                  {formData.image ? (
                    <div className="w-24 h-16 rounded overflow-hidden border border-slate-800 bg-slate-900">
                      <img
                        src={formData.image}
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
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Or enter R2 image URL here..."
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded transition">
                      <FaUpload /> {uploading ? "Uploading..." : "Upload Image to R2"}
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

              {/* Title */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Outreach to Rural Community"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              {/* Date & Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Day
                  </label>
                  <input
                    type="number"
                    name="day"
                    required
                    min={1}
                    max={31}
                    value={formData.day}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Month
                  </label>
                  <select
                    name="month"
                    required
                    value={formData.month}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none transition font-medium"
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none transition font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Multi-day Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isMultiDay"
                  name="isMultiDay"
                  checked={formData.isMultiDay}
                  onChange={handleInputChange}
                  className="rounded bg-slate-950 border-slate-800 text-gold focus:ring-0 focus:ring-offset-0"
                />
                <label
                  htmlFor="isMultiDay"
                  className="text-slate-400 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Event spans multiple days
                </label>
              </div>

              {/* End Date Grid (Only if multi-day is checked) */}
              {formData.isMultiDay && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-4 bg-slate-950/40 border border-slate-800 rounded-xl">
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                      End Day
                    </label>
                    <input
                      type="number"
                      name="endDay"
                      required
                      min={1}
                      max={31}
                      value={formData.endDay}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                      End Month
                    </label>
                    <select
                      name="endMonth"
                      required
                      value={formData.endMonth}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none transition font-medium"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                      End Year
                    </label>
                    <input
                      type="number"
                      name="endYear"
                      required
                      value={formData.endYear}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white focus:outline-none transition"
                    />
                  </div>
                </div>
              )}

              {/* Recurring Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isRecurring"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleInputChange}
                  className="rounded bg-slate-950 border-slate-800 text-gold focus:ring-0 focus:ring-offset-0"
                />
                <label
                  htmlFor="isRecurring"
                  className="text-slate-400 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  This is a recurring program
                </label>
              </div>

              {/* Recurring settings (Only if recurring is checked) */}
              {formData.isRecurring && (
                <div className="space-y-4 p-4 bg-slate-950/40 border border-slate-800 rounded-xl">
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                      Recurrence Pattern
                    </label>
                    <select
                      name="recurrencePattern"
                      value={formData.recurrencePattern}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none transition font-medium"
                    >
                      <option value="none">Select pattern...</option>
                      <option value="weekly">Every Week (on same weekday)</option>
                      <option value="monthly">Every Month (on same day)</option>
                      <option value="monthly_last_saturday">Last Saturday of the Month</option>
                      <option value="monthly_first_friday">First Friday of the Month</option>
                      <option value="monthly_first_sunday">First Sunday of the Month</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                      Venue Overrides (one per line, e.g. YYYY-MM-DD: Special Venue)
                    </label>
                    <textarea
                      name="overridesText"
                      rows={3}
                      value={formData.overridesText}
                      onChange={handleInputChange}
                      placeholder="e.g. 2026-07-25: Community Center Hall B&#10;2026-08-29: Main Sanctuary"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-650 focus:outline-none transition"
                    />
                  </div>
                </div>
              )}

              {/* Venue & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Venue Location
                  </label>
                  <input
                    type="text"
                    name="venue"
                    required
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="e.g. Rural Community Centre"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Time Schedule
                  </label>
                  <input
                    type="text"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g. 9:00 AM - 2:00 PM"
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
                  placeholder="Summarize the event in one brief sentence..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              {/* Full Details */}
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Full Event Details
                </label>
                <textarea
                  name="details"
                  required
                  rows={5}
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Provide comprehensive details about the event schedule, distributions, volunteer requirements..."
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
                  {editingId ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
