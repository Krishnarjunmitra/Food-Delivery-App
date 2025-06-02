
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { response } from "express";


// Login User
const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await userModel.findOne({email});

    if (!user) {
      return res.json({success: false, message:"User doesnot Exists"});
    }

    const isMatched = await bcrypt.compare(password,user.password);

    if (!isMatched) {
      return res.json({success: false, message: "Invalid Credentials! password unmacthed"})
    }

    const token = createToken(user._id);
    res.json({success:true, token})

  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error! Couldn't Login User."})
  }
}

const createToken = (id) => jwt.sign({id}, process.env.JWT_SECRET)

// Register User
const registerUser = async (req,res)=>{
  const {name, password, email} = req.body;
  try {
    // checking is user already exists
    const exists = await userModel.findOne({email});
    if (exists) {
      return res.json({success: false, message: "User already exists"})
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({success: false, message: "Please enter a valid email"})
    }

    // checking password length and strong
    if (password.length < 8) {
      return res.json({success: false, message: "PLease enter a Strong password"})
    }

    // Hashing user Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Saving User to database
    const newUser = new userModel({ name:name, email:email, password:hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({success:true, token})

  } catch (error) {
    console.log(error);
    re.json({success:false, message:"Error! Coudn't registered user."})
  }
}

export { loginUser, registerUser };