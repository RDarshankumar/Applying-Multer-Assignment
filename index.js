const express = require("express");
const app = express();
const db = require("./config/db_connection");
require("dotenv").config()
const registerRouter = require('./routes/userRoutes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',registerRouter)
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("Wellcome To Karachi");
});

app.listen(3000, () => {
  console.log("Server is Runing");
});
