const express = require('express');
const router = express.Router();


// model configuration
const User = require('../../models/User');
// console.log(User);


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
    createUser();
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


    res.redirect('/user/signin');
});


// signin router
router.get('/login' , (req, res) => {
    console.log(req.body);
})







module.exports = router;