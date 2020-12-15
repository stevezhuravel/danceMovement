const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require("../models");

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    },  
    async (username, password, done) => {
        console.log(password);
        
        try {
            const user = await User.findByPk(username);
        
            if (!user) {
                console.log("User does not exist");
                return done(null, false, { message: "Username incorrect"})
            } 

            const match = password === user.password //await bcrypt.compare(password, user.password) //passwordsMatch(password, user.password);
            
            if (!match) {
                console.log("Password does not match");
                return done(null, false, { message: "password incorrect"})
            }
            console.log("Logged in");
            return done(null, user, { message: "Succesfully Logged In"});
        } catch (error) {
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.username);
})

passport.deserializeUser(async (username, done) => {
    const user = await User.findByPk(username);
    if (!user) {
        return done(null, false);
    } 
    return done(null, user)
})

passport.isAuthenticated = () => {
    (req, res, next) => (req.user ? next() : res.sendStatus(401));
}

module.exports = passport