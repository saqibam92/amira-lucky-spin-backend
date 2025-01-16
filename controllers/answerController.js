const Answer = require("../models/Answer");

// Save answers
exports.saveAnswers = async (req, res) => {
  const { participantId, answers } = req.body;

  try {
    const answerPromises = answers.map((answer) => {
      const newAnswer = new Answer({
        participantId,
        question: answer.question,
        selectedOption: answer.selectedOption,
        isCorrect: answer.isCorrect,
      });
      return newAnswer.save();
    });

    await Promise.all(answerPromises);

    res.status(201).json({ message: "Answers saved successfully!" });
  } catch (error) {
    console.error("Error saving answers:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
