import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaCross } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import api from "@/services/api";
import { STORAGE_KEYS } from "@/constants/storage";
import { ROUTES } from "@/constants/routes";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.role === "admin") {
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user: loggedUser } = response.data.data;

      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(loggedUser));

      login(token, loggedUser);
      toast.success("Welcome back, Pastor Taiwo!");
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-12 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-maroon/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <span className="w-12 h-12 rounded-full bg-maroon/30 text-gold flex items-center justify-center text-xl border border-gold/30 mb-3 shadow-inner">
            <FaCross />
          </span>
          <h2 className="text-white font-extrabold text-xl tracking-wider uppercase">
            AMEND YOUR WAYS
          </h2>
          <p className="text-gold text-[10px] font-bold tracking-widest uppercase mt-1">
            Ministry Portal Control Room
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 text-xs">
                <FaEnvelope />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@amendyourways.org"
                className="w-full bg-slate-950 border border-slate-800 focus:border-gold/50 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              Secret Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 text-xs">
                <FaLock />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-gold/50 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-maroon hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-lg flex items-center justify-center gap-2 border border-gold/20 shadow-md transition disabled:opacity-50 mt-4"
          >
            {loading ? "Authenticating..." : "SECURE LOGIN"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
