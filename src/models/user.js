const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
   firstName : {
    type : String,
   },
   lastName : {
    type : String,
   },
   email : {
    type : String,
   },
   password : {
    type : String,
   },
   age:{
    type: Number,
   },
   gender: {
    type : String
   }

}
)

const Test = mongoose.model('Test', testSchema);

module.exports = Test;