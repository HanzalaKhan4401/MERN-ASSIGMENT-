import express from "express";
import userController from "../controllers/userController.mjs";

const userRouter = express.Router();

userRouter

  //Get Requests
  .get("/", userController.index)

  //Post Requests
  .post("/signup", userController.Signup)
  .post("/login", userController.login)
  // .post("/sendEmail", userController.sendEmail)
  //Forgot Routers
  .post("/auth/reset-password", userController.resetPassword)
  .post("/auth/forgot-password", userController.forgotPassword)

  //Order Routes
  .post("/create", userController.createOrder) // Place a new order
  .get("/", userController.getAllOrders) // Admin: get all orders
  .get("/:id", userController.getOrderById) // Single order
  .get("/user/:email", userController.getOrdersByEmail) // User orders by email
  .put("/:id/status", userController.updateOrderStatus) // Update order status
  .post("/logout", userController.logoutUser)
  //delete Requests
  .delete("/deleteuser/:id", userController.deleteUser)

  //Patch Requests
  .patch("/edituser/:id", userController.editUser);
export default userRouter;
