import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quizzes: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
          required: true,
        },
        timeTaken: { type: Number, required: true },
        score: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
