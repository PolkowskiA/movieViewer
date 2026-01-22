import type { MovieDetails } from "../../types/MovieDetails";

export type DialogType = "edit" | "delete" | "details" | null;

export interface DialogContextState {
  activeDialog: DialogType;
  movieDetails: MovieDetails | null;

  openEdit: (item: MovieDetails) => void;
  openDelete: (item: MovieDetails) => void;
  openDetails: (item: MovieDetails) => void;
  close: () => void;
}
