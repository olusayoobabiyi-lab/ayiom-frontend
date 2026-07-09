import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaVideo,
  FaImages,
  FaInbox,
  FaSignOutAlt,
  FaTools,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaCross,
  FaSun,
  FaMoon,
  FaUserCog,
  FaHistory,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useTheme } from "@/context/ThemeContext";
import { ROUTES } from "@/constants/routes";
import { STORAGE_KEYS } from "@/constants/storage";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Security route guard check
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token || !user || (user.role !== "admin" && user.role !== "system_admin")) {
      navigate(ROUTES.ADMIN_LOGIN);
      return;
    }

    const systemAdminPaths = [
      ROUTES.ADMIN_HOMEPAGE,
      ROUTES.ADMIN_ABOUT,
      ROUTES.ADMIN_SETTINGS,
      ROUTES.ADMIN_ACTIVITY_LOG,
    ];
    if (systemAdminPaths.includes(location.pathname) && user.role !== "system_admin") {
      toast.error("You do not have permission to access this page.");
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [user, location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    logout();
    toast.success("Logged out successfully");
    navigate(ROUTES.ADMIN_LOGIN);
  };

  const menuItems = [
    { label: "Dashboard Overview", path: ROUTES.ADMIN_DASHBOARD, icon: <FaHome /> },
    {
      label: "Homepage Carousel",
      path: ROUTES.ADMIN_HOMEPAGE,
      icon: <FaTools />,
      systemAdminOnly: true,
    },
    {
      label: "About Carousel",
      path: ROUTES.ADMIN_ABOUT,
      icon: <FaInfoCircle />,
      systemAdminOnly: true,
    },
    { label: "Events Manager", path: ROUTES.ADMIN_EVENTS, icon: <FaCalendarAlt /> },
    { label: "Sermons (YouTube)", path: ROUTES.ADMIN_SERMONS, icon: <FaVideo /> },
    { label: "Gallery Albums", path: ROUTES.ADMIN_GALLERY, icon: <FaImages /> },
    { label: "Inbox & Inquiries", path: ROUTES.ADMIN_INQUIRIES, icon: <FaInbox /> },
    {
      label: "Admin Settings",
      path: ROUTES.ADMIN_SETTINGS,
      icon: <FaUserCog />,
      systemAdminOnly: true,
    },
    {
      label: "Activity Log",
      path: ROUTES.ADMIN_ACTIVITY_LOG,
      icon: <FaHistory />,
      systemAdminOnly: true,
    },
  ];

  const visibleMenuItems = menuItems.filter(
    (item) => !item.systemAdminOnly || user?.role === "system_admin"
  );

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans admin-layout-wrapper">
      {/* Mobile Top Header */}
      <header className="lg:hidden w-full h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 fixed top-0 left-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-gold text-sm">
            <FaCross />
          </span>
          <span className="font-extrabold text-xs tracking-wider uppercase text-white">
            AYW ADMIN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-gold text-sm focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={toggleSidebar} className="text-gold text-lg focus:outline-none">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Sidebar navigation */}
      <aside
        className={`w-64 bg-slate-950 border-r border-slate-850 flex flex-col fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand header */}
        <div className="h-20 border-b border-slate-850 flex items-center gap-3 px-6 shrink-0">
          <span className="w-8 h-8 rounded-full bg-maroon/30 text-gold flex items-center justify-center text-sm border border-gold/25 shadow-inner">
            <FaCross />
          </span>
          <div>
            <h3 className="font-extrabold text-xs tracking-widest text-white uppercase">
              AMEND YOUR WAYS
            </h3>
            <p className="text-gold text-[9px] font-bold uppercase tracking-wider mt-0.5">
              Control Panel
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow py-6 px-4 space-y-1.5 overflow-y-auto mt-16 lg:mt-0">
          {visibleMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-maroon text-white border border-gold/15 shadow-md"
                    : "text-slate-450 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <span className={`text-sm ${isActive ? "text-gold" : "text-slate-500"}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-850 shrink-0">
          <div className="flex items-center gap-3 px-2 py-3 mb-3 bg-slate-900/40 rounded-lg border border-slate-900">
            <div className="w-9 h-9 rounded-full bg-gold/15 text-gold font-bold flex items-center justify-center text-xs uppercase shadow-inner">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                : "AD"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {user?.name || "Administrator"}
              </p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider truncate">
                System Admin
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 hover:text-white text-slate-400 font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg border border-slate-850 transition mb-2"
          >
            {theme === "dark" ? (
              <>
                <FaSun className="text-gold" /> LIGHT MODE
              </>
            ) : (
              <>
                <FaMoon className="text-gold" /> DARK MODE
              </>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-950/40 hover:text-red-400 text-slate-400 font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg border border-slate-850 hover:border-red-950 transition"
          >
            <FaSignOutAlt /> SIGN OUT
          </button>
        </div>
      </aside>

      {/* Main dashboard content container */}
      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto h-screen pt-16 lg:pt-0 admin-main-content">
        <div className="flex-grow p-6 md:p-10 lg:p-12 max-w-[1700px] w-full mx-auto space-y-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
