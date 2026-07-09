import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import MissionPage from "@/pages/MissionPage";
import MinistryPage from "@/pages/MinistryPage";
import MinistryDetailPage from "@/pages/MinistryDetailPage";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import CalendarPage from "@/pages/CalendarPage";
import SermonsPage from "@/pages/SermonsPage";
import SermonDetailPage from "@/pages/SermonDetailPage";
import GalleryPage from "@/pages/GalleryPage";
import GalleryAlbumPage from "@/pages/GalleryAlbumPage";
import ContactPage from "@/pages/ContactPage";
import RegisterPage from "@/pages/RegisterPage";
import GivePage from "@/pages/GivePage";
import ScrollToTop from "@/components/common/ScrollToTop";

// Admin Pages
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminHomepage from "@/pages/admin/AdminHomepage";
import AdminAbout from "@/pages/admin/AdminAbout";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminCalendar from "@/pages/admin/AdminCalendar";
import AdminSermons from "@/pages/admin/AdminSermons";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminInquiries from "@/pages/admin/AdminInquiries";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminActivityLog from "@/pages/admin/AdminActivityLog";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.MISSION} element={<MissionPage />} />
          <Route path={ROUTES.MINISTRY} element={<MinistryPage />} />
          <Route path={ROUTES.MINISTRY_DETAIL} element={<MinistryDetailPage />} />
          <Route path={ROUTES.EVENTS} element={<EventsPage />} />
          <Route path={ROUTES.EVENT_DETAIL} element={<EventDetailPage />} />
          <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
          <Route path={ROUTES.SERMONS} element={<SermonsPage />} />
          <Route path={ROUTES.SERMON_DETAIL} element={<SermonDetailPage />} />
          <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
          <Route path={ROUTES.GALLERY_ALBUM} element={<GalleryAlbumPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.GIVE} element={<GivePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Portal Routes */}
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
        <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_HOMEPAGE} element={<AdminHomepage />} />
          <Route path={ROUTES.ADMIN_ABOUT} element={<AdminAbout />} />
          <Route path={ROUTES.ADMIN_EVENTS} element={<AdminEvents />} />
          <Route path={ROUTES.ADMIN_CALENDAR} element={<AdminCalendar />} />
          <Route path={ROUTES.ADMIN_SERMONS} element={<AdminSermons />} />
          <Route path={ROUTES.ADMIN_GALLERY} element={<AdminGallery />} />
          <Route path={ROUTES.ADMIN_INQUIRIES} element={<AdminInquiries />} />
          <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} />
          <Route path={ROUTES.ADMIN_ACTIVITY_LOG} element={<AdminActivityLog />} />
        </Route>
      </Routes>
    </>
  );
};

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-slate-900 mb-3">404</h1>
      <p className="text-slate-600">Page not found.</p>
    </div>
  </div>
);

export default AppRoutes;
