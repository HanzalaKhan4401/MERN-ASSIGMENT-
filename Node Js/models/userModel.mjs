import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: [true, "Username Is Required"] },
  email: {
    type: String,
    RegExp: /.+\@.+\..+/,
    required: [true, "Email Is Required"],
  },
  password: { type: String, required: [true, "Password Is Required"] },
  profilePicture: { type: String },
  role: { type: String, default: "user" },
  isVeriffied: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});
 
const User = mongoose.model("User", userSchema);
export default User;
