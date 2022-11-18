class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}

class UnauthorizeError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}

class ForbiddenError extends ApiError {
    constructor(message) {
        super(message, 403);
    }
}

class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}

class ConflictError extends ApiError {
    constructor(message) {
        super(message, 409);
    }
}

class BadGatewayError extends ApiError {
    constructor(message) {
        super(message, 502);
    }
}

class UnavailableServiceError extends ApiError {
    constructor(message) {
        super(message, 503);
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    UnauthorizeError,
    ConflictError,
    BadGatewayError,
    UnavailableServiceError,
    ForbiddenError,
};
