import { useEffect, useState } from "react";
import storage from "@/utils/storage";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = storage.getItem(key);
    if (stored === null || stored === undefined) return initialValue;
    try { return JSON.parse(stored); } catch { return stored; }
  });

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;