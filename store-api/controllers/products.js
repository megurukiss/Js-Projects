const Product= require('../models/product');

const getAllProductsStatic = async (req, res) => {
    //throw new Error("testing async errors");
    const products=await Product.find({});
    res.status(200).json({products:products, nbHits:products.length});
}

const getAllProducts = async (req, res) => {
    //get query params
    const query=req.query;

    //define find object
    const queryObj={};

    //set limit
    let limitn=10;
    if(query.limit){
        limitn=parseInt(query.limit);
    }

    //set page
    const page=parseInt(query.page) || 1;

    //set skip
    const skip= (page-1)*limitn;

    //filter a specific attribute
    if(query.name){
        queryObj.name={$regex:query.name,$options:'i'};
    }
    if(query.company){
        queryObj.company={$regex:query.company,$options:'i'};
    }
    if(query.featured){
        queryObj.featured=query.featured;
    }

    //number filters
    filterMap={
        '>':'$gt',
        '>=':'$gte',
        '=':'$eq',
        '<':'$lt',
        '<=':'$lte'
    };
    const regEx=/\b(<|>|>=|=|<|<=)\b/g;
    let filters=query.numericFilters.replace(regEx,(match)=>`-${filterMap[match]}-`);
    const options=['price','rating'];
    filters=filters.split(',').forEach((item)=>{
        const [field,operator,value]=item.split('-');
        if(options.includes(field)){
            if(!queryObj[field]){
                queryObj[field]={};
            }
            queryObj[field][operator]=Number(value);
        }
    });

    const result=Product.find(queryObj).limit(limitn);
    //sort
    if(query.sort){
        const sortKey=query.sort.split(',').join(' ');
        result.sort(sortKey);
    }
    else{
        result.sort('createdAt');
    }

     //set fields
    if(query.fields){
        const fields=query.fields.split(',').join(' ');
        result.select(fields);
    }

    //skip items
    result.skip(skip);

    const products=await result;
    res.status(200).json({products:products, nbHits:products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};