const express = require('express');
const app = express();
require('express-async-errors');
require('dotenv').config();
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const router=require('./routes/products');

// middleware
app.use(express.json());

// routes
app.get('/',(req,res)=>{
    res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use('/api/v1/products',router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



//start server
const port=process.env.PORT || 3000;

const startServer=async ()=>{
    try{
        await connectDB(process.env.URI);
        app.listen(port,()=>{
            console.log(`server listening on ${port}...`);
        });
    }catch(err){
        console.log(err);
    }
}
startServer();
