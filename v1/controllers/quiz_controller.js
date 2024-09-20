const Quiz = require("../models/quiz_model");
const User = require("../models/user_model");

const get_quizzes_controller = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      // Find quiz by ID and exclude the 'correctAnswer' field
      const quiz = await Quiz.findById(id)
        .select("-questions.correctAnswer") // Exclude correctAnswer from questions
        .exec();

      if (!quiz) {
        return res
          .status(404)
          .json({ success: false, message: "Quiz not found" });
      }

      return res.status(200).json({ success: true, data: quiz });
    } else {
      // Find all quizzes and exclude the 'correctAnswer' field from each quiz's questions
      const quizzes = await Quiz.find()
        .select("-questions.correctAnswer") // Exclude correctAnswer from all quizzes
        .exec();

      return res.status(200).json({ success: true, data: quizzes });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const create_quiz_controller = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ success: true, data: quiz });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const update_quiz_controller = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).exec();
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const delete_quiz_controller = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByIdAndDelete(id).exec();
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const submit_quiz_controller = async (req, res) => {
  const { userId, quizId, answers, timeTaken } = req.body;

  try {
    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    let score = 0;
    const correctAnswers = [];

    // Iterate over questions and calculate the score
    quiz.questions.forEach((question, index) => {
      correctAnswers.push(question.correctAnswer); // Collect correct answers
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    // Calculate the percentage
    const percentage = (score / quiz.questions.length) * 100;

    // Save the quiz result to the user profile (assumes a quizzes array in User schema)
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          quizzes: {
            quizId,
            timeTaken,
            score,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    // Return the correct answers, score, percentage, and time taken in the response
    return res.status(200).json({
      success: true,
      score,
      correctAnswers,
      timeTaken,
      percentage,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  create_quiz_controller,
  get_quizzes_controller,
  update_quiz_controller,
  delete_quiz_controller,
  submit_quiz_controller,
};
