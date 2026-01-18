import type { TmdbMovie } from "../../types";
import type { MovieDetails } from "../../types/tmdbMovieDetails";

export type DialogType = "add" | "edit" | "delete" | "details" | null;

export interface DialogContextState {
  activeDialog: DialogType;
  selectedItem: MovieDetails | TmdbMovie | null;

  openAdd: () => void;
  openEdit: (item: MovieDetails) => void;
  openDelete: (item: MovieDetails) => void;
  openDetails: (item: TmdbMovie | MovieDetails) => void;
  close: () => void;
}
