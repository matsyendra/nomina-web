const path = require('path')
module.exports = {
    entry: {
        app: ['./public/main.js']
    },
    output: {
        path: path.resolve( __dirname, 'dist'),
        filename: 'bundled.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }]
    }
}