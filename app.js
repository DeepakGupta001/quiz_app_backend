import "dotenv/config";
import express from "express";
import v1 from "./v1/server.js"; // Make sure the file extension is included
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();
app.use("/v1", v1);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
