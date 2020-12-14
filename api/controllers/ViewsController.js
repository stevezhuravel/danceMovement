const router = require("express").Router()
const path = require('path')
const { signup } = require("../middlewares/viewsMiddlewares")

router.get('/signup', signup);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../../client/sign-in.ejs'));
});

router.get('/videos', (req, res) => {
    res.render(path.join(__dirname, '../../client/videos.ejs'), {
        username: req.user.username,
        videos: ["vid1", "vid2", "vid3"]
    });
})

router.get('/password-reset', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../client/passwordreset.html'));
});

module.exports = router