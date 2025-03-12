import React from "react";

const LoadingFilesSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-10 bg-gray-800/50 rounded-lg"></div>
      ))}
    </div>
  );
};

export default LoadingFilesSkeleton;
