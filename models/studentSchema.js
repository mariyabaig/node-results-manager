const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  roll: {
    type: Number,
    unique: true,
  },
  dob: {
    type: Date,
  },

  marks: {
    type: Schema.Types.ObjectId,
    ref: "Marks",
  },
});

module.exports = mongoose.model("Student", studentSchema);
