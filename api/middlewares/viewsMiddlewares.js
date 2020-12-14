const path = require('path')

exports.signup = (req, res) => {
    //If this function is passed a "data" object that does that contain any information, render the 
    //ejs file using default information. Otherwise, use the given data passed by the /api POST route.
    let context = (!req.data) ? {username: "", usernameTaken: false} : req.data

    res.render(path.join(__dirname, '../../client/signup.ejs'), context);
}

exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    
    res.redirect('/login')
}

exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}