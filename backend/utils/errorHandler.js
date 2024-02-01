const globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
        error: err || "Internal Server Error",
    });
};

const uncaughtExceptionHandler = () => {
    process.on("uncaughtException", err => {
        console.log("Uncaught Exception, " + err.message);
        process.exit(1);
    });
};

module.exports = {
    globalErrorHandler,
    uncaughtExceptionHandler
}