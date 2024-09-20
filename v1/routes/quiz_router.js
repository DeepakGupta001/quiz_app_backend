import express from "express";
const router = express.Router();
import quiz from "../controllers/quiz_controller.js";
const {
  create_quiz_controller,
  get_quizzes_controller,
  update_quiz_controller,
  delete_quiz_controller,
  submit_quiz_controller,
} = quiz;
import authenticateAdmin from "../middleware/auth.js";

router.post("/", authenticateAdmin, create_quiz_controller);
router.post("/submit", submit_quiz_controller);
router.get("/", get_quizzes_controller);
router.put("/:id", authenticateAdmin, update_quiz_controller);
router.delete("/:id", authenticateAdmin, delete_quiz_controller);

export default router;
