import { createContext } from "react";
import type { DialogContextState } from "./types";

export const DialogsContext = createContext<DialogContextState | null>(null);
