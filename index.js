const mongoose=require('mongoose');
const express=require('express');
const Users=require('./db/Users');
const bcrypt = require('bcrypt')
require('./db/Config');
const cors=require('cors')

const app=express();
const saltRounds = 10;

app.use(cors());
app.use(express.json());

app.post('/',(req,res)=>{
    res.send('Working Fine');
});
app.post('/Register',async (req,res)=>{
    // bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
    //     if(err){
    //         console.error({error:err});
    //     }
    // })
    let user=new Users(req.body);

    let result=await user.save();
    result=result.toObject();
    if(result)
    {
        res.send(result);
    }
    else
    {
        res.send({result:"Something is not right"})
    }
});
app.get('/login',async(req,res)=>{
    console.log(req);
    if(req.body.email && req.body.password)
    {
        let user=await Users.findOne(req.body).select('-password');
        if(user)
        {
            res.send(user)
        }
        else
        {
            res.send({result:"No User Found"})
        }
    }
    else
    {
        res.send({result:"Please Insert Valid User Details"})
    }
});
app.listen(5000);