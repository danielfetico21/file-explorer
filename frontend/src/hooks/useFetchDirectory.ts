import { useDispatch } from "react-redux";
import { getAllFiles } from "../api/api";
import { setFiles, setGlobalError, setLoadingState } from "../store/fileSlice";
import { fileCache } from "../utils/fileCache";
import handleError from "../utils/error";
import { useSafeAsyncEffect } from "./useSafeAsyncEffect";

export const useFetchDirectory = (path: string, onLoaded: () => void) => {
  const dispatch = useDispatch();

  useSafeAsyncEffect(
    async (isCancelled) => {
      dispatch(setLoadingState({ isLoading: true }));

      const cached = fileCache.get(path);
      if (cached) {
        if (isCancelled()) return;
        dispatch(setFiles(cached));
        dispatch(setGlobalError(null));
        dispatch(setLoadingState({ isLoading: false }));
        onLoaded();
        return;
      }

      try {
        const data = await getAllFiles(path);
        if (isCancelled()) return;

        dispatch(setFiles(data.contents));
        fileCache.set(path, data.contents);
        dispatch(setGlobalError(null));
      } catch (error) {
        if (isCancelled()) return;

        const fileError = handleError(error);
        dispatch(
          setGlobalError({
            type: "error",
            error: fileError?.error,
            details: fileError?.details,
          })
        );
      } finally {
        if (!isCancelled()) {
          dispatch(setLoadingState({ isLoading: false }));
          onLoaded();
        }
      }
    },
    [path, dispatch, onLoaded]
  );
};
