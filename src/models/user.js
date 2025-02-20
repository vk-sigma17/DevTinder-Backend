const mongoose = require('mongoose');
const validator = require('validator');

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
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
         throw new Error("Invalid Email :" + value)
      }
    }
   },
   password : {
    type : String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
         throw new Error("Enter a strong password :" + value)

      }
    }
   },
   age:{
    type: Number,
   //  required: true,
    min: 18
   },
   gender: {
    type : String,
   //  required: true,
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
   default: "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg",
   validate(value) {
      if (!validator.isURL(value)) {
          throw new Error("Invalid URL :" + value)
      }
  }

  }

},
{
   timestamps: true
}
)

const Test = mongoose.model('Test', testSchema);

module.exports = Test;