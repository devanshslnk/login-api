var express=require("express");
var router=express.Router();
var Users=require("../models/user_model");
var bcrypt=require("bcryptjs");
var passport=require("passport");
var jwt=require("jsonwebtoken");
var config=require("../config/database");

router.post("/register",function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    var email=req.body.email;
    var name=req.body.name;
    
    // hashin password
    const saltRounds=10;
    
    var newUser=new Users({
        username:username,
        password:password,
        email:email,
        name:name
    });

    Users.findOne({username:username}).then(function(user){
        if(!user){
            bcrypt.genSalt(saltRounds,function(err,salt){
                bcrypt.hash(password,salt,function(err,hash){
                    if(err) throw err;
                    
                    newUser.password=hash;
                    // console.log(newUser.password);
                    newUser.save(function(err){
                                            
                    });
        
                });
            });
        
            res.json({success:true,message:"user created"});
        }else{
            res.json({success:false,message:"username taken"});
        }
    });
    

});

router.post("/authenticate",function(req,res,next){
    // res.send("autenticate");
    var username=req.body.username;
    var password=req.body.password;

    Users.findOne({username:username}).then(function(user){
        
        // if(err){
        //     console.log(err);
        // }
            
        if(!user){
            return res.json({success:false,message:"user not found"});
        }else{
            
            var check=function(err,isMatch){
                if(isMatch===true){
                    // console.log(user);
                    const token=jwt.sign({data:user},config.secret,{
                        expiresIn:604800
                    });

                    res.json({
                        success:true,
                        token:"JWT "+token,
                        user:{
                            id:user._id,
                            username:user.username,
                            email:user.email,
                            name:user.name
                        }
                    });


                }else{
                    return res.json({success:false,message:"wrong password"});

                }
                 
            }
            bcrypt.compare(password,user.password,function(err,isMatch){
                check(err,isMatch);
            });
            
        }
    });

});

router.get("/profile",passport.authenticate("jwt",{session:false}),function(req,res){
    res.json({user:req.user});

});

 
module.exports=router;
