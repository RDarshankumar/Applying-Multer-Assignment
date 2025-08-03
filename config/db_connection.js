const mongoose = require("mongoose")
require("dotenv").config()


mongoose.connect(process.env.MONGO_DB).then(()=>{
console.log("Connected DB Connection");

}).catch((err)=>{
console.log("Error",err);

})

module.exports = mongoose.connection