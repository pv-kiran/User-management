const express = require('express');
const router = express.Router();

// const sessions = require('express-session');
// const cookieParser = require("cookie-parser");

// const oneDay = 1000 * 60 * 60 * 24;
// router.use(cookieParser());

// router.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false
// }));

router.use((req, res, next) => {
    res.set('cache-control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
    next();
});

const {isAuthenticated, isAdmin} = require('../../middlewares/auth');
const User = require('../../models/User');



const {getAllUsers , getAddUser , addNewUser , getUser, updateUser, searchUser, deleteUser } = require('../../controllers/adminController');


router.get('/dashboard', isAuthenticated , isAdmin , getAllUsers );


router.get('/adduser' , isAuthenticated , isAdmin , getAddUser);


router.post('/adduser', isAuthenticated , isAdmin , addNewUser);


router.get('/user/:id' , isAuthenticated , isAdmin, getUser );


router.put('/update/:id' , isAuthenticated , isAdmin,  updateUser)


router.post('/search' ,isAuthenticated , isAdmin ,  searchUser)


router.delete('/user/:id' , isAuthenticated , isAdmin, deleteUser)




module.exports = router;





// router.get('/signup' , (req,res) => {
//     const isSignUp = true;
//     res.render('signup' , { headText: 'SIGN UP' , isSignUp});
// });

// router.get('/signin' , (req,res) => {
//     const isSignUp = false;
//     res.render('signup' , { headText: 'SIGN IN' , isSignUp});
// });



    // console.log(typeof userList);
    
      // const userList = [
    //     {
          
    //       fullName: 'Arun PV',
    //       email: 'Arun@gmail.com',
    //       password: '123456789',
    //       __v: 0
    //     },
    //     {
          
    //       fullName: 'Sreejith PV',
    //       email: 'sreee@gmail.com',
    //       password: '1234567',
    //       __v: 0
    //     },
    //     {
          
    //       fullName: 'Kiran PV',
    //       email: 'kiranpv903@gmail.com',
    //       password: 'dsdsd',
    //       __v: 0
    //     },
    //     {
          
    //       fullName: 'Sharath P',
    //       email: 'sharath@gmail.com',
    //       password: '1234567',
    //       __v: 0
    //     },
    //     {
          
    //       fullName: 'Sharook Khan',
    //       email: 'sharook@gmail.com',
    //       password: '123456',
    //       __v: 0
    //     },
    //     {
          
    //       fullName: 'Virat Kohli',
    //       email: 'virat@gmail.com',
    //       password: '123456',
    //       __v: 0
    //     },
    //     {
    //       fullName: 'Abhishek K',
    //       email: 'abhi@gmail.com',
    //       password: '1234567',
    //       __v: 0
    //     },
    //     {
    //       fullName: 'Kiran PV',
    //       email: 'kiran@gmail.com',
    //       password: '1234567',
    //       __v: 0,
    //       role: 'Admin'
    //     }
    // ]