var path = require('path');
require('dotenv').config({ path: './config.env' });
module.exports = {
    entry: {
        main:'./server.js'
    },
    env:{
        ATLAS_URI : process.env.ATLAS_URI,
        PORT : process.env.PORT
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