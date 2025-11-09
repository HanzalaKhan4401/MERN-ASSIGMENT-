import express from 'express';
import userController from '../controllers/userController.mjs';

const userRouter = express.Router();

userRouter

//Get Requests
.get("/", userController.index)

//Post Requests
.post("/signup", userController.Signup)
.post("/login", userController.login)
.post("/sendEmail", userController.sendEmail)

export default userRouter; 