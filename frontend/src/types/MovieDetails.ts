import type { Person } from "./Crew";

export interface MovieDetails {
  backdropPath?: string | null;
  genres: Genre[];
  id: number;
  originalTitle: string;
  overview?: string | null;
  posterPath?: string | null;
  releaseDate: string;
  title: string;
  voteAverage: number;
  voteCount: number;
  director?: Person;
  writers?: Person[];
  review: ClientReview | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ClientReview {
  rating: number | null;
}
