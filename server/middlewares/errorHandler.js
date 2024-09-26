function errorHandler(error, req, res, next) {
    let status = error.status || 500;
    let message = error.message || `Internal Server Error`;

    switch (error.name) {
        case `SequelizeValidationError`:
        case `SequelizeUniqueConstraintError`:
            status = 400;
            message = error.errors[0].message;
            break;
        case `CredentialsRequired`:
            status = 400;
            message = error.message;
            break;
        case `BadRequest`:
        case `Unauthorized`:
            status = 401;
            message = error.message;
            break;
        case `Unauthenticated`:
            status = 401;
            message = `Unauthenticated`
            break;
        case `Forbidden`:
            status = 403;
            message = `You're not authorized for this action`;
            break;
        case `NotFound`:
            status = 404;
            message = `Data is not found`;
            break;
    }

    res.status(status).json({ message: message });
}

module.exports = errorHandler;