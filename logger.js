const { createLogger, format, transports } = require("winston");
const HttpLogTransport = require("./custom-transport");
const logger = (apiEndPoint, routesToExclude,appKey = null) => {
    return createLogger({
        transports: [
            new HttpLogTransport({ apiEndPoint, routesToExclude,appKey })
        ],
        format: format.combine(
            format.timestamp(),
            format.json(),
            format.metadata(),
            format.prettyPrint()
        )
    })
}

module.exports = logger;