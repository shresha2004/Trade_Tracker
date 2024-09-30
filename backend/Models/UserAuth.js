const mongoose =require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose');
const Schema =mongoose.Schema

const UserDetail =new Schema({
    Email:{
        
        type:String,
        required:true,
        unique:true

    }
   
    

})
UserDetail.plugin(passportLocalMongoose,{usernameField:'Email'});

module.exports= mongoose.model('UserDetail',UserDetail)