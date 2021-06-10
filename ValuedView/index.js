const express = require('express');
const products = require('./routes/products');
const reviews = require('./routes/reviews');
const home = require('./routes/home');
const admin = require('./routes/admin');
const users = require('./routes/users');

const transactions = require('./routes/transactions');
const app = express();
const session = require('express-session')


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products',products);
app.use('/api/users',users);
app.use('/api/admin',admin);
app.use('/api/transactions',transactions);
app.use('/api/reviews',reviews);

app.use('/',home);
app.use(session({secret: "Shh, its a secret!",resave:false,saveUninitialized:true}));

app.use(express.static('public'));


app.get('/getLoginStatus',(req,res)=>{
    if(req.session.user) {
        res.json({status:true,mobile_no:req.session.user});
    } else{
        res.json({status:false});
    }
});

app.get('/getUserId',(req,res)=>{
    if(req.session.user) {
        res.json({id:req.session.user});
    } else{
        res.json({id:"Anonymous"});
    }
});

app.post('/login',async (req,res)=> {
    
    if(!req.session.user){
         const response =await users.authenticateUser(req.body.mobile_no,req.body.password);
        if(response==true) {
            req.session.user =req.body.mobile_no;
            console.log('Session established');
            res.json({value:1});
        } else{
            console.log('Wrong id password');
            res.json({value:-1});
        }
    }else{
        res.json({message:"getlost"});
    }
});

app.get('/admin/getLoginStatus',(req,res)=>{
    if(req.session.admin) {
        res.json({status:true,email_id:req.session.user});
    } else{
        res.json({status:false});
    }
});

app.get('/admin/getAdminName',(req,res)=>{
    if(req.session.admin) {
        res.json({name:req.session.admin_name});
    } else{
        res.json({status:false});
    }
});

app.post('/admin/login',async (req,res)=> {
    if(!req.session.admin){
         const response =await admin.authenticateAdmin(req.body.email_id,req.body.password);
        if(response!=null) {
            req.session.admin =req.body.email_id;
            req.session.admin_name=response.name;
            console.log('Session established');
            res.json({value:1});
        } else{
            console.log('Wrong id password');
            res.json({value:-1});
        }
    }else{
        res.json({message:"getlost"});
    }
});

app.post('/transaction',async (req,res)=> {
    var transaction = req.body;
    if(req.session.user){
        transaction.user_id = req.session.user;
        transactions.craeteTransaction(transaction);
        res.json({value:1});
    }else{
        transaction.user_id = "anonymous";
        transactions.craeteTransaction(transaction);
        res.json({value:1});
    }
});

app.get('/logout',async (req,res)=> {
    if(req.session.user){
        req.session.user = null;
        res.json({message:"logged out"});
    }else{
        res.json({message:"getlost"});
    }
});

app.get('/admin/logout',async (req,res)=> {
    if(req.session.admin){
        req.session.admin = null;
        res.json({message:"logged out"});
    }else{
        res.json({message:"getlost"});
    }
});



const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`);
});
