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

const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "";

export async function apiFetch<TResponse, TBody = unknown>(
  url: string,
  options: ApiFetchOptions<TBody> = {},
): Promise<TResponse> {
  const clientId = localStorage.getItem("clientId");

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
    let errorBody: unknown = null;

    errorBody = await response.json();

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
}
