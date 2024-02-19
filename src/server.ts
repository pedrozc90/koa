import http from "http";

import { settings, logger } from "./config";
import { db } from "./config";
import { init } from "./app";

const { env, name, port, version } = settings;

const main = async () => {
    try {
        const data_source = await db.initialize();
        if (data_source.isInitialized) {
            logger.info("TypeORM data source initialized.");
        }

        const app = await init();
        const server: http.Server = app.listen(port);

        if (require.main === module) {
            server.on("listening", () => {
                if (!server.listening) return;

                const addr = server.address();

                const bind = (addr) ? (typeof addr === "string" ? `Pipe ${addr}` : `http://${addr.address}:${addr.port}`) : null;

                logger.info("----------------------------------------------------------------------");
                logger.info(`Application running on ${bind}`);
                logger.info("To shut it down, press CTRL + C at any time.");
                logger.info("----------------------------------------------------------------------");
                logger.info(`Application ${name} v${version} running as ${env} mode.`);
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

        return server;
    } catch (err) {
        logger.error(`Failed to initialize data source. Reason: ${err}`);
    }
}

main();
