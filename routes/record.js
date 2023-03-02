const express = require('express');
const { registerView, loginView, registerUser, loginUser, logoutUser } = require('../controllers/loginController');
const { dashboardView } = require("../controllers/dashboardController");
const router = express.Router();
const { protectRoute,allowIf,verifyToken } = require("../auth/protect");

router.get('/logout',protectRoute,logoutUser)
router.get('/', protectRoute,verifyToken,dashboardView)
router.get('/login',allowIf,loginView);
router.post('/login', allowIf, loginUser, (req, res, next) => {
    // if success
    if (req.user) {
        res.cookie('authcookie',req.user.token,{maxAge:12*60*60*1000,httpOnly:true})
        res.redirect("/");
    }
    next();
});
router.get('/register',allowIf,registerView)
router.post('/register',allowIf,registerUser)
module.exports = router;