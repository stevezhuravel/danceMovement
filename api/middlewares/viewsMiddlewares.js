const path = require('path');
const { Video } = require("../models")


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
        return res.redirect('/dashboard')
    }
    next()
}

exports.getAllVideos = async (req, res, next) => {
    try {
        const videos = await Video.findAll()
        let videoFileNames = []
        
        videos.forEach(file => {
            videoFileNames.push("../dancingmovment/" + file.videoname)
        })

        req.videos = videoFileNames
        return next()
    } catch (error) {
        console.log(error)
    }
}