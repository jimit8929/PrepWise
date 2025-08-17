import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    role: { type: String, required: true },

    experience: { type: String, required: true },

    topicsToFocus: { type: String, required: true },

    description: String,

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);

export default Session;
