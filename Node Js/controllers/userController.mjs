import User from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
// fecth all Users
let index = async (req, res) => {
    try {
        let users = await User.find();
        if (users) {
            res.status(200).json({message: "Our Users", users:users});
        }else{
            res.status(404).json({message: "No Users Found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
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

const sendEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to send email.",
      error: error.message,
    });
  }
};

const userController = {
    index,
    Signup,
    login,
    sendEmail,
}
export default userController;