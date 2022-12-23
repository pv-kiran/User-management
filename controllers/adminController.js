const User = require('../models/User');




const getAllUsers = async (req,res) => {

    const userList  = await User.find({});
    res.render('dashboard' , {list: userList});
    
}


const getAddUser = (req,res) => {
    res.render('newuser');
}


const addNewUser = async (req,res) => {
    const {name , email , password} = req.body ;

    
    try {
          const existingUser = await User.find({email: email});
          console.log(existingUser);
          if(existingUser.length === 1) {
              console.log(existingUser)
              return res.render('newuser' , { isRegitered: true , errMessage: 'User alredy exist.. Please try with another email' });
          } else {
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
        } catch (err) {
            console.log(err);
        }
    

    res.redirect('/admin/dashboard');

} 


const getUser = async (req,res) => {
    const {id} = req.params ;
    const user = await User.find({_id: id});
    console.log(user);
    res.render('update' , {user: user[0]} )
}


const updateUser = async (req,res) => {
    const {id} = req.params ;
    const {name , email , password} = req.body;
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
}


const searchUser = async (req,res) => {
    const {search} = req.body ;
    const queryObject = {};
     if(search) {
         queryObject.fullName = {$regex: search , $options: 'i'};
     }
     console.log(`${queryObject}`)
     const user = await User.find(queryObject)
     res.render('dashboard' , {list: user});
}

const deleteUser = async (req,res) => {
    const {id} = req.params ;
    console.log(id);
    try {
        const user = await User.findByIdAndDelete({_id:id});
        console.log(user);
    } catch(e) {
        console.log(e);
    }
    
    res.json({redirect: '/admin/dashboard'});
}

module.exports = {
    getAllUsers ,
    getAddUser , 
    addNewUser ,
    getUser ,
    updateUser , 
    searchUser ,
    deleteUser
}