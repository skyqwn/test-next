// 나중에 서버에서 내려오는 방향으로 바꾸면 될듯
export interface ApiResponse<T> {
  success: boolean;
  result: T;
  message: string;
}

async function fetchWrapperWithTokenHandler<T>(
  uri: string,
  body?: unknown,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 기본 설정
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string>),
  };

  // body가 FormData가 아니면 JSON Content-Type 설정
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const requestInit: RequestInit = {
    ...init,
    headers,
    credentials: "include", // 항상 포함
    cache: init?.cache || "no-cache",
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
  };

  const response = await fetch(`${apiUrl}${uri}`, requestInit);

  try {
    const data = await response.json();
    return data as ApiResponse<T>;
  } catch (error) {
    console.log("에러에러에러", error);
    return { success: false, result: null as T, message: `Fetch failed` };
  }
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
  return fetchWrapperWithTokenHandler<T>(url, undefined, {
    method: "DELETE",
    ...init,
  });
}
