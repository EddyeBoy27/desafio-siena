const objError = {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    alreadyExists: 409,
    invalidData: 422,
};

const errorController = (err, _req, res, _next) => {
    if (err.error) return res.status(objError[err.error.code] || 500).json(err);
    const now = Date.now();
    console.error(`ErrorController: Message: ${err.error.message}, Date: ${now}`);
    return res.status(err.status || 500)
        .json({
            error: {
                message: `Internal error ${now}`, code: err.type || 'InternalError',
            },
        });
};

const endpointNotFound = (_req, res) => res.status(404).json({
    error: { message: 'The endpoint wasn\'t found', code: 'notFound' },
});

module.exports = {
    errorController,
    endpointNotFound,
};