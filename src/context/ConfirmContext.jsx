import { createContext, useContext, useState, useRef } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";

const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState(null);
  const resolverRef = useRef(null);

  const confirm = (config) => {
    setModalConfig(config);
    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleConfirm = () => {
    resolverRef.current(true);
    setModalConfig(null);
  };

  const handleCancel = () => {
    resolverRef.current(false);
    setModalConfig(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {modalConfig && (
        <ConfirmModal
          isOpen={!!modalConfig}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          {...modalConfig}
        />
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
};

export default ConfirmContext;
