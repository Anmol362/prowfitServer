const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    image:String
})

module.exports=mongoose.model('users',userSchema);
