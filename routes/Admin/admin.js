const express = require('express');
const router = express.Router();

router.get('/signup' , (req,res) => {
    const isSignUp = true;
    res.render('signup' , { headText: 'SIGN UP' , isSignUp});
});

router.get('/signin' , (req,res) => {
    const isSignUp = false;
    res.render('signup' , { headText: 'SIGN IN' , isSignUp});
});


module.exports = router;