import {
  startGlobalLoading,
  stopGlobalLoading,
} from "../context/loadingContext/loadingBridge";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiFetchOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  signal?: AbortSignal;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function apiFetch<TResponse, TBody = unknown>(
  url: string,
  options: ApiFetchOptions<TBody> = {},
): Promise<TResponse> {
  startGlobalLoading();
  const clientId = localStorage.getItem("clientId");

  try {
    const response = await fetch(`${API_BASE}${url}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(clientId ? { "X-Client-Id": clientId } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });

    if (!response.ok) {
      const errorBody = await response.json();

      throw new ApiError(
        `API error: ${response.status}`,
        response.status,
        errorBody,
      );
    }

    const contentType = response.headers.get("Content-Type") ?? "";
    if (contentType.includes("application/json")) {
      return (await response.json()) as TResponse;
    } else return null as TResponse;
  } finally {
    stopGlobalLoading();
  }
}
