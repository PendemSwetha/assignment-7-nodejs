const mongooose = require('mongoose');

const studentSchema = new mongooose.Schema({
    // Your code goes here
    id:{type:Number,required:true,unique:true},
name:{type:String,required:true},
currentClass:{type:Number,required:true},
division:{type:String,required:true}
})

const Student = mongooose.model('students', studentSchema);


module.exports = Student;