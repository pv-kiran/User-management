const User = require('../models/User');




const isAuthenticated = async (req,res,next) => {
    session=req.session;
    // console.log(session.userid);
    if(session.userid){
        console.log('Logged in');
        next();
    } else {
        console.log('Hello');
       res.send('NOT AUTHORIZED');
    }
} 



const isAdmin = async (req,res,next) => {

    // const email = req.session.userId;
    session = req.session;
    console.log(typeof session.userid);
    console.log(session.userid);

    
    // console.log(email);
    try {
        const user = await User.find({email: session.userid});
        console.log('Middle Admin');
        console.log(user);
        console.log(user[0]._id);
        console.log(user[0].fullName);
        console.log(user[0].password);
        console.log(user[0].role);
        if(user[0].role === 'admin') {
            next();
        } else {
            res.send('Your are not authorized to view this page');
        }
    } catch(e) {
        console.log(e);
    }
    // console.log('Admin checker')
    // console.log(req.session.userid);
    // next();
}



module.exports = {
    isAuthenticated,
    isAdmin 
};