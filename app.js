const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');

// midddlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));






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
  })
);




// route setup

app.use('/user' , userRoute );
app.use('/admin' , adminRoute );



// app.get('/' , (req,res) => {
//     res.render('home');
// })

// app.get('/about' , (req,res) => {
//     res.render('about');
// })



app.listen(3000,() => {
    console.log('Server is up and running');
})