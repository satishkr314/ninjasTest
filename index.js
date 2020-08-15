const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const passport=require('passport');
const session=require('express-session');
const passportLocal=require('./config/passport-local-strategy');
const expressLayouts=require('express-ejs-layouts');
const MongoStore=require('connect-mongo')(session);
const saasMiddleware=require('node-sass-middleware');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const flash=require('connect-flash');
const cuntomMware=require('./config/middleware');
app.use(saasMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle: 'extended',
    prefix:'/css'
}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));
app.set("layout extractStyles",true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.use(session({
    name:'ninjaTest',
    secret:'ninjatest',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
    {
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err)
    {
        console.log(err||"connect mongodb setuo ok");
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(cuntomMware.setFlash);
app.use('/',require('./routes/index'));
app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error in loading server");
        return;
    }
    console.log(`server is up and running on port ${port}`);

});