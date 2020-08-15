const User=require('../models/user');
const passport = require('passport');
const db=require('../config/mongoose');
//profile page After sign-in
module.exports.profile=function(req,res)
{   
    console.log(req.cookies);
    
     return res.render('user_profile',{title:"Profile"});

}
// sign-up page controller
module.exports.signUp=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',{title:"Sign Up"});
}
// sign-in page controller
module.exports.signIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in',{title:"sign In"});
}
//sign-up page execution
module.exports.create=function(req,res)
{
    console.log(req.body)
    if(req.body.password!=req.body.confirm_password)
    {
       req.flash('error','Mismatch Passwors');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)  //checking user's existance
        {
            if(err){
                console.log(`Error in finding while signing up ${err}`);
                return;
            }
            if(!user)                                       // If user doesnot exist
            {
                User.create(req.body,function(err,user)     // Creating user
                {
                    if(err){
                        console.log(`Error in creating user ${err}`);
                        return;
                    }
                   return res.redirect('/user/sign-in');
                });

            }
            else
            {
                return res.redirect('/user/sign-in');
            }
        });
}
// Sign-in form execution
module.exports.create_session=function(req,res)
{
    req.flash('success','loged in successfully');
    return res.redirect('/');
   
    
}
module.exports.distroySession=function(req,res)
{
    req.logout();
    req.flash('success','log out successfully');
    return res.redirect('/');
    
}
//reset Password
module.exports.resetPassword=function(req,res)
{
    console.log("Hello",req.body.email);
    User.findOne({email:req.body.email},function(err,user)
    {
        if(user)
        {

            user.password=req.body.password;
            user.save();
            res.redirect('/user/sign-out');
        }
        else
        {
        res.redirect('back');
        }
    })
}

