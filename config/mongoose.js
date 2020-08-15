const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/ninjasTest');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error in connecting mongoDb'));
db.once('open',function()
{
    console.log("Sucessfully connected to data base");
});
module.exports=db;