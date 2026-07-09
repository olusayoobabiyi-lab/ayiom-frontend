import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaBook,
  FaCalendarAlt,
  FaClock,
  FaDownload,
  FaFileAlt,
  FaVolumeUp,
  FaPlay,
} from "react-icons/fa";
import { SERMONS_DATA } from "@/constants/sermons";
import api from "@/services/api";

export default function SermonDetailPage() {
  const { id } = useParams();
  const [sermon, setSermon] = useState(null);
  const [relatedSermons, setRelatedSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("notes"); // notes | transcript

  useEffect(() => {
    async function fetchSermonDetails() {
      try {
        setLoading(true);
        const [sermonRes, sermonsRes] = await Promise.all([
          api.get(`/sermons/${id}`),
          api.get("/sermons"),
        ]);
        setSermon(sermonRes.data.data);
        const list = sermonsRes.data.data || [];
        setRelatedSermons(
          list
            .filter((s) => s._id !== id)
            .slice(0, 2)
            .map((s) => ({ ...s, id: s._id }))
        );
      } catch (err) {
        console.error("Failed to load sermon details:", err);
        setSermon(null);
        setRelatedSermons([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSermonDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <p className="text-slate-400 font-bold uppercase tracking-wider animate-pulse">
          Loading sermon details...
        </p>
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Sermon Not Found</h2>
        <p className="text-slate-600 mb-6">
          The message you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/sermons"
          className="bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded flex items-center gap-2 transition"
        >
          <FaArrowLeft /> BACK TO SERMONS
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Dark Cinema Video Player Area */}
      <section className="w-full bg-slate-950 pt-20 pb-10 flex flex-col items-center">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-6">
          <Link
            to="/sermons"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition"
          >
            <FaArrowLeft /> BACK TO SERMONS
          </Link>

          {/* Responsive Video Frame Container */}
          <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800">
            <iframe
              src={sermon.videoUrl}
              title={sermon.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Sermon Details & Audio/Transcript */}
      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          {/* Main Content Column (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Title & Metadata */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-slate-800 leading-tight">
                {sermon.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-slate-100 pb-4 text-xs md:text-sm font-bold text-slate-500">
                <span className="flex items-center gap-2">
                  <FaUser className="text-slate-400" />
                  <span>
                    Speaker: <strong className="text-slate-800">{sermon.speaker}</strong>
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <FaBook className="text-[#D4AF37]" />
                  <span>
                    Scripture:{" "}
                    <strong className="text-slate-800 font-serif italic">{sermon.scripture}</strong>
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-slate-400" />
                  <span>{sermon.date}</span>
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="text-slate-400" />
                  <span>{sermon.duration}</span>
                </span>
              </div>
            </div>

            {/* Audio player strip */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center text-lg shrink-0">
                  <FaVolumeUp />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Listen to Audio Sermon</h4>
                  <p className="text-slate-400 text-[11px] font-semibold">
                    Available for offline study
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto flex-grow max-w-md">
                <audio controls className="w-full h-8 font-sans">
                  <source src={sermon.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>

            {/* Tabs for Notes/Transcript */}
            <div className="space-y-6">
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`py-3 px-6 text-xs md:text-sm font-bold uppercase tracking-wider transition border-b-2 -mb-[2px] ${
                    activeTab === "notes"
                      ? "border-[#B91C1C] text-[#B91C1C]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Sermon Outline
                </button>
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`py-3 px-6 text-xs md:text-sm font-bold uppercase tracking-wider transition border-b-2 -mb-[2px] ${
                    activeTab === "transcript"
                      ? "border-[#B91C1C] text-[#B91C1C]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Transcript notes
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 min-h-[250px]">
                {activeTab === "notes" ? (
                  <div className="space-y-6">
                    <h3 className="font-bold text-slate-800 text-base md:text-lg uppercase">
                      Study Outline & Takeaways
                    </h3>
                    <ul className="list-disc pl-5 text-slate-600 text-xs md:text-sm font-semibold space-y-3 leading-relaxed">
                      <li>
                        <strong>Introduction:</strong> Understanding the context of{" "}
                        {sermon.scripture}.
                      </li>
                      <li>
                        <strong>Key Pillar 1:</strong> Cultivating spiritual capacity through
                        consistency.
                      </li>
                      <li>
                        <strong>Key Pillar 2:</strong> Aligning words and actions with the covenant.
                      </li>
                      <li>
                        <strong>Key Pillar 3:</strong> Standing firm in faith despite sensory
                        testimonies or indicators.
                      </li>
                      <li>
                        <strong>Conclusion:</strong> Active execution of God's word on a daily
                        basis.
                      </li>
                    </ul>

                    <button className="inline-flex items-center gap-2 border border-slate-350 bg-white hover:bg-slate-50 font-bold text-xs uppercase tracking-wider text-slate-700 px-5 py-3 rounded mt-4 transition">
                      <FaDownload className="text-[10px]" /> DOWNLOAD STUDY NOTES (PDF)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 text-base md:text-lg uppercase flex items-center gap-2">
                      <FaFileAlt className="text-slate-400 text-sm" /> Full Transcript
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-line italic">
                      "{sermon.transcript}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Column: Related Sermons (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="font-extrabold text-slate-800 text-sm md:text-base uppercase tracking-wider pb-4 border-b border-slate-100">
                Related Messages
              </h3>

              <div className="space-y-6">
                {relatedSermons.map((rel) => (
                  <div key={rel.id} className="group flex gap-4 items-start">
                    <div className="w-20 h-20 bg-slate-900 rounded-lg overflow-hidden shrink-0 relative">
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] bg-black/20">
                        <FaPlay />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link to={`/sermons/${rel.id}`} className="block">
                        <h4 className="font-bold text-slate-800 text-xs md:text-sm leading-tight hover:text-[#B91C1C] transition cursor-pointer">
                          {rel.title}
                        </h4>
                      </Link>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{rel.date}</p>
                      <p className="text-[10px] text-[#D4AF37] font-serif italic">
                        {rel.scripture}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
