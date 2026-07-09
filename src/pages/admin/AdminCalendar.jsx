import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";
import "react-calendar/dist/Calendar.css";
import { isEventOnDate, getEventVenue } from "@/utils/eventHelpers";

export default function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const toast = useToast();

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

  useEffect(() => {
    async function fetchCalendarEvents() {
      try {
        setLoading(true);
        const res = await api.get("/events");
        const eventsData = res.data.data || [];
        setEvents(eventsData);

        // Default the selected date to the first event found, or current date
        if (eventsData.length > 0) {
          const firstEvent = eventsData[0];
          const monthIndex = months.indexOf(firstEvent.month);
          if (monthIndex !== -1) {
            setSelectedDate(new Date(firstEvent.year, monthIndex, firstEvent.day));
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load calendar events");
      } finally {
        setLoading(false);
      }
    }
    fetchCalendarEvents();
  }, []);

  const selectedEvents = events
    .filter((event) => isEventOnDate(event, selectedDate))
    .map((event) => ({
      ...event,
      venue: getEventVenue(event, selectedDate),
    }));

  const getTileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const match = events.find((e) => isEventOnDate(e, date));

    if (match) {
      let dotColor = "bg-[#16A34A]"; // outreach
      if (match.category === "prayer") dotColor = "bg-[#D4AF37]";
      if (match.category === "widows") dotColor = "bg-[#DC2626]";
      if (match.category === "school") dotColor = "bg-[#2563EB]";

      return (
        <div className="flex justify-center mt-1">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        </div>
      );
    }
    return null;
  };

  const getTileClassName = ({ date, view }) => {
    if (view !== "month") return "";

    const match = events.find((e) => isEventOnDate(e, date));

    if (match) {
      return "font-bold text-red-500";
    }
    return "";
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-400 font-bold uppercase tracking-wider animate-pulse">
          Loading calendar events...
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
            MINISTRY CALENDAR
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
            Visual month-by-month representation of all scheduled events in the database.
          </p>
        </div>
        <Link
          to="/admin/events"
          className="bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl flex items-center gap-2 border border-slate-800 transition"
        >
          MANAGE ALL EVENTS <FaExternalLinkAlt className="text-[10px] text-gold" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Monthly Calendar component (col-span-7) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-850">
            <FaCalendarAlt className="text-gold text-lg" />
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-white">
              SELECT EVENT DATE
            </h3>
          </div>

          <div className="calendar-admin-container bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-inner">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={getTileContent}
              tileClassName={getTileClassName}
              className="w-full border-0 font-sans text-slate-350"
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-t border-slate-850 pt-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>Outreach</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>Prayer & Revival</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span>Widows Welfare</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span>School Support</span>
            </div>
          </div>
        </div>

        {/* Right: Date schedule list (col-span-5) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 shadow-md space-y-6 min-h-[400px] flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-200 text-sm uppercase tracking-widest pb-4 border-b border-slate-850">
              Schedule for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>

            <div className="space-y-4 mt-6">
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:bg-slate-900/50 transition"
                  >
                    <span
                      className={`inline-block text-[9px] font-extrabold text-white px-2 py-0.5 rounded uppercase tracking-wider mb-3 ${event.monthColor}`}
                    >
                      {event.category}
                    </span>
                    <h4 className="font-bold text-white text-sm leading-snug mb-3">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="flex flex-col gap-2 border-t border-slate-850 pt-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-slate-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="truncate max-w-xs">{event.venue}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center text-slate-500 space-y-3">
                  <FaCalendarAlt size={32} className="text-slate-700" />
                  <p className="text-xs font-semibold max-w-xs leading-relaxed">
                    No events scheduled on this day. Select highlighted days to view.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
