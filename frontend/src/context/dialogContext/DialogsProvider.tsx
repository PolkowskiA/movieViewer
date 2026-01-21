import { useMemo, useState, type FC, type PropsWithChildren } from "react";
import type { MovieDetails } from "../../types/MovieDetails";
import { DialogsContext } from "./DialogsContext";
import type { DialogType } from "./types";

export const DialogsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedItem, setSelectedItem] = useState<MovieDetails | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const openDetails = (item: MovieDetails | number) => {
    if (typeof item === "number") {
      setSelectedMovieId(item);
    } else {
      setSelectedItem(item);
    }
    setActiveDialog("details");
  };

  const openDelete = (item: MovieDetails) => {
    setSelectedItem(item);
    setActiveDialog("delete");
  };

  const openEdit = (item: MovieDetails) => {
    setSelectedItem(item);
    setActiveDialog("edit");
  };

  const close = () => {
    setActiveDialog(null);
    setSelectedItem(null);
    setSelectedMovieId(null);
  };

  const value = useMemo(() => {
    return {
      activeDialog,
      selectedItem,
      selectedMovieId,
      openEdit,
      openDelete,
      openDetails,
      close,
    };
  }, [activeDialog, selectedItem, selectedMovieId]);

  return (
    <DialogsContext.Provider value={value}>{children}</DialogsContext.Provider>
  );
};
