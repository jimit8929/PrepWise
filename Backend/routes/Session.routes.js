import express from "express"

import {createSession , getSessionById , getMySessions , deleteSession} from "../controllers/Session.controller.js"

import protect from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/create" , protect , createSession);
router.get("/my-sessions" , protect , getMySessions);
router.get("/:id" , protect , getSessionById);
router.delete("/:id", protect , deleteSession);


export default router;