const User = require('../models/User');


const getUserDetails = async (req,res) => {

    try {
        const user = await User.find({email: session.userid})
        res.render('home' , {userName: user[0].fullName , userEmail: user[0].email})
    } catch(e) {
        console.log(e);
    }

}

const getSignUpPage =  (req,res) => {
    res.render('signup');
}

const getSigninPage = (req,res) => {
    res.render('signin');
}

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


const userLogin = async (req,res) => {
    const {email , password} = req.body ;
    
    
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