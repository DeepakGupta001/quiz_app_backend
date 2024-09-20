import express from "express";
const router = express.Router();

import userController from "../controllers/user_controller.js"; // Import the default export

const { 
  create_user_controller, 
  get_user_controller, 
  update_user_controller 
} = userController; // Destructure the functions

router.get("/", get_user_controller);
router.post("/", create_user_controller);
router.put("/:id", update_user_controller);

export default router;