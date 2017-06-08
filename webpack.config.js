/* eslint-disable */
module.exports = (env) => env.prod ?
    require('./webpack.prod.js') : require('./webpack.dev.js');
