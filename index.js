const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
app.use(cors())

const postsRouter = require("./routes/post");
const user = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(postsRouter);
app.use(user);


mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.listen(process.env.PORTNR, () => {
  console.log("Your app is alive!!!!!");
});