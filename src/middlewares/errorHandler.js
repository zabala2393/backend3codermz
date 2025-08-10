const errorHandler = (error, req, res, next) => {
    console.log(error)
    const message = error.message || "Server Error"
    const data = {
        method: req.method,
        url: req.originalUrl,
        error: message
    }
    res.status(400).json(data)
}

export default errorHandler