const express = require('express');
const router = express();
const mongoose = require('mongoose');
const axios = require('axios');
const _ = require('underscore');

mongoose.connect('mongodb://localhost/valuedview',{ useNewUrlParser: true })
.then( ()=> console.log('connected to mongodb'))
.catch(err => console.error('Could not connect to mongodb',err));
mongoose.set('useFindAndModify', false);

const productSchema = new mongoose.Schema({
   product_id : String,
   product_name : String,
   visit_count : {type: Number,default: 0},
   stores: Array,
   product_sub_category: String
}, { strict: false });

const Product = mongoose.model('Product',productSchema);


router.get('/:id',async (req,res)=>{
    const product = await Product.findOne({product_id:req.params.id});
    if(product!=null){
        const product = await Product.findOneAndUpdate({product_id:req.params.id},{$inc: {visit_count:1}});
        res.json(product);
    }else {
        res.json({value:-1});
    }
});

router.get('/name/:id',async (req,res)=>{
    const product = await Product.findOne({product_id:req.params.id});
    if(product!=null)
        res.json(product.product_name);
    else
        res.json({value:-1});
});

router.get('/category/:id',async (req,res)=>{
    const product = await Product.findOne({product_id:req.params.id});
    res.json(product.product_sub_category);
});

router.get('/price/:id',async (req,res)=>{
    const product = await Product.findOne({product_id:req.params.id});
    var temp = product.stores;
    var response = [];
    for(var i=0; i<temp.length; i++) {
        var key = Object.keys(temp[i]);
        if(temp[i][key[0]].product_store_logo) {
          var obj = {
            product_store_logo: temp[i][key[0]].product_store_logo,
            product_store_name: temp[i][key[0]].product_store,
            product_price: temp[i][key[0]].product_price,
            product_store_url: temp[i][key[0]].product_store_url
          };
          response.push(obj);
        }
      }
      var sortedData = _.sortBy(response,'product_price');
      res.json(sortedData);
});

router.post('/:id',async (req,res)=>{
    const product = await Product.findOne({product_id:req.params.id});       
    if(product==null) {     
        axios({
            method:'get',
            url:'https://price-api.datayuge.com/api/v1/compare/detail?api_key=B9uxYmBuUH6iiUUwXFQ5cGVvqjPAH6Wb38J&id='+req.params.id,
            responseType:'json'
        })
        .then(function(response) {
            async function addProduct(){
                const product = new Product(response.data.data);
                const result = await product.save();
                res.json({value: 1});                
            }
            addProduct(); 
        }).catch(function(error){
            res.json({value:-2});
        });
    } else{
        res.json({value:-1});
    }
});

router.delete('/:id',async (req,res)=>{
    const product = await Product.findOne({product_id:req.params.id});       
    if(product!=null) {     
        async function removeProduct(){
            const result = await Product.deleteOne({product_id:req.params.id});
            res.json({value: 1});                
        }
        removeProduct(); 
    }else{
        res.json({value:-1});
    }
});

router.put('/specs/:id',async (req,res)=>{
    const product = await Product.findOne({product_id:req.params.id});       
       if(product!=null) {     
        const product = await Product.findOne({product_id:req.params.id,main_specs: { $ne: null } });
        if(product==null)
        {     
            axios({
                method:'get',
                url:'https://price-api.datayuge.com/api/v1/compare/specs?api_key=B9uxYmBuUH6iiUUwXFQ5cGVvqjPAH6Wb38J&id='+req.params.id,
                responseType:'json'
            })
            .then(function(response) {
                async function addSpecs(){
                    const product = await Product.findOneAndUpdate({product_id:req.params.id},response.data.data,{upsert:true});
                    res.json({value: 1});                
            }
            addSpecs(); 
            }).catch(function(error){
                res.json({value:-2});
            });
        }else{
            res.json({value:-1});
        }

    } else{
            res.json({value:-3});
    }
});


router.put('/price/:id',async (req,res)=> {
    const product = await Product.findOne({product_id:req.params.id});       
    if(product!=null) {     
        axios({
            method:'get',
            url:'https://price-api.datayuge.com/api/v1/compare/detail?api_key=B9uxYmBuUH6iiUUwXFQ5cGVvqjPAH6Wb38J&id='+req.params.id,
            responseType:'json'
        })
        .then(function(response) {
            async function updatePrice(){
                const product = await Product.findOneAndUpdate({product_id:req.params.id},{$set: {stores:response.data.data.stores}});
                res.json({value: 1});                
            }
            updatePrice(); 
        }).catch(function(error){
            res.json({value:-2});
        });
    } else{
        res.json({value:-1});
    }
});

router.put('/price',async (req,res)=> {
    const products = await Product.find();
    for(var i=0;i<products.length;i++) {
        var pro =products[i].product_id;
        await axios({
            method:'get',
            // url:'https://price-api.datayuge.com/api/v1/compare/detail?api_key=B9uxYmBuUH6iiUUwXFQ5cGVvqjPAH6Wb38J&id='+products[i].product_id,
            url:'https://price-api.datayuge.com/api/v1/compare/detail?api_key=6GHHE469gVupA8cRgmGEhM76TVdnGc6Vv4Q&id='+products[i].product_id, 
            responseType:'json'
        })
        .then(async function(response) {
           var updatedProduct= await updatePrice(pro,response);             
        }).catch(function(error){
           return res.json({value:-1});
        });
    };
    return res.json({value:1});
});

router.put('/price/category/:name',async (req,res)=> {
    const products = await Product.find({product_category:req.params.name});  
    if(products[0]==undefined)
        res.json({value:-1});
    else
    {
    for(var i=0;i<products.length;i++) {
        var pro =products[i].product_id;
        axios({
            method:'get',
            //url:'https://price-api.datayuge.com/api/v1/compare/detail?api_key=B9uxYmBuUH6iiUUwXFQ5cGVvqjPAH6Wb38J&id='+product.product_id,
            url:'https://price-api.datayuge.com/api/v1/compare/detail?api_key=6GHHE469gVupA8cRgmGEhM76TVdnGc6Vv4Q&id='+products[i].product_id,
            responseType:'json'
        })
        .then(async function(response) {
                var updatedProduct= await updatePrice(pro,response);
        }).catch(function(error){
            return res.json({value:-1});
        });
    }
    return res.json({value:1});
    }
    
});

router.put('/visit',async (req,res)=> {
    const products = await Product.find();
    for(var i=0;i<products.length;i++) {
        var pro =products[i].product_id;
        const updatedProduct = await Product.findOneAndUpdate({product_id:pro},{$set: {visit_count:0}});             
    };
    return res.json({value:1});
});

function updatePrice(pro,response) {
return new Promise(async function(resolve, reject) {
    const updatedProduct = await Product.findOneAndUpdate({product_id:pro},{$set: {stores:response.data.data.stores}}); 
    resolve(updatedProduct);
  });
}
module.exports =  router;
