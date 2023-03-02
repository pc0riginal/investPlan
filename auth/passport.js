const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
LocalStrategy = require('passport-local').Strategy;

// load model
const User = require('../models/User')
const loginCheck = passport => {
    passport.use(
        new LocalStrategy({usernameField:"email"},(email,password,done)=>{
            // check customer
            User.findOne({email:email})
            .then((user)=>{
                if(!user){
                    console.log("wrong email");
                    return done(null, false, { message: "wrong email",type:"mail" });
                }
                //Match Password
                bcrypt.compare(password,user.password,(error,isMatch)=>{
                    if (error) throw error;
                    if (isMatch){
                        const token = jwt.sign({ user_id: user._id, email: user.email,date: Date.now() }, process.env.TOKEN_KEY, {
                            expiresIn: "12h",
                        })
                        user.token = token
                        user.save()
                        return done(null,user);
                    }
                    else{
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