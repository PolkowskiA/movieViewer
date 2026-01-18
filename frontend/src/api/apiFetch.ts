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

export async function apiFetch<TResponse, TBody = unknown>(
  url: string,
  options: ApiFetchOptions<TBody> = {},
): Promise<TResponse> {
  startGlobalLoading();
  const clientId = localStorage.getItem("clientId");

  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(clientId
          ? { "X-Client-Id": localStorage.getItem("clientId")! }
          : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });

    if (!response.ok) {
      throw new ApiError(`API error: ${response.status}`, response.status);
    }

    return (await response.json()) as TResponse;
  } finally {
    stopGlobalLoading();
  }
}
