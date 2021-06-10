const express = require('express');
const router = express();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const Transaction = require('./transactions').Transaction;
const User = require('./users').User;
var ObjectId = require('mongodb').ObjectID;


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
});


var upload = multer({storage: storage});

router.use(express.json());
router.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/valuedview',{ useNewUrlParser: true })
.then( ()=> console.log('connected to mongodb'))
.catch(err => console.error('Could not connect to mongodb',err));
mongoose.set('useFindAndModify', false);

const reviewSchema = new mongoose.Schema({    
    user_id : String,
    transaction_id : String,
    product_id : String,
    product_name : String,
    product_category : String,
    store_name : String,
    bill_image : String,
    product_images : Array,
    is_accepted : {type: Boolean,default:false},
    is_pending : {type: Boolean,default:true},
    amount_credited : {type : Number,default:0}
},{ strict: false,timestamps:true});

const Review = mongoose.model('Review',reviewSchema);


router.get('/pending',async (req,res)=>{
    const review = await Review.find({is_pending:true}).sort({createdAt : -1}).select({_id:1,transaction_id:1,product_name:1,createdAt:1}).limit(10);
    res.json(review);
});

router.get('/accepted',async (req,res)=>{
    const review = await Review.find({is_accepted:true}).sort({updatedAt : -1}).select({_id:1,transaction_id:1,product_name:1,createdAt:1}).limit(10);
    res.json(review);
});

router.get('/rejected',async (req,res)=>{
    const review = await Review.find({is_accepted:false,is_pending:false}).sort({updatedAt : -1}).select({_id:1,transaction_id:1,product_name:1,createdAt:1}).limit(10);
    res.json(review);
});

router.get('/:id',async (req,res)=>{
    const review = await Review.findOne({_id:req.params.id,is_pending:true}).select({__v:0,updatedAt:0,amount_credited:0});
    res.json(review);
});

router.post('/',upload.fields([{name : 'bill-image',maxCount : 1},{name: 'product-images'}]),async (req,res)=>{    
    for( key in req.body) {
        if(!isNaN(Number(req.body[key])) && key!="user_id") {
            req.body[key]=Number(req.body[key]);
        }
    }
    var intermediateReview = req.body;
    intermediateReview.bill_image = req.files['bill-image'][0].path;
    var array =[];
    for(var i=0;i<req.files['product-images'].length;i++){
        array.push(req.files['product-images'][i].path);
    }
    intermediateReview.product_images = array;
    const review = new Review(intermediateReview);
    const result = await review.save();
    const transaction = await Transaction.findOneAndUpdate({_id: mongoose.Types.ObjectId(result.transaction_id)},{review_submitted:true});
    res.json("Submitted");
    
});

router.put('/accept/:id/:amount',async (req,res)=>{    
    const review = await Review.findOne({transaction_id:req.params.id,is_pending:true});
    
    
    const transaction = await Transaction.findOne({_id:mongoose.Types.ObjectId(req.params.id),review_submitted:true});
    if(review != null && transaction!= null) {
        const user = await User.findOne({mobile_no:review.user_id});
        const mobile_no = user.mobile_no;
        const wallet = user.wallet;
        const amount = parseInt(req.params.amount);
        if(user!=null) {
            const user = await User.findOneAndUpdate({mobile_no: mobile_no},{wallet: wallet + amount});
            const review = await Review.findOneAndUpdate({transaction_id: req.params.id},{is_accepted:true,amount_credited: amount,is_pending:false});
           
            const transaction = await Transaction.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)},{amount_credited: amount});
            
            res.json({value:1});
        } else {
            res.json({value:-4});
        }
    } 
    else if(transaction == null) {
        res.json({value:-2});
    } else if(review==null) {
        res.json({value:-3})
    } else {
        res.json({value:-1});
    }
});

router.put('/reject/:id',async (req,res)=>{
    const review = await Review.findOne({transaction_id:req.params.id,is_pending:true});
    if(review != null) {
            const review = await Review.findOneAndUpdate({transaction_id: req.params.id},{is_accepted:false,is_pending:false});            
            res.json({value:1});
    } else {
        res.json({value:-1});
    }
});

module.exports =  router;
