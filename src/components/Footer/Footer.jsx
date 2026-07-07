import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  // FaHeart,
} from "react-icons/fa";
import { ROUTES } from "@/constants/routes";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-8">
          {/* Column 1: Logo & Ministry Info (xl:col-span-4) */}
          <div className="xl:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/amend-logo.png"
                alt="Ministry Seal Logo"
                className="w-16 h-16 rounded-full border border-slate-700 bg-white p-0.5 object-contain"
              />
              <div>
                <h3 className="font-black text-white text-lg tracking-wide uppercase leading-tight">
                  AMEND YOUR WAYS INT'L OUTREACH MINISTRY
                </h3>
                {/* <p className="text-xs uppercase text-slate-400 tracking-wider">
                  INT'L OUTREACH MINISTRY
                </p> */}
                <span className="text-xs text-gold font-bold italic tracking-wide mt-1 block">
                  Changing Lives, Impacting Nations
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-slate-400 max-w-sm">
              We preach Christ, win souls, disciple believers, and show God's love through care for
              widows and less privilege people.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition shadow-sm"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition shadow-sm"
              >
                <FaYoutube className="text-sm" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:opacity-90 transition shadow-sm"
              >
                <FaInstagram className="text-sm" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (xl:col-span-3) */}
          <div className="xl:col-span-3">
            <h4 className="text-gold font-bold text-xs uppercase tracking-wider mb-5">
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs md:text-sm font-medium">
              <ul className="space-y-2.5">
                <li>
                  <Link to={ROUTES.HOME} className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ABOUT} className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.MISSION} className="hover:text-white transition">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.MINISTRY} className="hover:text-white transition">
                    Ministries
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2.5">
                <li>
                  <Link to={ROUTES.SERMONS} className="hover:text-white transition">
                    Sermons
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.GALLERY} className="hover:text-white transition">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.EVENTS} className="hover:text-white transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.CONTACT} className="hover:text-white transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Ministries (xl:col-span-2) */}
          <div className="xl:col-span-2">
            <h4 className="text-gold font-bold text-xs uppercase tracking-wider mb-5">
              MINISTRIES
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-medium">
              <li>
                <Link to={ROUTES.MINISTRY} className="hover:text-white transition">
                  Evangelism
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MINISTRY} className="hover:text-white transition">
                  Discipleship
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MINISTRY} className="hover:text-white transition">
                  Outreach
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MINISTRY} className="hover:text-white transition">
                  Widows & Less Privileged
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MINISTRY} className="hover:text-white transition">
                  Youth Ministry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (xl:col-span-3) */}
          <div className="xl:col-span-3 space-y-4 text-xs md:text-sm">
            <h4 className="text-gold font-bold text-xs uppercase tracking-wider mb-5">
              CONTACT US
            </h4>
            <div className="space-y-3 font-medium">
              <div className="flex gap-3">
                <FaPhone className="text-gold mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span>08168804973</span>
                  <span>08062862967</span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <FaEnvelope className="text-gold shrink-0" />
                <span>amendyourwaysoutreach@gmail.com</span>
              </div>
              <div className="flex gap-3 items-start">
                <FaMapMarkerAlt className="text-gold shrink-0 mt-0.5" />
                <span>Reaching out with the love of Christ</span>
              </div>
            </div>

            {/* Column 5: Follow Us info inline */}
            <div className="pt-4 border-t border-slate-800">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                FOLLOW US
              </h5>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                  <FaFacebookF className="text-[10px]" />
                </span>
                <span className="text-xs text-slate-400">
                  Facebook: <strong className="text-slate-200">Amend your ways outreach</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-[#0B0F19] py-6 text-xs text-slate-500 font-medium">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="text-center md:text-left">
            © 2026 AMEND YOUR WAYS INT'L OUTREACH MINISTRY. All Rights Reserved.
          </div>

          <div className="text-center italic text-slate-400 font-serif max-w-md">
            "Go into all the world and preach the gospel to all creation." – Mark 16:15
          </div>

          {/* <div className="text-center md:text-right flex items-center justify-center gap-1.5">
            <span>Designed with</span>
            <FaHeart className="text-red-600 animate-pulse text-[10px]" />
            <span>for God's Glory</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
