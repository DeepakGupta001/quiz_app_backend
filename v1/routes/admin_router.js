const express = require("express");
const router = express.Router();
const {
  create_admin,login_admin
} = require("../controllers/admin_controller");

router.post("/login", login_admin);
router.post("/register", create_admin);

module.exports = router;
