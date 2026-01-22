import { useEffect } from "react";
import { registerLoadingHandlers } from "./loadingBridge";
import { LoadingProvider } from "./LoadingProvider";
import { useLoading } from "./useLoading";

function Bridge() {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    registerLoadingHandlers(startLoading, stopLoading);
  }, []);

  return null;
}

export function GlobalLoadingProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider>
      <Bridge />
      {children}
    </LoadingProvider>
  );
}
