var express=require("express");
var path=require("path");
var bodyParser=require("body-parser");
var cors=require("cors");
var passport=require("passport");
var mongoose=require("mongoose");
var users=require("./routes/users");
var Users=require("./models/user_model");
var config=require("./config/database");



mongoose.connect(config.database);

var db=mongoose.connection;

db.on("connection",function(){
    console.log("connected");

});



var app=express();

app.get("/",function(req,res){
    res.send("working");
});

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users",users);


app.listen(3000);
