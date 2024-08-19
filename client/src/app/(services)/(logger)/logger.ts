import winston from 'winston';
import 'winston-mongodb';
import { randomBytes } from 'crypto';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, colorize, json, label, printf, metadata } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';
const appVersion = "16.8";
const generateLogId = (): string => randomBytes(16).toString('hex');
//const { MONGODB_URI } = require('../startup/envconfig');
// Logger for MongoDB

export enum LogIndentation {
    None = 0,
    SM = 2, // Small
    MD = 4, // Medium
    LG = 6, // Large
    XL = 8, // XLarge
    XXL = 10,
    XXXL = 12
}

/*
export const httpLoggerDB = winston.createLogger({
    format: combine(
        json(),
        metadata()
    ),
    transports: [
        new winston.transports.MongoDB({
            // we'll use the existing database to preserve logs
            db: process.env.MONGODB_URI as string,
            collection: 'logs', // name of the table/collection
            options: { useUnifiedTopology: true }
        }),
    ],
});
/**/

// Logger for CLI outputs
export const cliLogger = winston.createLogger({
    format: combine(
        label({ label: appVersion }),
        timestamp({ format: timestampFormat }),
        colorize({ level: true }),
        printf(
            ({ level, message, label, timestamp }) =>
                `[${timestamp}] ${level} (${label}): ${message}`
        )
    ),
    transports: [new winston.transports.Console()],
});

// Logger for API endpoints
export const httpLogger = winston.createLogger({
    format: combine(
        timestamp({ format: timestampFormat }),
        json(),
        printf(({ timestamp, level, message, ...data }) => {
            const response = {
                level,
                logId: generateLogId(),
                timestamp,
                appInfo: {
                    appVersion,
                    environment: 'production',//process.env.NODE_ENV, // development/staging/production
                    proccessId: process.pid,
                },
                message,
                data,
            };

            return JSON.stringify(response, null, LogIndentation.MD);
        })
    ),
    transports: [
        // log to console
        new winston.transports.Console({
            // if set to true, logs will not appear
            silent: true//process.env.NODE_ENV === 'development' // true/false
        }),
        // log to file, but rotate daily
        new DailyRotateFile({
            filename: 'public/logs/logs_Info-%DATE%.log', // file name includes current date
            datePattern: 'MMMM-DD-YYYY',
            zippedArchive: false, // zip logs true/false
            maxSize: '20m', // rotate if file size exceeds 20 MB
            maxFiles: '14d', // max files
            level: 'info',
        }),
        new DailyRotateFile({
            filename: 'public/logs/logs_Error-%DATE%.log', // file name includes current date
            datePattern: 'MMMM-DD-YYYY',
            zippedArchive: false, // zip logs true/false
            maxSize: '20m', // rotate if file size exceeds 20 MB
            maxFiles: '14d', // max files
            level: 'error',
        }),
        new DailyRotateFile({
            filename: 'public/logs/logs_Warn-%DATE%.log', // file name includes current date
            datePattern: 'MMMM-DD-YYYY',
            zippedArchive: false, // zip logs true/false
            maxSize: '20m', // rotate if file size exceeds 20 MB
            maxFiles: '14d', // max files
            level: 'warn',
        })
    ],
});
