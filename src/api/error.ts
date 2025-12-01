// 기본 API 에러 클래스
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

/* 400 Bad Request */
export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

/* 401 Unauthorized */
export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

/* 403 Forbidden */
export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

/* 404 Not Found */
export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

/* 409 Conflict */
export class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

/* 429 Too Many Requests */
export class TooManyRequestsError extends ApiError {
  constructor(message = "Too Many Requests") {
    super(429, message);
  }
}

/* 500 Internal Server Error */
export class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}
