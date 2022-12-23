const express = require('express');
const router = express.Router();

const {isAuthenticated , isAdmin} = require('../../middlewares/auth');


// model configuration
const User = require('../../models/User');


router.get('/' , isAuthenticated  , async (req,res) => {

    try {
        const user = await User.find({email: session.userid})
        res.render('home' , {userName: user[0].fullName , userEmail: user[0].email})
    } catch(e) {
        console.log(e);
    }

});


// signup 
router.get('/signup' , (req,res) => {
    res.render('signup');
});


// signin router
router.get('/signin' , (req,res) => {
    res.render('signin');
});

// sign up router for  / User Registration
router.post('/save' , (req,res) => {
    const {name , email , password} = req.body ;

    checkUser();
    async function checkUser() {
        try {
            const existingUser = await User.find({email: email});
            console.log(existingUser);
            if(existingUser.length === 1) {
                console.log(existingUser)
                return res.render('signup' , { isRegitered: true , errMessage: 'User alredy exist.. Please try with another email' });
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
            res.redirect('/user/signin');

        } catch (err) {
            console.log(err.message);
        }
    }


});


// login route
router.post('/login' , (req,res) => {
    const {email , password} = req.body ;
    findUser();
    async function findUser() {
        try {
            const user = await User.find({email: email , password: password});
            if(user.length === 1) {
                // console.log(user);
                session=req.session;
                session.userid = email;
                // console.log(req.session)
                // res.render('home' , {userName: user[0].fullName , userEmail: user[0].email})
                res.redirect('/user');
            } else {
                console.log(user)
                res.render('signin' , {isRegitered: true , errMessage: `User doesn't exist , Please enter valid email and password` , userEmail: email , userPassword: password});
                // res.redirect('/user');
            }

        } catch (e) {
            console.log(e);
        }
    }
})



// logout route
router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/user/signin');
});





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







