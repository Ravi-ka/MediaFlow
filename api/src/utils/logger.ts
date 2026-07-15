import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "info",
    format: format.json(),
    defaultMeta: { service: "user-service" },
    transports: [],
});


if(process.env.NODE_ENV !== 'production'){
    logger.add(
        new transports.Console({
            format: format.simple(),
        })
    );
}

export default logger;