import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppRouter from "./AppRouter.tsx";
import { DialogsProvider } from "./context/dialogContext/DialogsProvider.tsx";
import { GlobalLoadingProvider } from "./context/loadingContext/LoadingProviderWithBridge.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalLoadingProvider>
        <DialogsProvider>
          <AppRouter />
        </DialogsProvider>
      </GlobalLoadingProvider>
    </BrowserRouter>
  </StrictMode>,
);
