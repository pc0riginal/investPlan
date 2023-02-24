const bcrypt = require('bcryptjs')
LocalStrategy = require('passport-local').Strategy;

// load model
const User = require('../models/User')
const loginCheck = passport => {
    passport.use(
        new LocalStrategy({usernameField:"email"},(email,password,done)=>{
            // check customer
            User.findOne({email:email})
            .then((user)=>{
                console.log(user)
                if(!user){
                    console.log("wrong email");
                    return done(null, false, { message: "wrong email",type:"mail" });
                }
                //Match Password
                bcrypt.compare(password,user.password,(error,isMatch)=>{
                    if (error) throw error;
                    if (isMatch){
                        return done(null,user);
                    }else{
                        console.log("wrong Password")
                        return done(null,false,{message:"wrong password",type:"pass"});
                    }
                })
            })
        })
    )

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    })

    passport.deserializeUser((id,done)=>{
        User.findById(id,(error,user)=>{
            done(error,user);
        });
    });
};

module.exports = {
    loginCheck
}