const express = require('express');
const User = require('../models/User')
var path = require('path');


const userRoute = express.Router()

userRoute.post('/usercreate', async (req, res) => {
    const reqBody = req.body; 
    try {
        const user = new User(reqBody);
        await user.save();
    } catch(error) {
        res.status(500).send(error);
    }
});

userRoute.get('/mainpage', async (req, res) => {
    res.render('main');
});

userRoute.post('/userlogin', async (req, res) => {
    const reqBody = req.body;
    const providedPassword = reqBody.password;
    const user = await User.findByMail(reqBody.email);
    if(user == null){
        res.status(500).send({error: "Wrong"});
        return;
    }
    const realPassword = user.password;

    if(providedPassword === realPassword){
        res.status(200).send(user);
    }else {
        res.status(500).send({error: "Wrong"});
    }
        
});













module.exports = userRoute;