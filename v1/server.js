import express from "express";
import cors from "cors";
import dotenv from "dotenv/config"; // This loads your environment variables
import usersRouter from "./routes/user_router.js"; // Include the .js extension
import admin from "./routes/admin_router.js"; // Include the .js extension
import quizzes from "./routes/quiz_router.js"; // Include the .js extension

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.json({
    api_version: "v1",
    success: true,
    info: "Node.js, Express, And MongoDB API (Developed By Deepak Gupta)",
  });
});

app.use("/users", usersRouter);
app.use("/admin", admin);
app.use("/quizzes", quizzes);

export default app; // Use export default instead of module.exports
