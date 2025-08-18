import express from "express";

import {togglePinQuestion , updateQuestionNote , addQuestionsToSession} from "../controllers/Questions.controller.js"

import protect from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/add" , protect , addQuestionsToSession);
router.post("/:id/pin" , protect , togglePinQuestion);
router.post("/:id/note" , protect , updateQuestionNote);

export default router;