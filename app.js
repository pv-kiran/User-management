const express = require('express');
const app = express();
const path = require('path');
const Handlebars = require('handlebars')
const hbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
var cors = require('cors')
const mongoose = require('mongoose');


// session handling packages
const cookieParser = require("cookie-parser");
const sessions = require('express-session');


// midddlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(cors())



// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session handling middleware
app.use(cookieParser());

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));





// Importing routes
const userRoute = require('./routes/User/user');
const adminRoute = require('./routes/Admin/admin');



// hbs configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// root setup for hbs
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);




// route setup

// app.get('/',(req,res) => {
//   session=req.session;
//   if(session.userid){
//       res.render('home');
//   } else {
//      res.render('signup');
//   }
// });



app.use('/user' , userRoute );
app.use('/admin' , adminRoute );



// app.get('/' , (req,res) => {
//     res.render('home');
// })

// app.get('/about' , (req,res) => {
//     res.render('about');
// })

// mongoose setup
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => {

    app.listen(3000,() => {
      console.log('Server is up and running');
    })

})
.catch(err => {
  console.log(err);
  console.log('Server is down')
})




