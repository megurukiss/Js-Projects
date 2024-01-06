const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const {id,name}=req.user;
    const jobs=await Job.find({createdBy:id}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs,count:jobs.length});
};

const getJob = async (req, res) => {
    const {id}=req.params;
    const job=await Job.findOne({_id:id,createdBy:req.user.id});
    if(!job){
        throw new NotFoundError(`No job with id ${id}`);
    }
    res.status(StatusCodes.OK).json({job});
};

const createJob = async (req, res) => {
    req.body.createdBy=req.user.id;
    const job=await Job.create(req.body);
    // console.log(job);
    res.status(StatusCodes.CREATED).json({job});
};

const updateJob = async (req, res) => {
    const {id}=req.params;
    const {company,position}=req.body;

    if(company==='' || position===''){
        throw new BadRequestError('Company or Position fields cannot be empty');
    }

    const job=await Job.findByIdAndUpdate({_id:id,createdBy:req.user.id},req.body,{new:true,runValidators:true});
    if(!job){
        throw new NotFoundError(`No job with id ${id}`);
    }
    res.status(StatusCodes.OK).json({job});
};

const deleteJob = async (req, res) => {
    const {id}=req.params;
    const job=await Job.findByIdAndRemove({_id:id,createdBy:req.user.id});
    if(!job){
        throw new NotFoundError(`No job with id ${id}`);
    }
    res.status(StatusCodes.OK).send();
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};