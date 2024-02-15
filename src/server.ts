import http from "http";
import config from "./config";
import logger from "./logger";
import app from "./app";

const env = config.env;
const port = config.port;
const version = config.version;

const server: http.Server = app.listen(port, "127.0.0.1");

if (require.main === module) {
    server.on("listening", () => {
        if (!server.listening) return;

        const addr = server.address();

        const bind = (addr) ? (typeof addr === "string" ? `Pipe ${addr}` : `http://${addr.address}:${addr.port}`) : null;

        logger.info("----------------------------------------------------------------------");
        logger.info(`Application running on ${bind}`);
        logger.info("To shut it down, press CTRL + C at any time.");
        logger.info("----------------------------------------------------------------------");
        logger.info(`Application ${config.name} v${config.version} running as ${config.env} mode.`);
        logger.info("----------------------------------------------------------------------");
    });

    server.on("error", (error: Error | any) => {
        if (error.syscall !== "listen") {
            throw error;
        }

        const bind: string = (typeof port === "string") ? "Pipe " + port : "Port " + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
            // break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
            // break;
            default:
                throw error;
        }
    });
}

export default server;
