import { createContext, useContext, useMemo, useCallback } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const success = useCallback((msg, opts) => toast.success(msg, opts), []);
  const error = useCallback((msg, opts) => toast.error(msg, opts), []);
  const info = useCallback((msg, opts) => toast.info(msg, opts), []);
  const warning = useCallback((msg, opts) => toast.warn(msg, opts), []);

  const value = useMemo(() => ({ success, error, info, warning }), [success, error, info, warning]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export default ToastContext;