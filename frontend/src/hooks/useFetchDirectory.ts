import { useDispatch } from "react-redux";
import { fetchDirectoryContents } from "../store/fileThunks";
import { setFiles, setGlobalError, setLoadingState } from "../store/fileSlice";
import { fileCache } from "../utils/fileCache";
import handleError from "../utils/error";
import { useSafeAsyncEffect } from "./useSafeAsyncEffect";
import type { AppDispatch } from "../store/store";
import { isRejected } from "@reduxjs/toolkit";

export const useFetchDirectory = (path: string, onLoaded: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

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
        const result = await dispatch(fetchDirectoryContents(path));
        if (isCancelled()) return;

        if (isRejected(result)) {
          throw new Error(result.payload || "Failed to fetch directory");
        }

        dispatch(setFiles(result.payload.contents));
        fileCache.set(path, result.payload.contents);
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
