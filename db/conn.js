const mongoose = require('mongoose')
module.exports = {
    connect: function connect() {
        const uri = process.env.ATLAS_URI;
        return new Promise((resolve, reject) => {
            // MongoClient.connect(uri)
            //     .then(function (client) {
            //         resolve(client)
            //     }).catch(function (err) { reject(err) });
            mongoose.connect(uri, { useNewUrlParser: true })
            .then((e)=>{
                const client = mongoose.connection
                resolve(client)
            })
            .catch((e)=>reject(e))
        })
    }
}