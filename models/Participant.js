const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    answers: [
      {
        question: String,
        selectedOption: String,
      },
    ],
  },
  { timestamps: true }
);

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
