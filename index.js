const expressWinston = require('express-winston');
const { transports, format } = require('winston');
const HttpLogTransport = require("./custom-transport");
let apiEndPoint = require('./constants');
const logger = require('./logger');

const setApiEndPoint = (url) => {
    apiEndPoint = url || apiEndPoint;
}
const createLogger = (app, routesToExclude = []) => {
    app.use(expressWinston.logger({
        winstonInstance: logger(apiEndPoint, routesToExclude),
        statusLevels: true
    }))
    return logger(apiEndPoint, routesToExclude);
}

const myFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} ${level}: ${meta.message}`
})

const createErrorLog = (app, routesToExclude = []) => {
    app.use(expressWinston.errorLogger({
        transports: [
            new HttpLogTransport({ apiEndPoint, routesToExclude })
        ],
        format: format.combine(
            format.json(),
            format.timestamp(),
            myFormat
        )
    }))
}

module.exports = { setApiEndPoint, createLogger, createErrorLog }