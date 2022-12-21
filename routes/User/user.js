const express = require('express');
const router = express.Router();



// model configuration
const User = require('../../models/User');


router.get('/signup' , (req,res) => {
    const isSignUp = true ;
    res.render('signup' , {headText: 'SIGN UP' , isSignUp});
});

router.get('/signin' , (req,res) => {
    res.render('signin');
});


// sign up router
router.post('/save' , (req,res) => {
    const {name , email , password} = req.body ;

    checkUser();
    async function checkUser() {
        try {
            const existingUser = await User.find({email: email});
            console.log(existingUser);
            if(existingUser.length === 1) {
                console.log(existingUser)
                return res.render('signup');
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


router.post('/login' , (req,res) => {
    const {email , password} = req.body ;
    findUser();
    async function findUser() {
        try {
            const user = await User.find({email: email , password: password});
            if(user.length === 1) {
                console.log(user);
                session=req.session;
                session.userid = email;
                console.log(req.session)
                res.render('home' , {userName: user[0].fullName , userEmail: user[0].email})
            } else {
                console.log(user)
                res.render('signin' , {isRegitered: true , errMessage: `User doesn't exist , Please enter valid email and password` , userEmail: email , userPassword: password});
            }
        } catch (e) {
            console.log(e);
        }
    }
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});





module.exports = router;