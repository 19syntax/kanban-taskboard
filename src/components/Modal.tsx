import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}
export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  const { isDarkMode } = useTheme();
  if (!isOpen) return null;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50
  "
      onClick={onClose}
    >
      <div
        className={`rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className={`transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
