const express = require('express');
const router = express();
var path = require('path');



router.get('/',(req,res) =>{
    res.sendFile(path.resolve('public/index.html'));
});

module.exports =  router;