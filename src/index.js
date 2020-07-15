const { providers } = require('./providers');
const { log, TIMEOUT, perf, sleep, crawler } = require('./utils');

// Parse node-crawler response looking for info from providers.schema.
function parse(provider, res) {
    log(`Parsing website of ${provider.name}`);
    // $ is Cheerio by default
    //a lean implementation of core jQuery designed specifically for the server
    const $ = res.$;
    // There is also entire website as HTML text in res.body -- possible experimenting with other static html/static parsers.
    return Object.entries(provider.schema).reduce((acc, [key, selector]) => {
        acc[key] = $(`[${selector}]`).text();
        return acc;
    }, {});
}

function crawl(providers, cb) {
    log(`Get websites of given ${providers.length} provider(s)`);
    providers.map(provider =>
        // Make HTTP Request for a content. Otherwise, when `http` is set, access the static content that must be provided.
        crawler.queue({
            uri: provider.html ? undefined : provider.uri,
            html: provider.html,
            callback: (...arguments) => {
                return cb(provider, ...arguments);
            },
        })
    );
}

async function forever() {
    await new Promise((resolve, reject) => {
        crawl(providers, (provider, error, res, done) => {
            if (error) {
                return reject(new Error(error));
            }
            // Time start for parse
            perf.start();
            const info = parse(provider, res);
            // Time stop for parse + print the res in ms.
            perf.stop();

            // Debug parsed info
            console.log(provider.name, info);
            done();
            return resolve();
        });
    });
    log(`End of test round. Sleeping for ${TIMEOUT/1000} sec.`);
    await sleep(TIMEOUT);
    return await forever();
}

forever()
    .catch(console.error)
    .finally(() => {
        process.exit(0);
    });
