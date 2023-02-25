var path = require('path');

module.exports = {
    entry: {
        main:'./server.js'
    },
    output: {
        path: path.resolve(__dirname, "dist-dev"),
        publicPath: "/dist/",
        filename: "dist.js",
        clean:true
    },
    mode:'development',
    target:'node',
    module: {
        rules:[
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
}