import type { MovieDetails } from "../types/tmdbMovieDetails";
import { apiFetch } from "./apiFetch";

export function getMovieDetails(movieId: number) {
  return apiFetch<MovieDetails>(`/api/movies/${movieId}`);
}

export async function initClient() {
  const response = await apiFetch<{ clientId: string }>("/api/client", {
    method: "POST",
  });

  localStorage.setItem("clientId", response.clientId);
  return response.clientId;
}

export function getFavorites() {
  return apiFetch<{ movieIds: number[] }>("/api/favorites");
}

import type { TmdbResponse } from "../types/tmdbSearch";
import { normalizeString } from "../utils";

export function searchMovies(query: string) {
  const normalized = normalizeString(query);

  return apiFetch<TmdbResponse>(
    `/api/movies/search?query=${encodeURIComponent(normalized)}`,
  );
}
