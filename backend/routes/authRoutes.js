import express from "express";
import { signup, signin, google } from "../controllers/authController.js";

const router = express.Router();

// ---- Auth - router
router.post("/signup", signup);
// username, email, password

router.post("/signin", signin);
// email, password

router.post("/google", google);
// email

export default router;
