import { AppError } from "../../utils/appError.js";

const handleDuplicatesError = (err) => {
    return new AppError(`Duplicate field value: ${err.value || err.index}. Please use another value!`, 400);
};

export const globalError = (err, req, res, next) => {
    let error = err;

    // Handle specific error cases
    if (err.code === 11000) {
        error = handleDuplicatesError(err);
    }

    // Ensure `statusCode` and `status` are defined
    const statusCode = error.statusCode || 500; // Default to 500 for server errors
    const status = error.status || 'error';    // Default to 'error'

    res.status(statusCode).json({
        status: status,
        message: error.message || 'An unexpected error occurred.',
        error: error,
    });
};
