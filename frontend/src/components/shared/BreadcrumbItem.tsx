import { ChevronRight } from "lucide-react";
interface BreadcrumbItemProps {
  label: string;
  isLast: boolean;
  onClick: () => void;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  label,
  isLast,
  onClick,
}) => {
  return (
    <>
      <div
        onClick={() => onClick()}
        className={`px-2 py-1 hover:cursor-pointer transition-colors duration-150 ${
          isLast
            ? "text-gray-100 font-semibold"
            : "text-gray-400 hover:text-gray-100"
        }`}
        aria-current={isLast ? "page" : undefined}
      >
        {label}
      </div>
      {!isLast && <ChevronRight className="w-4 h-4 text-gray-500" />}
    </>
  );
};

export default BreadcrumbItem;
