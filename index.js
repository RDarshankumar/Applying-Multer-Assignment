const express = require("express")
const app = express()


app.get("/",(req,res)=>{
res.send("Wellcome To Karachi")
})

app.listen(3000)