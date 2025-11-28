// 커스텀 에러 클래스
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// API 응답 타입
interface ApiResponse<T> {
  code: string;
  message: string;
  contents: T;
}

async function fetchWrapperWithTokenHandler<T>(
  uri: string,
  body?: unknown,
  init?: RequestInit,
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_LOCAL;

  // 기본 설정
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string>),
  };

  // body가 FormData가 아니면 JSON Content-Type 설정
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // 서버 사이드에서 쿠키 전달
  const isServer = typeof window === "undefined";
  if (isServer) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    headers["Cookie"] = cookieStore.toString();
  }

  const requestInit: RequestInit = {
    ...init,
    headers,
    credentials: "include",
    cache: init?.cache || "no-cache",
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
  };

  const response = await fetch(`${apiUrl}${uri}`, requestInit);

  // HTTP 에러
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP Error ${response.status}`);
  }

  const data: ApiResponse<T> = await response.json();

  // API 응답 에러
  if (data.code !== "OK") {
    throw new ApiError(400, data.message || "API Error");
  }

  return data.contents;
}

export function GET<T>(url: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(url, undefined, {
    method: "GET",
    ...init,
  });
}

export function POST<T>(url: string, body?: unknown, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(url, body, {
    method: "POST",
    ...init,
  });
}

export function PATCH<T>(url: string, body?: unknown, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(url, body, {
    method: "PATCH",
    ...init,
  });
}

export function PUT<T>(url: string, body?: unknown, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(url, body, {
    method: "PUT",
    ...init,
  });
}

export function DELETE<T>(url: string, body?: unknown, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(url, body, {
    method: "DELETE",
    ...init,
  });
}
