import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import api from "@/services/api";

const CalendarWidget = () => {
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    async function fetchCalendarEvents() {
      try {
        const res = await api.get("/events");
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("Failed to load events for calendar widget:", err);
      }
    }
    fetchCalendarEvents();
  }, []);

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

  const getTileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const match = events.find((e) => {
      const eMonthIdx = months.indexOf(e.month);
      return e.day === day && e.year === year && eMonthIdx === month;
    });

    if (match) {
      let categoryClass = "calendar-dot--outreach";
      if (match.category === "prayer") categoryClass = "calendar-dot--prayer";
      if (match.category === "widows") categoryClass = "calendar-dot--widows";
      if (match.category === "school") categoryClass = "calendar-dot--school";

      return (
        <div className="calendar-dot-container">
          <span className={`calendar-dot ${categoryClass}`} />
        </div>
      );
    }
    return null;
  };

  const getTileClassName = ({ date, view }) => {
    if (view !== "month") return "";

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const match = events.find((e) => {
      const eMonthIdx = months.indexOf(e.month);
      return e.day === day && e.year === year && eMonthIdx === month;
    });

    if (match) {
      if (match.category === "outreach") return "font-bold text-green-700";
      if (match.category === "prayer") return "font-bold text-yellow-600";
      if (match.category === "widows") return "font-bold text-red-650";
      if (match.category === "school") return "font-bold text-blue-600";
    }
    return "";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      {/* Header Banner */}
      <div className="bg-[#1E293B] text-white p-4 flex items-center gap-3">
        <FaCalendarAlt className="text-lg text-gold" />
        <h3 className="text-sm font-extrabold uppercase tracking-widest">
          MINISTRY EVENT CALENDAR
        </h3>
      </div>

      {/* Calendar Component */}
      <div className="p-4 flex-grow flex items-center justify-center">
        <Calendar
          onChange={setValue}
          value={value}
          tileContent={getTileContent}
          tileClassName={getTileClassName}
          className="w-full border-0 font-sans"
        />
      </div>

      {/* Legend Block */}
      <div className="border-t border-slate-100 p-4 bg-slate-50/50">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
            <span>Outreach</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            <span>Prayer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
            <span>Widows</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
            <span>Back to School</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
