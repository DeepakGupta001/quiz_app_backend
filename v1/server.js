const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const users_router = require("./routes/user_router");
const admin = require("./routes/admin_router");
const quizzes = require("./routes/quiz_router");

app.get("/", (request, response) => {
  response.json({
    api_version: "v1",
    success: true,
    info: "Node.js, Express, And mongodb API (Developed By Deepak Gupta)",
  });
});
app.use("/users", users_router);
app.use("/admin", admin);
app.use("/quizzes", quizzes);

module.exports = app;
