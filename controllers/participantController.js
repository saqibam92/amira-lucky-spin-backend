const Participant = require("../models/Participant");

// Save a new participant
exports.saveParticipant = async (req, res) => {
  const { name, mobile, email } = req.body;

  try {
    // Check if a participant with the same mobile number already exists
     const existingParticipant = await Participant.findOne({ 
      $or: [{ mobile }, { email }] 
    });
    if (existingParticipant) {
      return res.status(400).json({ message: "Mobile or Email already in use" });
    }

    const newParticipant = new Participant({ name, mobile, email });
    await newParticipant.save();
    res.status(201).json({
      message: "Participant registered successfully!",
      participantId: newParticipant._id,
    });
  } catch (error) {
    console.error("Error registering participant:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

exports.addAnswers = async (req, res) => {
  const { mobile, question, selectedOption } = req.body;

  try {
    // console.log("Request body:", req.body); // Debug incoming request

    // Find the participant by mobile number
    const participant = await Participant.findOne({ mobile });
    if (!participant) {
      console.error("Participant not found for mobile:", mobile);
      return res.status(404).json({ message: "Participant not found" });
    }

    // Add the answer to the participant's answers array
    participant.answers.push({ question, selectedOption });
    // console.log("Updated participant:", participant); // Debug before saving
    await participant.save();

    res.status(200).json({ message: "Answer added successfully", participant });
  } catch (error) {
    console.error("Error saving answer:", error); // Log full error
    res.status(500).json({ message: "Internal server error", error });
  }
};
