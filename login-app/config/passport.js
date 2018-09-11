var JwtStrategy=require("passport-jwt").Strategy;
var ExtractJwt=require("passport-jwt").ExtractJwt;
var Users=require("../models/user_model");
var  config=require("./database");


module.exports=function(passport)
{
    let opts={};
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme("jwt") ;
    opts.secretOrKey=config.secret;
    passport.use(new JwtStrategy(opts,function(jwt_payload,done){
        console.log(jwt_payload._id);
        Users.findById(jwt_payload.data._id,function(err,user){
            if(err){
                console.log(err);
                return done(err,false);
            }
            if(user){
                return done(null,user)
            }else{
                return done(null,false);
            }

        });
    }));
};