const {connectdb}=require('./db/connect');
const express=require('express');
const app=express();
const tasks=require('./routes/task');
const {errorHandler}=require('./middleware/errorHandler');
require('dotenv').config();

app.use(express.static('./public'));
app.use(express.json());


app.use('/api/v1/tasks',tasks);
app.use(errorHandler);
//connect to mongodb and start server
const startServer= async ()=>{
    try{
        await connectdb(process.env.URI);
        app.listen(3000,(req,res)=>{
            console.log("server listening on 3000...");
        });
    }catch(err){
        console.log(err);
    }
}

startServer();
