const express = require('express');
const router = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/valuedview',{ useNewUrlParser: true })
.then( ()=> console.log('connected to mongodb'))
.catch(err => console.error('Could not connect to mongodb',err));
mongoose.set('useFindAndModify', false);

const transactionSchema = new mongoose.Schema({    
    user_id : String,
    product_id : String,
    product_name : String,
    product_category : String,
    store_name : String,
    review_submitted : {type: Boolean,default:false},
    review_link : String,
    amount_credited : {type : Number,default:0}
},{timestamps:true});

const Transaction = mongoose.model('Transaction',transactionSchema);


router.get('/:id',async (req,res)=>{
    const transaction = await Transaction.find({user_id:req.params.id,review_submitted:false}).sort({createdAt : -1}).select({_id:0,product_name:1,store_name:1,createdAt:1,review_link:1}).limit(10);
    if(transaction[0]!=null){
        res.json(transaction);
    }else {
        res.json({value:-1});
    }
});

router.get('/single/:tid',async (req,res)=>{
    const transaction = await Transaction.findOne({_id:req.params.tid}).select({__v:0,updatedAt:0,amount_credited:0,review_link:0});
    res.json(transaction);
});



router.put('/:id',async (req,res)=>{
    console.log('called');
    const transaction = await Transaction.findOneAndUpdate({_id: ObjectID(id)},{review_submitted:true});
    res.json({value:1});
});

async function craeteTransaction(transaction){
    const trans = new Transaction(transaction);
    var result = await trans.save();
    const review_link = result.review_link + result._id.toString(); 
    result = await Transaction.findOneAndUpdate({_id:result._id},{review_link: review_link});
};

module.exports =  router;
module.exports.craeteTransaction = craeteTransaction;
//module.exports.Transaction = mongoose.model('Transaction',transactionSchema);
module.exports.Transaction = Transaction;
