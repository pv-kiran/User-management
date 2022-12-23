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


const {isAuthenticated, isAdmin} = require('../../middlewares/auth');
const User = require('../../models/User');




router.get('/dashboard', isAuthenticated , isAdmin ,  async (req,res) => {

    const userList  = await User.find({});
    // console.log(userList)
    res.render('dashboard' , {list: userList});
    
});


router.get('/adduser' , isAuthenticated , isAdmin , (req,res) => {
    res.render('newuser');
})


router.post('/adduser' , (req,res) => {
    const {name , email , password} = req.body ;

    checkUser();
    async function checkUser() {
        try {
            const existingUser = await User.find({email: email});
            console.log(existingUser);
            if(existingUser.length === 1) {
                console.log(existingUser)
                return res.render('newuser' , { isRegitered: true , errMessage: 'User alredy exist.. Please try with another email' });
            } else {
                createUser();
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    // createUser();
    async function createUser() {
        try {
            const newUser = await User.create({
                fullName: name ,
                email: email ,
                password: password
            });
            console.log(newUser);
        } catch (err) {
            console.log(err.message);
        }
    }

    res.redirect('/admin/dashboard');


});


router.get('/user/:id' , isAuthenticated , isAdmin, async (req,res) => {
    const {id} = req.params ;
    const user = await User.find({_id: id});
    console.log(user);
    res.render('update' , {user: user[0]} )
})


router.put('/update/:id' , isAuthenticated , isAdmin,  async (req,res) => {
    const {id} = req.params ;
    const {name , email , password} = req.body;
    console.log(id);
    console.log(name);
    console.log(email);
    console.log(password);

    try {
       const updatedUser = await User.findByIdAndUpdate({ _id: id} , {
          $set : {
            fullName: name ,
            email: email ,
            password: password
          }
       }) ;  
    } catch (e) {
        console.log(e);
    }

    res.json({redirect: '/admin/dashboard'});
})


router.delete('/user/:id' , isAuthenticated , isAdmin, async (req,res) => {
    const {id} = req.params ;
    console.log(id);
    try {
        const user = await User.findByIdAndDelete({_id:id});
        console.log(user);
    } catch(e) {
        console.log(e);
    }
    
    res.json({redirect: '/admin/dashboard'});
})




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