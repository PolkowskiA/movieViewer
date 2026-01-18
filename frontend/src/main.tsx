import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppRouter from "./AppRouter.tsx";
import { DialogsProvider } from "./context/dialogContext/DialogsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DialogsProvider>
        <AppRouter />
      </DialogsProvider>
    </BrowserRouter>
  </StrictMode>
);
