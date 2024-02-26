import * as functions from "firebase-functions";

export const logError = (...args: any[]) => {
    return functions.logger.error(args);
}

export const logWarning = (...args: any[]) => {
    return functions.logger.warn(args);
}

export const logInfo = (...args: any[]) => {
    return functions.logger.info(args);
}

export const logDebug = (...args: any[]) => {
    return functions.logger.debug(args);
}

export const logMessage = (...args: any[]) => {
    return functions.logger.log(args);
}

export const logWrite = (write: any) => {
    return functions.logger.write(write);
}