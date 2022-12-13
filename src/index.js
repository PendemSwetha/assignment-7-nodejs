const express = require('express')
const app = express()
const Student=require('./student')
const bodyParser = require("body-parser");
const port = 8080
const mongoose=require('mongoose');
const studentArray = require('./InitialData');
mongoose.connect("mongodb://localhost/studentdb")
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let stu_id=studentArray.length;
// your code goes here
app.get('/api/student',async (req,res)=>{
    try{
       const student=await Student.create(studentArray)
       res.json({
        status:"Success",
        student
       })
    

    }
    catch(e)
    {
        console.log(e.message);
    }
})

app.get('/api/student/:id',async (req,res)=>{
    try{
      const student=await Student.find({id:req.params.id})
      res.json(
        {  
            status:"success",
            student
        }
      )
    }
    catch(e)
    {
        res.status(404).send("id not valid");
        console.log(e.message);
    }
})
app.post('/api/student',async (req,res)=>{
    try{
       
        stu_id=stu_id+1;
       const student=await Student.create({
        id:stu_id,
        name:req.body.name,
        currentClass:req.body.currentClass,
        division:req.body.division
       })
       res.json(
        {
        status:"Success",
        id:stu_id,
        name:req.body.name,
        currentClass:req.body.currentClass,
        division:req.body.division
       })
       
    }
    catch(e)
    {
        res.status(404).send("could not post");
        console.log(e.message);
    }
})

app.put('/api/student/:id',async (req,res)=>{
    try{
      const students=await Student.updateOne({id:req.params.id},req.body)
      res.json(
        {
            status:"success",
           students:students
        }
      )
    }
    catch(e)
    {
        res.status(404).send("id not valid");
        console.log(e.message);
    }
})

app.delete('/api/student/:id',async (req,res)=>{
    try{
      const students=await Student.deleteOne({id:req.params.id})
      res.json(
        {
            status:"success",
           students:students
        }
      )
    }
    catch(e)
    {
        res.status(404).send("id not valid");
        console.log(e.message);
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   