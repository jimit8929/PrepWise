import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({id : userId} , process.env.JWT_SECRET , {expiresIn: "7d"});
};


export const registerUser = async(req , res) => {
  try{
    const {name , email , password , profileImageUrl} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({message : "User Already Exists"});
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const user = await User.create({
      name,
      email,
      password : hashedPassword,
      profileImageUrl,
    })

    res.status(201).json({
      _id : user._id,
      name : user.name,
      email : user.email,
      profileImageUrl : user.profileImageUrl,
      token : generateToken(user._id), 
    });

    // no need to login, signup will automatically redirect user to the home/dashboard page
    //signup karne k baad wapis login nai karan padega 
  }
  catch(error){
    res.status(500).json({message : "server error" , error:error.message});
  }
}


export const loginUser = async(req , res) => {
  try{
    const {email , password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(500).json({message : "Invalid email or password"});
    }

    const isMatchPassword = await bcrypt.compare(password , user.password);

    if(!isMatchPassword){
      res.status(500).json({message : "Invalid email"});
    }

    res.json({
      _id : user._id,
      name:user.name,
      email:user.email,
      profileImageUrl : user.profileImageUrl,
      token:generateToken(user._id)
    });
  }
  catch(error){
    res.status(500).json({message : "server error" , error:error.message});
  }
}


export const getUserProfile = async(req , res) => {
  try{
    const user = await User.findById(req.user.id).select("-password");

    if(!user){
      return res.status(404).json({message: "User not Found"});
    }

    res.json(user);
  }
  catch(error){
    res.status(500).json({message : "Server error" , error : error.message});
  }
}

