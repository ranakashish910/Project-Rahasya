const mongoose = require('mongoose')
const dns = require("dns")
dns.setServers(['8.8.8.8','8.8.4.4'])
const connectDb = async () => {
    console.log(process.env.MONGO_STRING);
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        
        console.log("Connected Successfully")
    } catch (err) {
        console.log("error in connecting db \n", err.message)
    }
}
module.exports = connectDb