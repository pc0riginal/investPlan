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

module.exports ={
    protectRoute,
    allowIf
};