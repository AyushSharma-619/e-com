const User = require('../models/user')

exports.getLogin = (req, res, next) => {
    console.log(req.get('Cookie'))
    res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn:req.session.isLoggedIn
  });
};

exports.postLogin = (req,res,next) =>{
    User.findById('623f2527ad04802818bcea11')
    .then((user)=>{
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save((err)=>{
            console.log(err)
            res.redirect('/')
        })
        
    }).catch((err)=>{
        console.log(err)
    })
}

exports.postLogout = (req,res,next) =>{
   req.session.destroy(()=>{
       res.redirect('/')
   })
}