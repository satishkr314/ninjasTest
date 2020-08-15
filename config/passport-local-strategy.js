const User=require('../models/user');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
passport.use(new LocalStrategy(
    {
        usernameField:'email',
        passReqToCallback:true
    },function(req,email,password,done)
    {
        User.findOne({email:email},function(err,user)
        {
            if(err)
            {
                req.flash('error',error);
                return done(err);
            }
            if(!user||user.password!=password)
            {
                req.flash('error','Invalid Username/password');

                return done(null,false);
            }
            return done(null,user);
        });
    }
));
//Serializing the user to decide which encrypted key is to be kept in the cookies
passport.serializeUser(function(user,done)
{
    done(null,user.id);
});
//deserializing the user key from the cookies
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log("Error in finding user");
            return done(err);
        }
        return done(null,user);
    });
});
passport.checkAuthentication=function(req,res,next)
{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/user/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    return next();
}
module.exports=passport;
