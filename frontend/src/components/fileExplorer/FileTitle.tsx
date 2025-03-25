import PlatformBadge from "../shared/PlatformBadge";

const FileTitle = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 w-full px-4">
      <div className="font-poppins font-bold text-xl text-white">
        File Explorer
      </div>
      <PlatformBadge />
    </div>
  );
};

export default FileTitle;
