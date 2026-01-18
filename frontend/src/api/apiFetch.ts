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
  const clientId = localStorage.getItem("clientId");

  const response = await fetch(url, {
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

    try {
      errorBody = await response.json();
    } catch {}

    throw new ApiError(
      `API error: ${response.status}`,
      response.status,
      errorBody,
    );
  }

  return (await response.json()) as TResponse;
}
