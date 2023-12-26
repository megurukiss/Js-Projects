const mongoose=require('mongoose');

const connectdb=(url)=>{
    return mongoose.connect(url).then(()=>{
        console.log("Connected to mongodb...");
    })
};


const taskSchema=new mongoose.Schema({
    name:{type:String,required:[true,'please provide name'],trim:true,maxLength:[20,'can not exceed 20 characters']},
    completed:{type:Boolean,default:false}
});

const Task=mongoose.model('Task',taskSchema);


module.exports={connectdb,Task};