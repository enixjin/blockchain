/**
 * Created by enixjin
 */

import * as winston from "winston";
import {serviceException} from "@jinyexin/core";
import {PeerController} from "./controller/peer";


require('source-map-support').install();
let config = global.config;

let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');

let app = express();
let http = require('http');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(logger('combined', {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,jwt");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    if (req.method === "OPTIONS") {
        res.end();
    } else {
        next();
    }
});

app.use('/', [
    new PeerController().getRouter()
]);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //var err = new Error('Not Found');
    //err.status = 404;
    let err = new serviceException("ERR_404");
    next(err);
});

// error handlers

app.use(function (err, req, res, next) {
    if (err instanceof serviceException) {
        // res.status(err.exceptionConfig.statusCode);
        res.status(500);
        res.jsonp(err);
    } else {
        res.status(500);
        winston.error(err);
        res.jsonp(new serviceException("ERR_500"));
    }
});

function start() {
    /**
     * Get port from environment and store in Express.
     */

    let port = normalizePort(config.servicePort || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */

    let server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    process.on('unhandledRejection', (reason, p) => {
        winston.error(`Unhandled Rejection at: Promise ${p} reason: ${reason}`);
    });

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        winston.info("API Server started at " + config.servicePort);
    }

}

module.exports = {
    start: start
};
