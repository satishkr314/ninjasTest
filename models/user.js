const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            requried:true,
            unique:true
        },
        password:{
            type:String,
            requried:true
        },
        name:{
            type:String,
            requried:true
            
        }
    }
);
const User=mongoose.model('user',userSchema);
module.exports=User;