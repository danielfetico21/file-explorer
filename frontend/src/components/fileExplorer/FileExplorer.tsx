import { useCallback, useState } from "react";
import { useFetchDirectory } from "../../hooks/useFetchDirectory";
import { useExplorerController } from "../../hooks/useExplorerController";
import FileTitle from "./FileTitle";
import FileGrid from "./FileGrid";
import Breadcrumbs from "../shared/Breadcrumbs";

const FileExplorer: React.FC = () => {
  const { currentPath, handleItemClick, handleBackClick } =
    useExplorerController();
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const onInitialLoad = useCallback(() => {
    setInitialLoadDone(true);
  }, []);

  useFetchDirectory(currentPath, onInitialLoad);

  return (
    <div className="flex flex-col h-[calc(100dvh-6rem)] max-w-4xl w-full bg-gray-900/90 px-0 py-8 sm:p-8 rounded-2xl border border-gray-800">
      <FileTitle />
      <Breadcrumbs />
      <div className="flex flex-1 overflow-hidden w-full">
        {!initialLoadDone ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Loading files...
          </div>
        ) : (
          <div
            className="flex-1 overflow-y-auto"
            role="region"
            aria-label="File list region"
          >
            <FileGrid
              onFileClick={handleItemClick}
              onBackClick={handleBackClick}
              initialLoadDone={initialLoadDone}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
