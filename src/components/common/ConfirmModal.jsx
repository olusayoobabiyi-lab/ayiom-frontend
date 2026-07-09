import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaTrash, FaQuestionCircle } from "react-icons/fa";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDanger = true,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 relative z-10 text-center"
          >
            {/* Header Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 border border-slate-850 shadow-inner">
              {isDanger ? (
                <FaExclamationTriangle className="text-red-500 text-xl animate-pulse" />
              ) : (
                <FaQuestionCircle className="text-gold text-xl" />
              )}
            </div>

            {/* Title and Message */}
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-white uppercase tracking-widest">
                {title}
              </h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed px-2">{message}</p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="w-full bg-slate-950 border border-slate-850 hover:bg-slate-800 text-slate-350 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`w-full text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 ${
                  isDanger
                    ? "bg-red-650 hover:bg-red-700 border border-red-900/10"
                    : "bg-maroon hover:bg-red-800 border border-gold/15"
                }`}
              >
                {isDanger && <FaTrash className="text-[10px]" />}
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
