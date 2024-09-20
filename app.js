require("dotenv").config();
const express = require("express");
const app = express();
const v1 = require("./v1/server");
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use("/v1", v1);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server start on ${port}`);
});
