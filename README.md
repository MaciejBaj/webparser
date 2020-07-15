## Webparser

A simple wrapper on top of [node-crawler](https://github.com/bda-research/node-crawler).

Webparser makes HTTP request for each uri of `providers`. If `html` field is present refers to a static HTML side, `html`static content will have a priority over `uri`. 
After `crawl` gets the content, `parse` looks for the info using jQuery-like selectors thanks to [cheerio](https://github.com/cheeriojs/cheerio).
Which info to parse is defined in `provider` data too under `schema` key.

The goal was to be able to run a code in both NodeJS and browsers - webpack parsing and public file are there, but `node-crawler` has 2 dependencies that won't go through - `tls` and `fs`. This should be mitigated if needed. 

```js
const { mobile_de_static_html } = require('./fixtures/static_html.fixtures');

const providers = [
    {
        name: 'mobile.de',
        html: mobile_de_static_html,
        uri: 'https://suchen.mobile.de/...',
        schema: {
            // Those will go to the jQuery selector by attributes: $("[id=choose]"
            title: 'id="rbt-ad-title"',
            kategorie: 'id="rbt-category-v"',
            fahrzeugnummer: 'id="rbt-db-sku"',
            anbieter: 'id="dealer-hp-link-bottom"',
        },
    },
];

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
```

Benchmarks will be crucial and will have to be tested. If turns out the current example is too slow, it will be necessary to replace [node-crawler](https://github.com/bda-research/node-crawler) with something custom. 

Parsing is measured and takes usually between 2ms - 13ms.
