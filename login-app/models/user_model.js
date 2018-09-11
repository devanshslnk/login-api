var mongoose=require("mongoose");
var bcrypt=require("bcryptjs");
var config=require("../config/database");

// mongoose.connect('mongodb://localhost:27017/Users');

// var db=mongoose.connection;

// db.on("connection",function(){
//     console.log("connected");

// });

// db.once(open,function(){
// });

var user_schema=new mongoose.Schema(
    {   name:String,
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        }


        
    }
);

var Users=mongoose.model("Users",user_schema);

module.exports=Users;