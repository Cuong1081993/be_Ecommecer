import express from "express";
import { validateSignUp, validateLogin } from "../middlewares/validate.js";
import { login, register, postLogout } from "../controller/auth.js";
const router = express.Router();

router.post("/register", validateSignUp, register);
router.post("/login", validateLogin, login);
router.post("/logout", postLogout);

export default router;
