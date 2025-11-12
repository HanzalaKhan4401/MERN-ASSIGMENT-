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
  //Forgot Routers
  .post("/auth/reset-password", userController.resetPassword)
  .post("/auth/forgot-password", userController.forgotPassword)


  //delete Requests
  .delete("/deleteuser/:id", userController.deleteUser)

  //Patch Requests
  .patch("/edituser/:id", userController.editUser)
export default userRouter; 