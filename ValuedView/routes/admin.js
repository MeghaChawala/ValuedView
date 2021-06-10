const express = require('express');
const router = express();
const mongoose = require('mongoose');
const crypto = require('crypto');

mongoose.connect('mongodb://localhost/valuedview',{ useNewUrlParser: true })
.then( ()=> console.log('connected to mongodb'))
.catch(err => console.error('Could not connect to mongodb',err));
mongoose.set('useFindAndModify', false);

const adminSchema = new mongoose.Schema({    
    email_id: String,
    name: String,
    password: String
});

const Admin = mongoose.model('Admin',adminSchema);


async function authenticateAdmin(email_id,password){
    var newPassword = crypto.createHash('sha256').update(password).digest('hex');
    newPassword= newPassword.toUpperCase();
    async function getAdmin(){
        const admin = await Admin.findOne({email_id:email_id,password:newPassword});
        if(admin!=null) {
            return admin;
        } else {
            return null;
        }
     }
     var result= await getAdmin(); 
     return result;
};

module.exports =  router;
module.exports.authenticateAdmin = authenticateAdmin;
