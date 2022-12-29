const User = require('../models/User');



// Controller for fetching user details
const getUserDetails = async (req,res) => {

    try {
        const user = await User.find({email: session.userid});
        let isAdmin = false;
        if(user[0].role) {
            isAdmin = true
        } 
        res.render('home' , {userName: user[0].fullName , userEmail: user[0].email , isAdmin: isAdmin});
    } catch(e) {
        console.log(e);
    }

}


// Controller for returning signup page
const getSignUpPage =  (req,res) => {
    if(req.session.userid) {
        return res.redirect('/user');
     }
    res.render('signup');
}


// Controller for returning signin page
const getSigninPage = (req,res) => {
    if(req.session.userid) {
       return res.redirect('/user');
    }
    res.render('signin');
}


// controller for handling user registration
const userRegistration = async (req,res) => {
    const {name , email , password} = req.body ;

      try {
            const existingUser = await User.find({email: email});
            console.log(existingUser);
            if(existingUser.length === 1) {
                console.log(existingUser)
                return res.render('signup' , { isRegitered: true , errMessage: 'User alredy exist.. Please try with another email' });
            } else {
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
      } catch (err) {
            console.log(err);
      }

}



// Controller for handling user login
const userLogin = async (req,res) => {
    const {email , password} = req.body ;
    console.log(email);
    console.log(password);
    
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
                res.render('signin' , {isRegitered: true , errMessage: `User doesn't exist , Please check your email and password` , userEmail: email , userPassword: password});
                // res.redirect('/user');
            }

        } catch (e) {
            console.log(e);
        }
    
}


// controller for handling logout
const userLogout = (req,res) => {
    req.session.destroy();
    // console.log(req.session.id);
    res.redirect('/user/signin');
}


module.exports = {
    getUserDetails ,
    getSignUpPage ,
    getSigninPage ,
    userRegistration ,
    userLogin ,
    userLogout
}