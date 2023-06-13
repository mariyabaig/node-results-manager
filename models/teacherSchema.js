
const mongoose = require("mongoose")
const { Schema } = mongoose;


const teacherSchema = new Schema({
  email: {
    type : String,
    unique : true
  } ,
  password: {
    type : String,
    required : true
  } ,
  name :{
    type : String
  }  
 
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;