const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.statusCode ? error.message : 'Not Found';

    const error_data = {
        error: { statusCode, message },
    };

    return res.status(statusCode).json(error_data);
};

module.exports = errorMiddleware;
