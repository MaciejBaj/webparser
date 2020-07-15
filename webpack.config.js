const path = require('path');

module.exports = {
    target: 'web', // <=== can be omitted as default is 'web'
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js',
    },
};
