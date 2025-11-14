import express from "express";
import userController from "../controllers/userController.mjs";

const orderRoutes = express.Router();

orderRoutes

//Order Routes
.post("/create", userController.createOrder) // Place a new order
.get("/", userController.getAllOrders) // Admin: get all orders
.get("/:id", userController.getOrderById) // Single order
.get("/user/:email", userController.getOrdersByEmail) // User orders by email
.put("/:id/status", userController.updateOrderStatus) // Update order status
.post("/logout", userController.logoutUser)



export default orderRoutes;