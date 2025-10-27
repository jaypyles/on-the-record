import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={`relative w-full max-w-md mx-4 bg-white rounded-lg shadow-2xl overflow-hidden ${className}`}
        onClick={handleModalClick}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 font-display">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-black" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
