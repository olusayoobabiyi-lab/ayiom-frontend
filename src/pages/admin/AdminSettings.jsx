import { useState, useEffect } from "react";
import { FaUserPlus, FaUserShield, FaEnvelope, FaCalendarAlt, FaUser, FaKey } from "react-icons/fa";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function AdminSettings() {
  const { user } = useAuth();
  const toast = useToast();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/admins");
      setAdmins(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load administrators list");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/auth/create-admin", { name, email, password, role });
      toast.success("New administrator account created successfully!");
      setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "admin" });
      fetchAdmins(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create administrator account");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wider text-white">
          ADMIN ACCOUNTS & PROFILE
        </h1>
        <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
          Manage administrator accounts, add new managers, and view account configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left side: Profile Card & Admin creation form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Active Profile Info */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-md">
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-white flex items-center gap-2 border-b border-slate-850 pb-4">
              <FaUserShield className="text-gold" /> PROFILE DETAILS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                  FULL NAME
                </span>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <FaUser className="text-slate-400 text-xs" /> {user?.name || "Administrator"}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                  EMAIL ADDRESS
                </span>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <FaEnvelope className="text-slate-400 text-xs" /> {user?.email || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                  ACCOUNT ROLE
                </span>
                <p className="text-sm font-bold text-gold flex items-center gap-2 uppercase tracking-wide">
                  <FaKey className="text-gold text-xs" /> {user?.role || "Admin"}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                  DATE CREATED
                </span>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <FaCalendarAlt className="text-slate-400 text-xs" />{" "}
                  {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Create New Admin Form */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-md">
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-white flex items-center gap-2 border-b border-slate-850 pb-4">
              <FaUserPlus className="text-gold" /> CREATE NEW ADMINISTRATOR
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Admin Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Pastor Taiwo"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. admin@ayiom.org"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Account Role
                </label>
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none transition font-medium"
                >
                  <option value="admin">Admin (Restricted Panel)</option>
                  <option value="system_admin">System Admin (Full Access)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min 6 characters..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repeat password..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-gold/45 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl border border-gold/15 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaUserPlus className="text-gold" />{" "}
                  {submitting ? "CREATING ACCOUNT..." : "CREATE ADMIN ACCOUNT"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side: Active Admins List */}
        <div className="lg:col-span-5">
          <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-md">
            <div className="p-6 border-b border-slate-850">
              <h3 className="font-extrabold text-sm uppercase tracking-widest text-white">
                ACTIVE ADMINISTRATORS ({admins.length})
              </h3>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500 text-xs font-semibold animate-pulse">
                Loading accounts...
              </div>
            ) : admins.length > 0 ? (
              <div className="divide-y divide-slate-850/60 max-h-[500px] overflow-y-auto">
                {admins.map((adm) => (
                  <div
                    key={adm._id}
                    className="p-5 flex items-center justify-between gap-4 hover:bg-slate-900/10 transition"
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-white truncate">{adm.name}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{adm.email}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="inline-block text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider bg-gold/10 text-gold border border-gold/20">
                        {adm.role}
                      </span>
                      <p className="text-[9px] text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                        Joined {formatDate(adm.createdAt).split(",")[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs font-semibold">
                No administrators registered.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
