import { ArrowLeft } from "lucide-react";
import React from "react";

interface BackButtonProps {
  onBackClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBackClick }) => {
  return (
    <button
      className="flex items-center gap-2 px-4 mb-4 py-2 text-sm text-gray-200 rounded-md !bg-transparent hover:!bg-gray-800/90 !border-none !outline-none transition-colors"
      onClick={onBackClick}
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
};

export default BackButton;
