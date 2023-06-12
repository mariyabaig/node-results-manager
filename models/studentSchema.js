const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  roll: {
    type: Number,
    unique: true,
  },
  name: { type: String },
  dob: {
    type: Date,
  },
  score: {
    type: Number,
  },
  marks: {
    type: Schema.Types.ObjectId,
    ref: "Marks",
  },
});

module.exports = mongoose.model("Student", studentSchema);
