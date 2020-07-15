const Crawler = require('crawler');
const perf = require('execution-time')(console.warn);

const log = console.log;

const crawler = new Crawler({
    maxConnections: 10,
});

const TIMEOUT = 1000;

const sleep = async timeout => new Promise(r => setTimeout(r, timeout));

module.exports = {
    log,
    TIMEOUT,
    perf,
    sleep,
    crawler,
};
