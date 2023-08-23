const { createLogger, format, transports } = require("winston");
const HttpLogTransport = require("./custom-transport");
const logger = (apiEndPoint, routesToExclude) => {
    return createLogger({
        transports: [
            new HttpLogTransport({ apiEndPoint, routesToExclude })
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