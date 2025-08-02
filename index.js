const express = require("express")
const app = express()
const db = require('./config/db_connection')

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get("/",(req,res)=>{
res.send("Wellcome To Karachi")
})

app.listen(3000)