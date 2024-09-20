import express from "express";
const router = express.Router();
import admin from "../controllers/admin_controller.js";
const { create_admin, login_admin } = admin;

router.post("/login", login_admin);
router.post("/register", create_admin);

export default router;
