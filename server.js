// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const express = require('express');
const ejs = require("ejs").__express;
const cookieParser = require("cookie-parser");
const cors = require('cors');
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
const db = require('./db/conn');
const User = require('./models/User');
const PORT = process.env.PORT || 5000;

loginCheck(passport)
// get MongoDB driver connection

const app = express();
app.set('view engine', 'ejs');
app.engine('ejs', ejs);
app.use(cors());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'onebody',
    saveUninitialized: false,
    resave: true,
    // store: new MongoStore({
    //     mongoUrl: process.env.ATLAS_URI,
    //     ttl: 12 * 24 * 60 * 60,
    //     autoRemove: 'native'
    // }),
    cookie: {
        expire: 60000,
        maxAge: 2 * 60 * 60 * 1000,
    },
}))



// app.use((req,res,next)=>{
//     if(req.cookies.user_sid && !req.session.user){
//         res.clearCookie("user_sid");
//     }
//     next();
// });

// const sessionChecker = (req,res,next) => {
//     if (req.session.user && req.cookie.user_sid){
//         res.redirect('/')
//     }
//     else{
//         next();
//     }
// }

app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/record'));
// connect to db
db.connect().then((client)=>{
    // collection = client.db('Login').collection('User')
    // console.log(client)
    
    app.listen(process.env.PORT | PORT, async () => {
            console.log(`Connected! on port ${PORT}`)
    });
}).catch((err)=>{
    console.log(err)
})

app.get('/create', (req, res) => {
    // const l = { "UserName": 'pc', "Password": 'pc@patel' }
    const newUser = new User({
        name:"pc",
        email:"pc.com",
        location:"india",
        password:"paaas",
    });
    newUser
        .save()
        .then(res.status(200).send("saved"))
        .catch((err) => console.log(err));
    // User.bulkSave()
    // collection.insertOne(l).then((e) => res.status(200).send(e)).catch((err) => console.log(err))
})
app.get('/login',async (req,res)=>{
    const result = await collection.find();
    result.toArray().then((e)=>res.status(200).send(e))
})

