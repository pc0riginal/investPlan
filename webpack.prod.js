var path = require('path');

module.exports = {
    entry: {
        main:'./server.js'
    },
    output: {
        path: path.resolve(__dirname, "dist-prod"),
        publicPath: "/dist/",
        filename: "dist.js",
        clean:true
    },
    mode:'production',
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