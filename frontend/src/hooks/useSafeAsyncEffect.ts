import { useEffect, useRef } from "react";

/**
 * Rulează o funcție asincronă în siguranță într-un useEffect,
 * prevenind actualizările după un unmount sau cleanup.
 *
 * @param asyncEffect Funcția asincronă efectivă
 * @param deps Lista de dependențe
 */
export const useSafeAsyncEffect = (
  asyncEffect: (isCancelled: () => boolean) => Promise<void>,
  deps: React.DependencyList
) => {
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    asyncEffect(() => cancelledRef.current);

    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
