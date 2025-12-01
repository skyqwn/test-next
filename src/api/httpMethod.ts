import {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
} from "./error";

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

  // HTTP 에러 - status별 에러 클래스 분기
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || `HTTP Error ${response.status}`;
    // TODO:401,403은 미들웨어에서 서버로 401에러 받기전 처리하지만 방법이 있을수도..
    switch (response.status) {
      case 400:
        throw new BadRequestError(message);
      case 401:
        throw new UnauthorizedError(message);
      case 403:
        throw new ForbiddenError(message);
      case 404:
        throw new NotFoundError(message);
      case 500:
        throw new InternalServerError(message);
      default:
        throw new ApiError(response.status, message);
    }
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

// ============================================
// 외부 API용 (JSONPlaceholder 등) - 페이지네이션 헤더 지원
// ============================================

export interface PaginatedResponse<T> {
  data: T;
  totalCount: number;
}

/**
 * 외부 API GET 요청 (x-total-count 헤더 포함)
 * JSONPlaceholder 등 외부 API에서 페이지네이션할 때 사용
 */
export async function GET_EXTERNAL<T>(
  url: string,
  init?: RequestInit
): Promise<PaginatedResponse<T>> {
  const response = await fetch(url, {
    method: "GET",
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(response.status, `HTTP Error ${response.status}`);
  }

  const data: T = await response.json();
  const totalCount = parseInt(response.headers.get("x-total-count") || "0", 10);

  return { data, totalCount };
}
