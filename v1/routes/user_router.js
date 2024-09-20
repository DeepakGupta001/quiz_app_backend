const express = require("express");
const router = express.Router();
const {
  create_user_controller,
  get_user_controller,
  update_user_controller,
} = require("../controllers/user_controller");

router.get("/", get_user_controller);
router.post("/", create_user_controller);
router.put("/:id", update_user_controller);

module.exports = router;
