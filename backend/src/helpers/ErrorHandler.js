export class ErrorHandler extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
    }
}

export class DirectionError extends ErrorHandler {
    constructor(message) {
        super(message, 'DirectionError');
    }
}

export class CoordinateError extends ErrorHandler {
    constructor(message) {
        super(message, 'CoordinateError');
    }
}
