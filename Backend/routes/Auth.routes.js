import express from "express";

import {registerUser , loginUser , getUserProfile} from "../controllers/Auth.controller.js";

import protect from "../middlewares/Auth.middleware.js";
import upload from "../middlewares/Upload.middleware.js";

const router = express.Router();

router.post("/register" , registerUser);
router.post('/login' , loginUser);
router.get("/profile" , protect , getUserProfile);
router.post("/upload-image" , upload.single("image") , (req , res) => {
  if(!req.file){
    return res.status(400).json({message : "No file Uploaded"});
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({imageUrl});
})

export default router;