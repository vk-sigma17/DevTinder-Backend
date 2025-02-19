const mongoose = require('mongoose');
const validate = require('validate');

const testSchema = new mongoose.Schema({
   firstName : {
    type : String,
    required: true,
    minLength: 4,
    maxLength: 50
   },
   lastName : {
    type : String,
    required: true
   },
   email : {
    type : String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
   },
   password : {
    type : String,
    required: true
   },
   age:{
    type: Number,
    required: true,
    min: 18
   },
   gender: {
    type : String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!['male', 'female', 'others'].includes(value)){
         throw new Error("Enter Valid Gender")
      }
    }
   },
   about: {
      type: String,
      default: "Dev is in search for someone here"
  },
  skills: {
   type: [String],  // This defines an array of strings  
   },
  photoUrl:{
   type: String,
   default: "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg"

  }

},
{
   timestamps: true
}
)

const Test = mongoose.model('Test', testSchema);

module.exports = Test;