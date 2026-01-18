import { useContext } from "react";
import { DialogsContext } from "./DialogsContext";

export const useDialogsContext = () => {
  const context = useContext(DialogsContext);

  if (!context) {
    throw new Error("usePopups must be used within PopupsContextProvider");
  }

  return context;
};
