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
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  let sendMailStatus = await transporter.sendMail({
    from: `"Verify Email" <${process.env.USER_EMAIL}>`,
    to: req.body.email,
    subject: req.body.subject,
    html: `<!doctype html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  <title>Welcome to HN Mart</title>
  <style>
    /* Email-safe, inline styles will be repeated in body where needed; include minimal in head */
    body { margin:0; padding:0; background-color:#f4f6f8; }
    img { border:0; display:block; }
    a { color:#1a73e8; text-decoration:none; }
  </style>
</head>
<body style='margin:0; padding:20px; background-color:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;'>
  <!-- Centering wrapper -->
  <table role='presentation' cellpadding='0' cellspacing='0' width='100%' style='max-width:680px; margin:0 auto;'>
    <tr>
      <td style='padding:24px 0; text-align:center;'>
        <!-- Card container -->
        <table role='presentation' cellpadding='0' cellspacing='0' width='100%' style='background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 18px rgba(11, 22, 39, 0.06);'>

          <!-- Header / Logo -->
          <tr>
            <td style='padding:28px 28px 8px 28px; text-align:left;'>
              <img src='https://via.placeholder.com/160x40?text=HN+Mart' alt='HN Mart' width='160' style='display:block;'>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style='padding:12px 28px 0 28px;'>
              <h1 style='margin:0; font-size:22px; line-height:1.2; color:#0b2a48;'>Welcome to HN Mart, {{first_name}} 🎉</h1>
              <p style='margin:12px 0 0 0; font-size:15px; color:#516276;'>Thanks for joining HN Mart — your friendly neighbourhood online store for quality groceries, home essentials, and daily deals. We’re excited to have you with us.</p>
            </td>
          </tr>

          <!-- Offer / CTA -->
          <tr>
            <td style='padding:18px 28px;'>
              <table role='presentation' cellpadding='0' cellspacing='0' width='100%'>
                <tr>
                  <td style='background:#f3f9ff; padding:16px; border-radius:8px; text-align:center;'>
                    <p style='margin:0; font-size:16px; color:#0b2a48;'><strong>Enjoy 15% off</strong> your first order — use code <span style='background:#e8f1ff; padding:4px 8px; border-radius:4px;'>WELCOME15</span></p>
                    <div style='height:12px;'></div>
                    <a href='{{cta_url}}' style='display:inline-block; padding:12px 20px; border-radius:8px; background:#0b79ff; color:#ffffff; font-weight:600; text-decoration:none;'>Start Shopping</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Highlights -->
          <tr>
            <td style='padding:10px 28px 22px 28px;'>
              <table role='presentation' cellpadding='0' cellspacing='0' width='100%'>
                <tr>
                  <td style='vertical-align:top; padding:8px; width:50%;'>
                    <strong style='display:block; font-size:14px; color:#0b2a48;'>Fast delivery</strong>
                    <p style='margin:6px 0 0 0; font-size:13px; color:#516276;'>Get fresh items delivered to your door within hours.</p>
                  </td>
                  <td style='vertical-align:top; padding:8px; width:50%;'>
                    <strong style='display:block; font-size:14px; color:#0b2a48;'>Best prices</strong>
                    <p style='margin:6px 0 0 0; font-size:13px; color:#516276;'>Daily deals and value packs for your budget.</p>
                  </td>
                </tr>
                <tr>
                  <td style='vertical-align:top; padding:8px; width:50%;'>
                    <strong style='display:block; font-size:14px; color:#0b2a48;'>Easy returns</strong>
                    <p style='margin:6px 0 0 0; font-size:13px; color:#516276;'>Hassle-free returns within 7 days.</p>
                  </td>
                  <td style='vertical-align:top; padding:8px; width:50%;'>
                    <strong style='display:block; font-size:14px; color:#0b2a48;'>Secure payments</strong>
                    <p style='margin:6px 0 0 0; font-size:13px; color:#516276;'>Multiple payment options with secure checkout.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Secondary CTA / Button -->
          <tr>
            <td style='padding:0 28px 20px 28px; text-align:center;'>
              <a href='{{shop_now_url}}' style='display:inline-block; padding:10px 18px; border-radius:8px; border:1px solid #0b79ff; color:#0b79ff; text-decoration:none; font-weight:600;'>Browse Categories</a>
            </td>
          </tr>

          <!-- Footer inside card -->
          <tr>
            <td style='padding:0 28px 28px 28px; font-size:13px; color:#8899aa;'>
              <p style='margin:0 0 8px 0;'>Need help? Reply to this email or visit our <a href='{{help_center_url}}'>Help Center</a>.</p>
              <p style='margin:0;'>Order tracking: <a href='{{tracking_url}}'>Track your orders</a></p>
            </td>
          </tr>

        </table>

        <!-- Small footer outside card -->
        <table role='presentation' cellpadding='0' cellspacing='0' width='100%' style='margin-top:12px;'>
          <tr>
            <td style='text-align:center; font-size:12px; color:#99a6b3;'>
              <p style='margin:6px 0 4px 0;'>Follow us</p>
              <!-- Social icons (these can be replaced with real icons) -->
              <p style='margin:0;'>
                <a href='{{facebook_url}}' style='margin:0 8px;'>Facebook</a> ·
                <a href='{{instagram_url}}' style='margin:0 8px;'>Instagram</a> ·
                <a href='{{twitter_url}}' style='margin:0 8px;'>X</a>
              </p>
              <p style='margin:10px 0 0 0;'>HN Mart • 123 Market Street • City, Country</p>
              <p style='margin:6px 0 0 0;'>If you prefer not to receive these emails, <a href='{{unsubscribe_url}}'>unsubscribe</a>.</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`,
  });
  if (sendMailStatus) {
    res.status(200).json({ message: "Email sent successfully" });
  } else {
    res.status(400).json({ message: "Email sending failed" });
  }
};

// const sendEmail = async (req, res) => {
//   const { to, subject, message } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text: message,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Failed to send email.",
//       error: error.message,
//     });
//   }
// };

// delete user 

let deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let deleteuser = await User.findByIdAndDelete(id);
    if(!deleteuser){
      res.status(404).json({message: "User Not Found...!"});
    }else{
      res.status(200).json({message: "User Deleted Successfully...!"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}

//edit user 
let editUser = async (req, res) =>{
  try {
    let id = req.params.id;
    let edituser = await User.findByIdAndUpdate(id, req.body);
    if(!edituser){
      res.status(404).json({message: "User Not Found...!"});
    }else{
      res.status(200).json({message: "User Updated Successfully...!"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

// Reset Pasword
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if(!token || !password){
      return res.status(400).json({message: "Token & Password Is Required...!"});
    }
    
    // Hash the token to compare with stored hash
    const crypto = await import('crypto');
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find User with this token and check if it's not required
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user){
      return res.status(400).json({mesage: "Invalid Or Expaired Reset Token...!"});
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
              process.env.FRONTEND_URL || "http://localhost:3000"
            }/signin" style="background:#07be8a;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">Sign In</a>
          </div>
          <p style="font-size:14px;color:#666;margin-top:16px;">If you didn't request this password reset, please contact our support team immediately.</p>
        </div>
        <hr style="margin:24px 0;"/>
        <p style="font-size:12px;color:#888;text-align:center;">&copy; ${new Date().getFullYear()} Hotel Management System</p>
      </div>`;

await sendEmail({
  to: user.email,
  subject: "Password Reset Successfully - Fusion Fabrics",
  html: html,
});
res.status(200).json({message: "Password Reset Successfully...!"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error...!"});
  }
}

// Forgot Password Funcctionality
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if(!email){
      return res.status(400).json({message: "Email Is Required...!"});
    }
    // Find User By Email
    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({message: "User Not Found With This Email Address...!"});
    }

    // Generate Reset Token

    const crypto = await import('crypto');
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // set token expairy (1 hour from now)
    const resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); 

    //save token to user 
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // create reset url 
    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

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

      await sendMail({
        to: user.email,
        subject: "Password Reset Request - Fusion Fabrics",
        html: html,
      });
      res.status(200).json({message: "Password Reset Email Sent Successfully...!", message: "If An Account With That Email Exists, A Password Reset Link Has Been Sent...!"});
  } catch (error) {
    console.log("Forgot Password Error:", error)
    res.status(500).json({message: "Error Sending Password Reset Email...!"})
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
};
export default userController;