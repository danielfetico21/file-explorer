import { Home } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useBreadcrumbController } from "../../hooks/useBreadcrumbController";
import BreadcrumbItem from "./BreadcrumbItem";

const Breadcrumbs: React.FC = () => {
  const { parts, handleClick } = useBreadcrumbController();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [parts]);

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap px-4 py-2 border-b border-gray-800 scrollbar-thin scrollbar-thumb-gray-700">
      <div className="flex items-center gap-1 min-w-max" ref={scrollRef}>
        {/* Home button */}
        <div
          onClick={() => handleClick(-1)}
          className="py-2 px-2 text-gray-300 hover:text-gray-100 hover:bg-gray-800/90 cursor-pointer"
        >
          <Home className="w-4 h-4" />
        </div>

        {/* Breadcrumb items */}
        {parts.map((part, index) => (
          <BreadcrumbItem
            key={index}
            label={part}
            isLast={index === parts.length - 1}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
