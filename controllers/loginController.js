//For Register Page
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require("passport");

const registerUser = (req,res) =>{
    const {name,email,password,confirm} = req.body
    console.log(req.body)
    if (name && email && password && confirm){
        if (password !== confirm){
            console.log("Password must match");
            req.flash("passFail","Password did not match")
        }else{
            User.findOne({email:email}).then((user)=>{
                if (user){
                    console.log('email exists')
                    req.flash("emailFail", "Email already exists")
                    res.status(200).send("Email already exists")
                    // res.render('register',{
                    //     name,
                    //     email,
                    //     password,
                    //     confirm,
                    // });
                }else{
                    const newUser = new User({
                        name,
                        email,
                        password,
                    });
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(newUser.password,salt,(err,hash)=>{
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save().then(
                                res.status(200).send('Registered successfully!')
                            ).catch((err)=>console.log(err))
                        });
                    })
                }
            })
        }
    } else {
        console.log("Fill empty fields");
    }
}

const registerView = (req, res) => {
    res.render("register", {
        name:"",
        email:"",
        password:"",
        confirm:""
    });
}
// For View 
const loginView = (req, res) => {

    res.render("login", {
        name:"",
        password:"",
    });
}

const loginUser = (req,res) =>{
    const {email,password} = req.body;
    if (email && password){
        passport.authenticate("local",{
            successRedirect:"/",
            failureRedirect:"/login",
            failureFlash:true,
            failureMessage:true,
        })(req,res);
    }else{
        res.render('login',{
            email,password
        })
    }
}

const logoutUser = (req,res,next)=>{
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/");
    });
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser,
    logoutUser
};