import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";

const CalendarWidget = () => {
  // Start calendar in May 2025 to match the design's "May – June 2025" view
  const [value, setValue] = useState(new Date(2025, 4, 18));

  const getTileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const day = date.getDate();
    const month = date.getMonth(); // 0-indexed (4 = May, 5 = June, 7 = August)
    const year = date.getFullYear();

    // Check dates in 2025
    if (year === 2025) {
      if (month === 4 && day === 18) {
        return (
          <div className="calendar-dot-container">
            <span className="calendar-dot calendar-dot--outreach" />
          </div>
        );
      }
      if (month === 4 && day === 29) {
        return (
          <div className="calendar-dot-container">
            <span className="calendar-dot calendar-dot--prayer" />
          </div>
        );
      }
      if (month === 5 && day === 15) {
        return (
          <div className="calendar-dot-container">
            <span className="calendar-dot calendar-dot--widows" />
          </div>
        );
      }
      if (month === 7 && day === 23) {
        return (
          <div className="calendar-dot-container">
            <span className="calendar-dot calendar-dot--school" />
          </div>
        );
      }
    }
    return null;
  };

  const getTileClassName = ({ date, view }) => {
    if (view !== "month") return "";
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (year === 2025) {
      if (month === 4 && day === 18) return "font-bold text-green-700";
      if (month === 4 && day === 29) return "font-bold text-yellow-600";
      if (month === 5 && day === 15) return "font-bold text-red-600";
      if (month === 7 && day === 23) return "font-bold text-blue-600";
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
