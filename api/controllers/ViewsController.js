const router = require("express").Router()
const path = require('path')
const { signup, checkAuthenticated, checkNotAuthenticated, getAllVideos } = require("../middlewares/viewsMiddlewares")

router.get('/signup', checkNotAuthenticated, signup)

router.get('/dashboard', checkAuthenticated,getAllVideos, (req, res) => {
    res.render(path.join(__dirname, '../../client/videos.ejs'), {
        username: req.user.username,
        videos: req.videos
    });
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render(path.join(__dirname, '../../client/sign-in.ejs'));
});

router.get('/password-reset', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../client/passwordreset.html'));
});

module.exports = router