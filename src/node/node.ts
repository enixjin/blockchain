/**
 * Created by enixjin on 3/23/18.
 */

let config = require('../../config.js');
import * as winston from 'winston';
import {Blockchain} from "../blockchain/blockchain";

global.config = config;

// const files = new winston.transports.File({
//     filename: config.logFile,
//     json: false,
//     maxsize: 400000,
//     maxFiles: 10,
//     level: "debug",
//     timestamp: function () {
//         return new Date().toLocaleString();
//     }
// });

const console = new winston.transports.Console({
    json: false,
    prettyPrint: true,
    colorize: true,
    silent: false,
    level: config.logLevel,
    timestamp: function () {
        return new Date().toLocaleString();
    }
});

winston.configure({
    transports: [console]
});

global.blockchain = new Blockchain(5);

winston.info("=====================================");
winston.info("==        start node server.       ==");
winston.info("=====================================");
let serviceServer = require("./server");
serviceServer.start();