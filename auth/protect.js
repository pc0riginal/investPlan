const User = require('../models/User')

const protectRoute = (req,res,next)=>{
    if(req.isAuthenticated()){
        req.isLogged = true
        return next();
    }
    console.log("please log into continue");
    res.redirect('/login')
}

const allowIf = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // console.log(req)
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.authcookie;
    if (!token) {
        console.log("A token is required for authentication!")
        redirect('/login')
        // return res.status(403).send("A token is required for authentication");
    }
    jwt.verify(token, process.env.TOKEN_KEY,(err,data)=>{
        if(err){
            return res.status(401).send("Invalid Token");
        } else if (data.user_id){
            User.findById(data.user_id,(err,user)=>{
                if (user.token === token){
                    next();
                }else{
                    res.redirect('/logout')
                }
            });
        }
    })
};

module.exports ={
    protectRoute,
    allowIf,
    verifyToken
};