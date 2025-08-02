const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/multer").then(()=>{
console.log("Connected DB Connection");

}).catch((err)=>{
console.log("Error",err);

})

module.exports = mongoose.connection