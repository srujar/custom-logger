const expressWinston = require('express-winston');
const { transports, format } = require('winston');
const HttpLogTransport = require("./custom-transport");
let apiEndPoint = require('./constants');
const logger = require('./logger');

const setApiEndPoint = (url) => {
    apiEndPoint = url || apiEndPoint;
}
const createLogger = (app, routesToExclude = [], appKey = null) => {
    app.use(expressWinston.logger({
        winstonInstance: logger(apiEndPoint, routesToExclude, appKey),
        statusLevels: true
    }))
    return logger(apiEndPoint, routesToExclude, appKey);
}

const myFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} ${level}: ${meta.message}`
})

const createErrorLog = (app, routesToExclude = [], appKey = null) => {
    app.use(expressWinston.errorLogger({
        transports: [
            new HttpLogTransport({ apiEndPoint, routesToExclude, appKey })
        ],
        format: format.combine(
            format.json(),
            format.timestamp(),
            myFormat
        )
    }))
}

module.exports = { setApiEndPoint, createLogger, createErrorLog }