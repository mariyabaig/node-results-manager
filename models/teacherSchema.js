
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

module.exports = mongoose.model("Teacher", teacherSchema)