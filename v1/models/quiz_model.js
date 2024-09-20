const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // Automatically generate ID
  },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [QuestionSchema],
});

module.exports = mongoose.model("Quiz", QuizSchema);
