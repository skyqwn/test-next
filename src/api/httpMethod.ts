//TODO: 나중에 서버에서 내려오는 방향으로 바꾸면 될듯
export interface ApiResponse<T> {
  code: string;       // 'OK' = 성공
  contents: T;        // 실제 데이터
  message: string;
}

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

// refresh 토큰 요청 → 성공 시 true, 실패 시 false
async function tryRefreshToken(): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    let refreshToken: string | undefined;

    // 서버에서 실행 시 쿠키에서 refresh_token 추출
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      refreshToken = cookieStore.get('refresh_token')?.value;
    }

    const response = await fetch(`${apiUrl}auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(refreshToken && { Cookie: `refresh_token=${refreshToken}` }),
      },
    });
    console.log('🚀 ~ httpMethod.ts:41 ~ tryRefreshToken ~ response:', response);

    if (!response.ok) return false;

    // 서버에서 실행 시: cookies().set()으로 저장
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const setCookieHeaders = response.headers.getSetCookie();
      console.log('🚀 ~ httpMethod.ts:49 ~ tryRefreshToken ~ setCookieHeaders:', setCookieHeaders);

      // for (const cookie of setCookieHeaders) {
      //   const [nameValue] = cookie.split(';');
      //   const [name, value] = nameValue.split('=');
      //   cookieStore.set(name, value);
      // }
    }

    return true;
  } catch {
    return false;
  }
}

async function fetchWrapperWithTokenHandler<T>(
  uri: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL;

  // 기본 설정
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string>),
  };

  // 서버에서 실행 시 쿠키 수동 전달 (단, 이미 Cookie 헤더가 있으면 건너뜀)
  if (typeof window === 'undefined' && !headers['Cookie']) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ');
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;
    }
  }

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
  console.log('🚀 ~ httpMethod.ts:106 ~ fetchWrapperWithTokenHandler ~ response:', response.body);

  // 401 Unauthorized → refresh 시도
  if (response.status === 401) {
    const refreshed = await tryRefreshToken();

    if (refreshed) {
      // cookies().set()으로 저장됐으니 다시 cookies().getAll()로 읽어서 재시도
      return fetchWrapperWithTokenHandler<T>(uri, body, init);
    }

    // refresh 실패 → 인증 에러 throw
    throw new ApiError(401, "인증이 필요합니다");
  }

  // 다른 HTTP 에러
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP Error ${response.status}`);
  }

  // JSON 파싱
  const data: ApiResponse<T> = await response.json();

  // API 응답 에러 (code !== 'OK')
  if (data.code !== 'OK') {
    throw new ApiError(400, data.message || "API Error");
  }

  // 성공 시 contents만 반환
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
