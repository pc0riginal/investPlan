const express = require('express');
const { registerView, loginView, registerUser, loginUser, logoutUser } = require('../controllers/loginController');
const { dashboardView } = require("../controllers/dashboardController");
const router = express.Router();
const { protectRoute,allowIf } = require("../auth/protect");

router.get('/logout',protectRoute,logoutUser)
router.get('/',protectRoute, dashboardView)
router.get('/login',allowIf,loginView);
router.post('/login',allowIf,loginUser);
router.get('/register',allowIf,registerView)
router.post('/register',allowIf,registerUser)
module.exports = router;