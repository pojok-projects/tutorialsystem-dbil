const response = (
    req,
    res,
    code,
    message
) => {
    res.status(code).json({
        code: code,
        message: message,
        method: req.method
    })
}

module.exports = {
    response
}