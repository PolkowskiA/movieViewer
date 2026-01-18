import { useEffect } from "react";
import { registerLoadingHandlers } from "./loadingBridge";
import { LoadingProvider, useLoading } from "./LoadingContext";

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
