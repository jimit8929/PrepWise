import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv"
import connectDB from "./config/DB.config.js";
import { fileURLToPath } from "url";

//importing Routes
import authRoutes from "./routes/auth.routes.js";
import protect from "./middlewares/Auth.middleware.js";
import sessionRoutes from "./routes/Session.routes.js"


const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware to handle cors
app.use(cors({
  origin:"*",
  methods:["GET" , "POST" , "PUT" , "DELETE"],
  allowedHeaders: ["Content-Type" , "Authorization"],
})
);

dotenv.config();
connectDB();



//Middleware
app.use(express.json());


//Routes
app.use("/api/auth" , authRoutes);
app.use("/api/sessions" , sessionRoutes);
// app.use("/api/question", questionRoutes);

// app.use("api/ai/generate-questions" , protect , generateInterviewQuestions);

// app.use("/api/ai/generate-explanation" , protect , generateConceptExplanantion);




//Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
  console.log(`Server is running on PORT ${PORT}`);
})
