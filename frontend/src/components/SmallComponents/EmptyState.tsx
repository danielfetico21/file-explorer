import React from "react";
import emptyFile from "../../assets/icons/empty.png";
import { motion } from "framer-motion";

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-32">
      <motion.img
        src={emptyFile}
        alt="empty"
        className="w-16 h-16"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="text-gray-300">No files in this directory</span>
    </div>
  );
};

export default EmptyState;
