import { motion } from "framer-motion";
import { FaHeart, FaUniversity, FaGlobe, FaCopy } from "react-icons/fa";
import { useState } from "react";
import headerBg from "@/assets/images/hero.png";

export default function GivePage() {
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 3000);
  };

  const localAccount = {
    bank: "United Bank for Africa (UBA)",
    name: "Amend Your Ways Intl Outreach Ministry",
    number: "1029664301",
  };

  const usdAccount = {
    bank: "United Bank for Africa (UBA) (USD)",
    name: "Amend Your Ways Intl Outreach Ministry",
    number: "3005031473",
    // swift: "ZENEFTGDXXX",
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[300px] lg:h-[380px] bg-slate-950 flex items-center overflow-hidden pb-12 pt-16">
        <img
          src={headerBg}
          alt="Give Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />

        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 text-white pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-3"
          >
            <span className="text-gold font-bold uppercase tracking-wider text-xs md:text-sm block">
              — SEED & OFFERING
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider leading-none">
              GIVE & SUPPORT
            </h1>
            <p className="text-slate-300 text-xs md:text-sm xl:text-base leading-relaxed font-medium">
              Your generosity fuels our mission. Through your tithes, offerings, and partnership
              seeds, we are able to reach out to widows, orphans, and less privileged families, and
              spread the Gospel of Jesus Christ globally.
            </p>
          </motion.div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[40px] md:h-[60px]"
          >
            <path fill="#B91C1C" d="M0,50 C320,118 1120,2 1440,60 L1440,120 L0,120Z" />
            <path fill="#ffffff" d="M0,60 C320,120 1120,10 1440,70 L1440,120 L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Main Account details Section */}
      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left Column: Account Details Grid (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-slate-800">
                Bank Transfer Details
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                You can make direct bank transfers or standing orders to support our work. Please
                find the official local and international UBA Bank accounts below:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Local Account Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col justify-center shadow-sm relative group hover:shadow-md transition">
                <span className="w-12 h-12 rounded-full bg-[#B91C1C]/15 text-[#B91C1C] flex items-center justify-center text-xl mb-6">
                  <FaUniversity />
                </span>

                <div className="space-y-4">
                  <span className="text-[10px] font-extrabold text-[#B91C1C] uppercase tracking-wider bg-[#B91C1C]/10 px-2 py-0.5 rounded">
                    Local Transfer (NGN)
                  </span>
                  <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-wide">
                    {localAccount.bank}
                  </h3>

                  <div className="space-y-1.5 text-xs md:text-sm font-semibold text-slate-500">
                    <p>Account Name:</p>
                    <p className="text-slate-800 font-bold">{localAccount.name}</p>
                    <p className="mt-3">Account Number:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-black text-base md:text-lg">
                        {localAccount.number}
                      </span>
                      <button
                        onClick={() => handleCopy(localAccount.number, "local")}
                        className="text-slate-400 hover:text-slate-600 p-1"
                        title="Copy account number"
                      >
                        <FaCopy />
                      </button>
                      {copiedText === "local" && (
                        <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest animate-pulse">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* USD Account Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative group hover:shadow-md transition">
                <span className="w-12 h-12 rounded-full bg-[#B91C1C]/15 text-[#B91C1C] flex items-center justify-center text-xl mb-6">
                  <FaGlobe />
                </span>

                <div className="space-y-4">
                  <span className="text-[10px] font-extrabold text-[#B91C1C] uppercase tracking-wider bg-[#B91C1C]/10 px-2 py-0.5 rounded">
                    International Transfer (USD)
                  </span>
                  <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-wide">
                    {usdAccount.bank}
                  </h3>

                  <div className="space-y-1.5 text-xs md:text-sm font-semibold text-slate-500">
                    <p>Account Name:</p>
                    <p className="text-slate-800 font-bold">{usdAccount.name}</p>
                    <p className="mt-3">Account Number:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-black text-base md:text-lg">
                        {usdAccount.number}
                      </span>
                      <button
                        onClick={() => handleCopy(usdAccount.number, "usd")}
                        className="text-slate-400 hover:text-slate-600 p-1"
                        title="Copy account number"
                      >
                        <FaCopy />
                      </button>
                      {copiedText === "usd" && (
                        <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest animate-pulse">
                          Copied!
                        </span>
                      )}
                    </div>
                    <p className="mt-3">SWIFT Code:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-bold">{usdAccount.swift}</span>
                      <button
                        onClick={() => handleCopy(usdAccount.swift, "swift")}
                        className="text-slate-400 hover:text-slate-600 p-1"
                        title="Copy SWIFT code"
                      >
                        <FaCopy />
                      </button>
                      {copiedText === "swift" && (
                        <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest animate-pulse">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scripture card (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <div className="bg-[#7F1D1D] text-white rounded-2xl p-6 md:p-8 shadow-lg text-center space-y-6 relative overflow-hidden">
              {/* Background graphic details */}
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />

              <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#7F1D1D] text-2xl mx-auto shadow-md">
                <FaHeart />
              </span>

              <div className="space-y-3">
                <span className="text-gold font-serif text-6xl leading-none block select-none">
                  “
                </span>
                <p className="font-serif italic text-sm md:text-base leading-relaxed text-slate-100 -mt-6">
                  Each of you should give what you have decided in your heart to give, not
                  reluctantly or under compulsion, for God loves a cheerful giver.
                </p>
                <p className="font-sans font-bold text-gold text-center text-xs tracking-wider uppercase">
                  — 2 Corinthians 9:7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
