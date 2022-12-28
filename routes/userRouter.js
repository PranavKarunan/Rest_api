import express from 'express';
import {
  register,
  login,
  resetPassword,
  userList,
} from "../controller/userController.js";

const router = express.Router();

router.post('/register',register)
router.post("/login", login);
router.put('/forgotPassword',resetPassword)
router.get('/allUsers',userList)

export default router