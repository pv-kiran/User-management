const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.set('cache-control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
    next();
});

const {isAuthenticated } = require('../../middlewares/auth');
const { getUserDetails , getSignUpPage , getSigninPage, userRegistration ,userLogin, userLogout} = require('../../controllers/userController')

// model configuration
const User = require('../../models/User');




// home page for user // user details page
router.get('/' , isAuthenticated  , getUserDetails);


// signup page router 
router.get('/signup' , getSignUpPage);


// signin page  router
router.get('/signin' , getSigninPage );

// sign up router  / User Registration
router.post('/save' , userRegistration);


// login route
router.post('/login' , userLogin)


// logout route
router.get('/logout',isAuthenticated , userLogout);





module.exports = router;






































//// Saving / Registering user using get method

// signin router
// router.get('/login' , (req, res) => {
//     const {email , password} = req.query ;
//     findUser();
//     async function findUser() {
//         try {
//             const user = await User.find({email: email , password: password});
//             if(user.length === 1) {
//                 console.log(user);
//                 session=req.session;
//                 session.userid=email;
//                 console.log(req.session)
//                 res.render('home')
//             } else {
//                 console.log(user)
//                 res.render('signin' , {isRegitered: true , errMessage: `User doesn't exist . Please enter valid email and password`});
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     }
// })




// checking if user is logged in // get('/user')

// session=req.session;
    // console.log(session.userid)
    // if(session.userid){
    //     try {
    //         const user = await User.find({email: session.userid})
    //         res.render('home' , {userName: user[0].fullName , userEmail: user[0].email})
    //     } catch(e) {
    //         console.log(e);
    //       }
    // } else {
    //    res.render('signup');
    // }







