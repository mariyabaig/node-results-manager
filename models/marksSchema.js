const mongoose = require("mongoose");
const { Schema } = mongoose;

const marksSchema = new Schema({
  rollNumber: {
    type: Number,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Marks", marksSchema);
