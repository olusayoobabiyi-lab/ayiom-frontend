import { useState, useEffect, Fragment } from "react";
import {
  FaSearch,
  FaSync,
  FaChevronDown,
  FaChevronUp,
  FaGlobe,
  FaLaptop,
  FaInfoCircle,
} from "react-icons/fa";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [expandedLogId, setExpandedLogId] = useState(null);
  const toast = useToast();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchLogs();
  }, [page, debouncedSearch]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 15,
      };
      if (debouncedSearch) {
        params.search = debouncedSearch;
      }

      const res = await api.get("/activity-logs", { params });
      const { logs: fetchedLogs, pagination } = res.data.data || { logs: [], pagination: {} };

      setLogs(fetchedLogs || []);
      setTotalPages(pagination.pages || 1);
      setTotalLogs(pagination.total || 0);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to retrieve activity logs");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleExpand = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getActionBadgeColor = (action) => {
    const act = action.toUpperCase();
    if (act.includes("LOGIN")) return "bg-green-950/50 text-green-400 border-green-900/50";
    if (act.includes("LOGOUT")) return "bg-yellow-950/50 text-yellow-400 border-yellow-900/50";
    if (act.includes("CREATE")) return "bg-blue-950/50 text-blue-400 border-blue-900/50";
    if (act.includes("DELETE") || act.includes("REMOVE"))
      return "bg-red-950/50 text-red-400 border-red-900/50";
    if (act.includes("UPDATE") || act.includes("EDIT"))
      return "bg-cyan-950/50 text-cyan-400 border-cyan-900/50";
    return "bg-slate-950/50 text-slate-400 border-slate-900/50";
  };

  const getInitials = (name) => {
    if (!name) return "G";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wider text-white">
            ADMIN ACTIVITY LOG
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
            System audit trail. Monitor administrative operations, logins, and configurations.
          </p>
        </div>
        <button
          onClick={fetchLogs}
          className="self-start md:self-auto flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-gold hover:text-white border border-gold/25 hover:border-gold/50 rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
        >
          <FaSync className={`${loading ? "animate-spin" : ""}`} /> Refresh Logs
        </button>
      </div>

      {/* Filters / Search */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 md:p-6 shadow-md">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search by admin name, email, or action performed..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-11 pr-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-gold/50 text-xs md:text-sm transition-all"
          />
        </div>
      </div>

      {/* Logs Table Card */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl shadow-md overflow-hidden">
        {loading && logs.length === 0 ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-xs animate-pulse">
              Retrieving activity logs...
            </p>
          </div>
        ) : logs.length === 0 ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4 text-center p-6">
            <span className="text-4xl text-slate-650">
              <FaInfoCircle />
            </span>
            <div>
              <p className="text-white font-extrabold text-sm uppercase tracking-wider">
                No Activity Logs Found
              </p>
              <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                No administrative activities match your search criteria. Try modifying your filter
                or refreshing the log.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 bg-slate-900/60 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  <th className="py-4.5 px-6">User / Admin</th>
                  <th className="py-4.5 px-6">Action Performed</th>
                  <th className="py-4.5 px-6">Timestamp</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/60">
                {logs.map((log) => {
                  const isExpanded = expandedLogId === log._id;
                  return (
                    <Fragment key={log._id}>
                      {/* Main row */}
                      <tr
                        onClick={() => handleToggleExpand(log._id)}
                        className={`hover:bg-slate-900/40 transition-colors cursor-pointer ${
                          isExpanded ? "bg-slate-900/20" : ""
                        }`}
                      >
                        <td className="py-4.5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gold/15 text-gold border border-gold/20 flex items-center justify-center text-xs font-bold uppercase shadow-inner shrink-0">
                              {getInitials(log.adminName)}
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="text-xs font-bold text-white truncate max-w-[200px] md:max-w-xs">
                                {log.adminName}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold truncate max-w-[200px] md:max-w-xs">
                                {log.adminEmail}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4.5 px-6">
                          <span
                            className={`inline-block px-2.5 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-wider rounded-md border ${getActionBadgeColor(
                              log.action
                            )}`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="py-4.5 px-6 text-slate-450 text-xs font-semibold">
                          {formatTimestamp(log.createdAt)}
                        </td>
                        <td className="py-4.5 px-6 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleExpand(log._id);
                            }}
                            className="text-slate-400 hover:text-white transition-colors p-2 focus:outline-none"
                            aria-label="Toggle details"
                          >
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable details panel */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <tr>
                            <td
                              colSpan="4"
                              className="p-0 bg-slate-900/20 border-b border-slate-850"
                            >
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 py-5 space-y-4 text-xs">
                                  {/* Network Details */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-400">
                                    {log.ipAddress && (
                                      <div className="flex items-center gap-2 bg-slate-950/65 border border-slate-850 rounded-xl p-3">
                                        <FaGlobe className="text-gold shrink-0" />
                                        <div>
                                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                            IP Address
                                          </p>
                                          <p className="font-semibold text-slate-300 mt-0.5">
                                            {log.ipAddress}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    {log.userAgent && (
                                      <div className="flex items-center gap-2 bg-slate-950/65 border border-slate-850 rounded-xl p-3">
                                        <FaLaptop className="text-gold shrink-0" />
                                        <div className="overflow-hidden">
                                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                            User Agent
                                          </p>
                                          <p
                                            className="font-semibold text-slate-300 mt-0.5 truncate"
                                            title={log.userAgent}
                                          >
                                            {log.userAgent}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Action Specific Details Payload */}
                                  <div className="bg-slate-950 border border-slate-850 rounded-xl p-4.5 space-y-2">
                                    <h5 className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                                      Activity Metadata Payload
                                    </h5>
                                    {log.details && Object.keys(log.details).length > 0 ? (
                                      <pre className="bg-slate-900/60 p-3 rounded-lg overflow-x-auto text-[11px] text-emerald-400 font-mono border border-slate-900 mt-1.5 leading-relaxed max-h-48">
                                        {JSON.stringify(log.details, null, 2)}
                                      </pre>
                                    ) : (
                                      <p className="text-slate-550 italic text-[11px] mt-1">
                                        No additional metadata payload stored for this action.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer / Pagination */}
        {logs.length > 0 && (
          <div className="bg-slate-900/40 border-t border-slate-850 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-400">
            <div>
              Showing <span className="text-white">{(page - 1) * 15 + 1}</span> to{" "}
              <span className="text-white">{Math.min(page * 15, totalLogs)}</span> of{" "}
              <span className="text-white">{totalLogs}</span> activity logs
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-850 hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-slate-950 disabled:hover:text-slate-400 text-gold uppercase tracking-wider text-[10px] transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                  .map((p, index, array) => {
                    const showEllipsis = index > 0 && p - array[index - 1] > 1;
                    return (
                      <div key={p} className="flex items-center gap-1">
                        {showEllipsis && <span className="text-slate-650 px-1">...</span>}
                        <button
                          onClick={() => setPage(p)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            page === p
                              ? "bg-maroon text-white border border-gold/25"
                              : "bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-300"
                          }`}
                        >
                          {p}
                        </button>
                      </div>
                    );
                  })}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-850 hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-slate-950 disabled:hover:text-slate-400 text-gold uppercase tracking-wider text-[10px] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
