import User from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Order from "../models/Order.mjs";
dotenv.config();
// fecth all Users
let index = async (req, res) => {
  try {
    let users = await User.find();
    if (users) {
      res.status(200).json({ message: "Our Users", users: users });
    } else { 
      res.status(404).json({ message: "No Users Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Signup User
let Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // checking if the user doesn't exist
    let checkUser = await User.findOne({ email: email });
    if (checkUser) {
      res.status(200).json({
        message: "User already exist from this email. Please login..!",
      });
    } else {
      // hashing the password
      const hashPassword = bcrypt.hashSync(password, 10);
      console.log(hashPassword);
      let newUser = new User({
        username,
        email,
        password: hashPassword,
      });
      let adduser = await newUser.save();
      if (adduser) {
        res
          .status(201)
          .json({ message: "Registration is sucessfull.", user: adduser });
      } else {
        res.status(500).json({ message: "Failed to register user" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

let login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ check if user exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please signup..!" });
    }

    // ✅ check password
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // ✅ generate token
    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login success!",
      user: checkUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//send email

const sendEmail = async (mailDetails) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  let sendMailStatus = await transporter.sendMail({
    from: `"${mailDetails.subject}" <${process.env.USER_EMAIL}>`,
    to: mailDetails.to,
    subject: mailDetails.subject,
    html: mailDetails.html,
  });
  if (sendMailStatus) {
    return true;
  } else {
    return false;
  }
};

// Delete User
let deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let deleteuser = await User.findByIdAndDelete(id);
    if (!deleteuser) {
      res.status(404).json({ message: "User Not Found...!" });
    } else {
      res.status(200).json({ message: "User Deleted Successfully...!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//edit user
let editUser = async (req, res) => {
  try {
    let id = req.params.id;
    let edituser = await User.findByIdAndUpdate(id, req.body);
    if (!edituser) {
      res.status(404).json({ message: "User Not Found...!" });
    } else {
      res.status(200).json({ message: "User Updated Successfully...!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Pasword
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token & Password Is Required...!" });
    }

    // Hash the token to compare with stored hash
    const crypto = await import("crypto");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find User with this token and check if it's not required
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ mesage: "Invalid Or Expaired Reset Token...!" });
    }

    // Hash The New Password
    const bcrypt = await import("bcrypt");
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    // update user password and clear reset token
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    //send confermation email
    const html = `<div style="font-family:Arial,sans-serif;padding:32px;background:#f7f7fa;border-radius:12px;max-width:520px;margin:auto;box-shadow:0 2px 8px #0001;">
        <h2 style="color:#07be8a;text-align:center;margin-bottom:24px;">Password Reset Successful</h2>
        <p style="font-size:16px;color:#222;margin-bottom:16px;">Dear <b>${
          user.name
        }</b>,</p>
        <div style="background:#fff;border-radius:8px;padding:20px 24px;margin-bottom:20px;border:1px solid #eee;">
          <p style="font-size:15px;color:#333;line-height:1.6;">Your password has been successfully reset. You can now sign in to your account with your new password.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${
              process.env.FRONTEND_URL || "http://localhost:5000"
            }/signin" style="background:#07be8a;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">Sign In</a>
          </div>
          <p style="font-size:14px;color:#666;margin-top:16px;">If you didn't request this password reset, please contact our support team immediately.</p>
        </div>
        <hr style="margin:24px 0;"/>
        <p style="font-size:12px;color:#888;text-align:center;">&copy; ${new Date().getFullYear()} Hotel Management System</p>
      </div>`;

    let sendMailStatus = await sendEmail({
      to: user.email,
      subject: "Password Reset Successfully - Fusion Fabrics",
      html: html,
    });

    if (sendMailStatus) {
      res.status(200).json({ message: "Password Reset Successfully...!" });
    } else {
      res.status(500).json({ message: "Failed to send an email...!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error...!" });
  }
};

// Forgot Password Funcctionality
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email Is Required...!" });
    }
    // Find User By Email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found With This Email Address...!" });
    }

    // Generate Reset Token

    const crypto = await import("crypto");
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // set token expairy (1 hour from now)
    const resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000);

    //save token to user
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // create reset url
    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:5000"
    }/reset-password?token=${resetToken}`;

    // email content
    const html = `<div style="font-family:Arial,sans-serif;padding:32px;background:#f7f7fa;border-radius:12px;max-width:520px;margin:auto;box-shadow:0 2px 8px #0001;">
        <h2 style="color:#07be8a;text-align:center;margin-bottom:24px;">Password Reset Request</h2>
        <p style="font-size:16px;color:#222;margin-bottom:16px;">Dear <b>${
          user.name
        }</b>,</p>
        <div style="background:#fff;border-radius:8px;padding:20px 24px;margin-bottom:20px;border:1px solid #eee;">
          <p style="font-size:15px;color:#333;line-height:1.6;">You requested a password reset for your account. Click the button below to reset your password:</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${resetUrl}" style="background:#07be8a;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">Reset Password</a>
          </div>
          <p style="font-size:14px;color:#666;margin-top:16px;">If you didn't request this password reset, please ignore this email.</p>
          <p style="font-size:14px;color:#666;">This link will expire in 1 hour.</p>
        </div>
        <p style="font-size:14px;color:#555;text-align:center;margin-top:24px;">If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="font-size:12px;color:#888;text-align:center;word-break:break-all;">${resetUrl}</p>
        <hr style="margin:24px 0;"/>
        <p style="font-size:12px;color:#888;text-align:center;">&copy; ${new Date().getFullYear()} Hotel Management System</p>
      </div>`;

    //send email

    let sendMailStatus = await sendEmail({
      to: user.email,
      subject: "Password Reset Request - Fusion Fabrics",
      html: html,
    });

    if (sendMailStatus) {
      res
        .status(200)
        .json({
          message: "Password Reset Email Sent Successfully...!",
          message:
            "If An Account With That Email Exists, A Password Reset Link Has Been Sent...!",
        });
    } else {
      res.status(500).json({ message: "Failed to send an email...!" });
    }
  } catch (error) {
    console.log("Forgot Password Error:", error);
    res.status(500).json({ message: "Error Sending Password Reset Email...!" });
  }
};

// ✅ Create a new order
const createOrder = async (req, res) => {
  try {
    const { customer, items, paymentMethod, summary } = req.body;

    if (!customer || !items || items.length === 0 || !summary) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const order = new Order({ customer, items, paymentMethod, summary });
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error while creating order" });
  }
};

// ✅ Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while fetching orders" });
  }
};

// ✅ Get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while fetching order" });
  }
};

// ✅ Get orders by email
const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ "customer.email": email }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while fetching user orders" });
  }
};

// ✅ Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status || order.status;
    await order.save();

    res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while updating status" });
  }
};


// In-memory token blacklist
let tokenBlacklist = [];

const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Add token to blacklist
    tokenBlacklist.push(token);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

// exporting all functions
const userController = {
  index,
  Signup,
  login,
  sendEmail,
  deleteUser,
  editUser,
  resetPassword,
  forgotPassword,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByEmail,
  updateOrderStatus,
  logoutUser,
   
};
export default userController;
