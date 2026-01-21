import type { MovieDetails } from "../types/MovieDetails";
import { apiFetch } from "./apiFetch";

export async function getMovieDetails(movieId: number) {
  return await apiFetch<MovieDetails>(`/api/movies/${movieId}`);
}

export async function initClient() {
  const response = await apiFetch<{ clientId: string }>("/api/client", {
    method: "POST",
  });

  localStorage.setItem("clientId", response.clientId);
  return response.clientId;
}

export async function getFavorites() {
  const clientId = localStorage.getItem("clientId");
  if (clientId) {
    return await apiFetch<MovieDetails[]>("/api/favorites");
  } else {
    return [];
  }
}

import type { SearchMovie } from "../SearchMovie";
import { normalizeString } from "../utils";

export async function searchMovies(query: string) {
  const normalized = normalizeString(query);

  return await apiFetch<SearchMovie[]>(
    `/api/movies/search?query=${encodeURIComponent(normalized)}`,
  );
}

export async function addFavorite(id: number) {
  return await apiFetch(`/api/favorites`, {
    method: "POST",
    body: { movieId: id },
  });
}

export function deleteFavorite(id: number) {
  return apiFetch(`/api/favorites/${id}`, {
    method: "DELETE",
  });
}

export function addReview(rating: number | null, movieId: number) {
  return apiFetch(`/api/reviews`, {
    method: "POST",
    body: {
      rating,
      movieId,
    },
  });
}

export function deleteReview(movieId: number) {
  return apiFetch(`/api/reviews/${movieId}`, {
    method: "DELETE",
  });
}
