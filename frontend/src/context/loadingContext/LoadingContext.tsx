import { createContext } from "react";
import type { LoadingContextType } from "./LoadingProvider";

export const LoadingContext = createContext<LoadingContextType | null>(null);
