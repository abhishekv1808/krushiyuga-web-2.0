const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'debug.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    console.log(message); // Still log to console
    
    try {
        fs.appendFileSync(logFile, logMessage);
    } catch (error) {
        console.error('Failed to write to log file:', error);
    }
}

module.exports = { log };
