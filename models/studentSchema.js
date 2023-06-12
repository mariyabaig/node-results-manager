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
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("Student", studentSchema);
