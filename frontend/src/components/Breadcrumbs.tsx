import { ChevronRight, Home } from "lucide-react";
import React from "react";

interface BreadcrumbsProps {
  currentPath: string;
  onBreadcrumbClick: (path: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPath,
  onBreadcrumbClick,
}) => {
  const parts = currentPath.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-800">
      <div
        onClick={() => onBreadcrumbClick("/")}
        className="py-2 px-2 text-gray-300 hover:text-gray-100 !hover:bg-gray-800/90 hover:cursor-pointer"
      >
        <Home className="w-4 h-4" />
      </div>

      {parts.length > 0 && <ChevronRight className="w-4 h-4 text-gray-500" />}

      {parts.map((part, index) => {
        const newPath = "/" + parts.slice(0, index + 1).join("/");

        return (
          <React.Fragment key={index}>
            <div
              onClick={() => onBreadcrumbClick(newPath)}
              className="px-2 py-1 text-gray-400 hover:text-gray-100 hover:cursor-pointer"
            >
              {part}
            </div>
            {index < parts.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
