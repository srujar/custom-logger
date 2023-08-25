# custom-logger

# please use the latest version 1.0.1 npm = npm i srujan-custom-logger

const express = require('express')
const app = express();

# setApiEndPoint is a method to set log cather portal api endpoint.
# createLogger will create the logger instance.
# The 3rd parameter passed to the createLogger is the unique app key
const { setApiEndPoint, createLogger, createErrorLog } = require('../custom-logger/index');
setApiEndPoint('http://13.234.48.217:4400');
# If you want to exclude any of the api endpoint we can use this array and pass it as a second parameter
let routesToExclude = ['/500']
const logger = createLogger(app, routesToExclude,"XYZ-123");


app.get('/10', (req, res) => {
    logger.info('This is an warn log')
    res.sendStatus(200)
})

app.get('/400', (req, res) => {
    logger.warn('This is an warn log')
    res.sendStatus(400)
})

app.get('/500', (req, res) => {
    logger.error('This is an error log')
    res.sendStatus(500)
})

app.get('/error', (req, res) => {
    throw new Error('This is a custom error')
})

# createErrorLog is a method to create error logs
createErrorLog(app, routesToExclude, "XYZ-123");

app.listen(4000); 



