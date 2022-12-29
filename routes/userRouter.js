import express from 'express';
import {
  register,
  login,
  resetPassword,
  userList,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register',register)
router.post("/login", login);
router.put('/forgotPassword',resetPassword)
router.get("/allUsers", protect, userList);

export default router