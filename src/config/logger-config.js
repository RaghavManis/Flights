const { createLogger, format, transports } = require('winston');  // createLogger is function and other two are object  
const { combine, timestamp, label, printf } = format;

const customFormat = printf(( { level, message, timestamp, error } ) => {
    return `${timestamp} : ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        customFormat,
    ),
    transports: [   // most important part of this file 
        new transports.Console(),
        new transports.File({filename: 'combined.log'})
    ],
});

module.exports = logger;