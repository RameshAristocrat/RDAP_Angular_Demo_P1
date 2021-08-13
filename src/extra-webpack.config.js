const webpack = require('webpack');

module.exports = {
plugins: [new webpack.DefinePlugin({
    'process.env': {
        KEY_TO_READ: JSON.stringify(process.env.KEY_TO_READ),
    }
})]
}