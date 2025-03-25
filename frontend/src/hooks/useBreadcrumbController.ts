import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPath } from "../store/selectors";
import { setCurrentPath } from "../store/fileSlice";

/**
 * Controlează logica pentru breadcrumb navigation
 */
export const useBreadcrumbController = () => {
  const dispatch = useDispatch();
  const currentPath = useSelector(selectCurrentPath);

  const parts = useMemo(() => {
    return currentPath.split("/").filter(Boolean);
  }, [currentPath]);

  const handleClick = useCallback(
    (index: number) => {
      const newPath =
        index === -1 ? "/" : "/" + parts.slice(0, index + 1).join("/");
      dispatch(setCurrentPath(newPath));
    },
    [dispatch, parts]
  );

  return {
    parts,
    currentPath,
    handleClick,
  };
};
