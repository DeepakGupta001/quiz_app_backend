const express = require("express");
const router = express.Router();
const {
  create_quiz_controller,
  get_quizzes_controller,
  update_quiz_controller,
  delete_quiz_controller,
  submit_quiz_controller
} = require("../controllers/quiz_controller");
const authenticateAdmin = require("../middleware/auth");

router.post("/", authenticateAdmin, create_quiz_controller);
router.post("/submit", submit_quiz_controller);
router.get("/", get_quizzes_controller);
router.put("/:id", authenticateAdmin, update_quiz_controller);
router.delete("/:id", authenticateAdmin, delete_quiz_controller);

module.exports = router;
