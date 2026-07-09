import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaVideo,
  FaImages,
  FaInbox,
  FaPlus,
  FaChevronRight,
  FaUserPlus,
  FaHandshake,
} from "react-icons/fa";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    eventsCount: 0,
    sermonsCount: 0,
    albumsCount: 0,
    contactsCount: 0,
    ministryInquiriesCount: 0,
    registrationsCount: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [eventsRes, sermonsRes, albumsRes, contactsRes, ministryRes, regRes] =
          await Promise.all([
            api.get("/events"),
            api.get("/sermons"),
            api.get("/gallery/albums"),
            api.get("/contact"),
            api.get("/ministry"),
            api.get("/registrations"),
          ]);

        const events = eventsRes.data.data || [];
        const sermons = sermonsRes.data.data || [];
        const albums = albumsRes.data.data || [];
        const contacts = contactsRes.data.data || [];
        const ministryInquiries = ministryRes.data.data || [];
        const registrations = regRes.data.data || [];

        setStats({
          eventsCount: events.length,
          sermonsCount: sermons.length,
          albumsCount: albums.length,
          contactsCount: contacts.length,
          ministryInquiriesCount: ministryInquiries.length,
          registrationsCount: registrations.length,
        });

        // Combine and sort recent entries
        const combined = [
          ...contacts.map((c) => ({
            ...c,
            kind: "Contact Message",
            badgeColor: "bg-blue-600/20 text-blue-400",
          })),
          ...ministryInquiries.map((m) => ({
            ...m,
            kind: "Ministry Inquiry",
            badgeColor: "bg-purple-600/20 text-purple-400",
          })),
          ...registrations.map((r) => ({
            ...r,
            name: `${r.firstName} ${r.lastName}`,
            kind: r.type === "member" ? "Membership Form" : "Partnership Form",
            badgeColor:
              r.type === "member" ? "bg-green-600/20 text-green-400" : "bg-gold/20 text-gold",
          })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setRecentInquiries(combined.slice(0, 5));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      label: "Active Events",
      value: stats.eventsCount,
      icon: <FaCalendarAlt />,
      color: "border-green-600/40",
    },
    {
      label: "Sermons (YouTube)",
      value: stats.sermonsCount,
      icon: <FaVideo />,
      color: "border-red-600/40",
    },
    {
      label: "Gallery Albums",
      value: stats.albumsCount,
      icon: <FaImages />,
      color: "border-sky-600/40",
    },
    {
      label: "Pending Messages",
      value: stats.contactsCount + stats.ministryInquiriesCount + stats.registrationsCount,
      icon: <FaInbox />,
      color: "border-gold/40",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-400 font-bold uppercase tracking-wider animate-pulse">
          Loading dashboard statistics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wider text-white">
          DASHBOARD OVERVIEW
        </h1>
        <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
          Welcome, Pastor Taiwo. Here is the current state of your outreach portal.
        </p>
      </div>

      {/* Grid of statistic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className={`bg-slate-950 border-l-4 ${card.color} rounded-xl p-6 shadow-md flex items-center justify-between`}
          >
            <div>
              <p className="text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                {card.label}
              </p>
              <h2 className="text-white text-3xl font-black mt-1 leading-none">{card.value}</h2>
            </div>
            <span className="w-12 h-12 rounded-full bg-slate-900 text-gold flex items-center justify-center text-lg border border-slate-800 shadow-inner">
              {card.icon}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Actions and Inquiries Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Activity/Inquiries Inbox (col-span-8) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex items-center justify-between pb-6 border-b border-slate-850 mb-6">
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-white">
              RECENT SUBMISSIONS & INBOX
            </h3>
            <Link
              to="/admin/inquiries"
              className="text-[10px] font-extrabold uppercase tracking-wider text-gold hover:opacity-85 flex items-center gap-1.5"
            >
              GO TO INBOX <FaChevronRight className="text-[8px]" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((inquiry, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-bold text-white">
                        {inquiry.name || `${inquiry.firstName || ""} ${inquiry.lastName || ""}`}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${inquiry.badgeColor}`}
                      >
                        {inquiry.kind}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate max-w-lg mt-1.5">
                      {inquiry.message ||
                        inquiry.comments ||
                        inquiry.subject ||
                        "No message content."}
                    </p>
                  </div>
                  <div className="text-right text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs font-semibold">
                No recent inquiries or inbox messages found.
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick actions Sidebar (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 shadow-md space-y-6">
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-white pb-4 border-b border-slate-850">
              QUICK ACTIONS
            </h3>

            <div className="space-y-3">
              <Link
                to="/admin/events"
                className="w-full flex items-center justify-between bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-wider p-4 rounded-xl border border-slate-850 transition"
              >
                <span className="flex items-center gap-2.5">
                  <FaCalendarAlt className="text-gold" /> Add New Event
                </span>
                <FaPlus className="text-[10px] text-gold" />
              </Link>

              <Link
                to="/admin/sermons"
                className="w-full flex items-center justify-between bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-wider p-4 rounded-xl border border-slate-850 transition"
              >
                <span className="flex items-center gap-2.5">
                  <FaVideo className="text-gold" /> Add YouTube Sermon
                </span>
                <FaPlus className="text-[10px] text-gold" />
              </Link>

              <Link
                to="/admin/gallery"
                className="w-full flex items-center justify-between bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-wider p-4 rounded-xl border border-slate-850 transition"
              >
                <span className="flex items-center gap-2.5">
                  <FaImages className="text-gold" /> Upload Gallery Album
                </span>
                <FaPlus className="text-[10px] text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
