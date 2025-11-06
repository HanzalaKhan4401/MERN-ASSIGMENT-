import User from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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

const userController = {
    index,
    Signup,
}
export default userController;