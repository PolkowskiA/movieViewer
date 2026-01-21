import { useMemo, useState } from "react";
import { LoadingContext } from "./LoadingContext";

export type LoadingContextType = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);

  const startLoading = () => setCounter((c) => c + 1);

  const stopLoading = () => setCounter((c) => Math.max(0, c - 1));

  const value = useMemo(() => {
    return {
      isLoading: counter > 0,
      startLoading,
      stopLoading,
    };
  }, [counter, startLoading, stopLoading]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
