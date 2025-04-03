import mongoose from "mongoose";

//contains all fields of a document and its type
const userModel = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  passwd: {
    type: String,
    required: [true, "Please provide a password"],
  },
  username: {
    type: String,
    required: [true, "Please provide a unique username"],
    unique: true,
  },
  date_of_birth: {
    type: Date,
    required: [true, "Please provide a date of birth"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

//if model already exists no need to recreate it so we used below logic
export const User =
  mongoose.models.userprofiles || mongoose.model("userprofiles", userModel); //collection Name, model -> keep collection name always lowecase
