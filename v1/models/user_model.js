const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quizzes: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quiz',
          required: true,
        },
        timeTaken: { type: Number, required: true },
        score: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
