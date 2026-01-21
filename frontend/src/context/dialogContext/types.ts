import type { MovieDetails } from "../../types/MovieDetails";

export type DialogType = "edit" | "delete" | "details" | null;

export interface DialogContextState {
  activeDialog: DialogType;
  selectedItem: MovieDetails | null;
  selectedMovieId: number | null;

  openEdit: (item: MovieDetails) => void;
  openDelete: (item: MovieDetails) => void;
  openDetails: (item: MovieDetails | number) => void;
  close: () => void;
}
