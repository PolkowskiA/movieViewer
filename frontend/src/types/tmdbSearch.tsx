import type { TmdbMovie } from "../types";

export interface TmdbResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}
