const fs = require("fs");
const path = require("path");

class Logger {

    static log(message) {
        const timestamp = new Date().toISOString();
        const msg = `[${timestamp}] ${message}`;

        console.log(msg);

        const logFile = path.join("logs", "execution.log");

        fs.appendFileSync(logFile, msg + "\n", "utf8");
    }
}

module.exports = Logger;
