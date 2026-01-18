import { useMemo, useState, type FC, type PropsWithChildren } from "react";
import type { TmdbMovie } from "../../types";
import type { MovieDetails } from "../../types/tmdbMovieDetails";
import { DialogsContext } from "./DialogsContext";
import type { DialogType } from "./types";

export const DialogsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedItem, setSelectedItem] = useState<
    MovieDetails | TmdbMovie | null
  >(null);

  const openAdd = () => {
    setSelectedItem(null);
    setActiveDialog("add");
  };

  const openEdit = (item: MovieDetails) => {
    setSelectedItem(item);
    setActiveDialog("edit");
  };

  const openDelete = (item: MovieDetails) => {
    setSelectedItem(item);
    setActiveDialog("delete");
  };

  const openDetails = (item: MovieDetails | TmdbMovie) => {
    setSelectedItem(item);
    setActiveDialog("details");
  };

  const close = () => {
    setActiveDialog(null);
    setSelectedItem(null);
  };

  const value = useMemo(() => {
    return {
      activeDialog,
      selectedItem,
      openAdd,
      openEdit,
      openDelete,
      openDetails,
      close,
    };
  }, [
    activeDialog,
    selectedItem,
    openAdd,
    openEdit,
    openDelete,
    openDetails,
    close,
  ]);

  return (
    <DialogsContext.Provider value={value}>{children}</DialogsContext.Provider>
  );
};
