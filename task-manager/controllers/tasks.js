const {Task}=require('../db/connect');
const {asyncWrapper}=require('../middleware/async');

const getAllItems=asyncWrapper(async (req,res)=>{
        const tasks=await Task.find({});
        res.status(200).json({tasks:tasks});
});

const createTask=asyncWrapper(async (req,res)=>{
        const task=await Task(req.body).save();
        res.status(201).json({task:task});
});

const getSingleTask=asyncWrapper(async (req,res,next)=>{
        const id=req.params.id
        const singleTask=await Task.findOne({_id:id});
        if(!singleTask){
            return res.status(404).json({Message:`No task with the id ${id}`});
        }
        res.status(200).json({task:singleTask});
});

const updateTask=asyncWrapper(async (req,res)=>{
    const id=req.params.id;
        const task=await Task.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true});
        if(!task){
            return res.status(404).json({Message:`No task with the id ${id}`});
        }
        res.status(200).json({task:task});
});

const deleteTask=asyncWrapper(async (req,res)=>{
    const id=req.params.id
        const task=await Task.findOneAndDelete({_id:id});
        if(!task){
            return res.status(404).json({Message:`No task with the id ${id}`});
        }
        res.status(200).json({task:task});
});



module.exports={getAllItems,createTask,getSingleTask,updateTask,deleteTask};