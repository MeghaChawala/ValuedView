const express = require('express');
const router = express();
const mongoose = require('mongoose');
const crypto = require('crypto');

mongoose.connect('mongodb://localhost/valuedview',{ useNewUrlParser: true })
.then( ()=> console.log('connected to mongodb'))
.catch(err => console.error('Could not connect to mongodb',err));
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
    name: String,
    email_id: String,
    mobile_no: {type:String, required:true},
    password: String,
    wallet: {type: Number,default: 0}
});

const User = mongoose.model('User',userSchema);


 async function authenticateUser(mobile_no,password){
    const newPassword = crypto.createHash('sha256').update(password).digest('hex');
    async function getUser(){
        const user = await User.findOne({mobile_no:mobile_no,password:newPassword});
        if(user!=null) {
            return true;
        } else {
            return false;
        }
     }
     var result= await getUser(); 
     return result;
};
router.get('/:id',(req,res)=>{
   
});

router.post('/',(req,res)=>{
    
    var password = req.body.password;
    const newPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    async function getUser(){
       const user = await User.findOne({mobile_no:req.body.mobile_no});    
        
       if(user==null) {
        async function createUser() {
            const user = new User({
                name: req.body.name,
                email_id:req.body.email,
                mobile_no:req.body.mobile_no,
                password:newPassword
            });
            const result = await user.save();
            res.json({value: 1});
        }
        createUser();
       } else {
        res.json({value: -1});
       }
    }
    getUser();    
});

router.put('/:id',(req,res)=> {
    if(! req.body.name || req.body.name.length<3){
        //400 bad request
        res.status(400).send('Name is required and must be of 3 characters');
    }
    else{
        let course = courses.find(c => c.id === parseInt(req.params.id));
        if(!course)
            res.status(404).send('Given id not found');
        else
        {
            course.name = req.body.name;
            res.send(course);
        }
    }   
});

module.exports =  router;
module.exports.User =  User;
module.exports.authenticateUser = authenticateUser;
