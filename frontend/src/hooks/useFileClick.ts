import { useDispatch, useSelector } from "react-redux";
import { getFile } from "../api/api";
import { FileInfo } from "../interfaces/fileInterfaces";
import {
  selectFile,
  setFileDetails,
  setGlobalError,
  setLoadingState,
} from "../store/fileSlice";
import handleError from "../utils/error";
import { ensureMinimumDuration } from "../utils/timers";
import { RootState } from "../store/store";

export const useFileClick = () => {
  const dispatch = useDispatch();
  const { selectedFilePath, loadingFileId } = useSelector(
    (s: RootState) => s.files
  );

  const handleFileClick = async (item: FileInfo, fullPath: string) => {
    if (selectedFilePath === fullPath && !loadingFileId) return;

    dispatch(selectFile(fullPath));
    dispatch(setLoadingState({ isLoading: true, fileId: item.name }));

    try {
      const start = Date.now();
      const fileDetails = await getFile(fullPath);
      await ensureMinimumDuration(start);
      dispatch(setFileDetails({ path: fullPath, details: fileDetails }));
      dispatch(setGlobalError(null));
    } catch (error) {
      const fileError = handleError(error);
      dispatch(
        setGlobalError({
          type: "error",
          error: fileError?.error,
          details: fileError?.details,
        })
      );
    } finally {
      dispatch(setLoadingState({ isLoading: false, fileId: null }));
    }
  };

  return { handleFileClick };
};
