const db = require("../models");
const User = db.users
const router = require("express").Router()
const bycrypt = require("bcrypt")
const passport = require("../middlewares/authentication")
const { signup } = require("../middlewares/viewsMiddlewares")

router.post("/login", passport.authenticate("local", {
        successRedirect: "/videos",
        failureRedirect: "/login",
        failureFlash: true
    }), 
    (req, res) => {
    console.log("login successful!")
})

router.delete("/logout", (req, res) => {
    req.logOut()
    res.redirect('/login')
})

// Retrieve all Users from the database.
router.get("/", async(req, res) => {
    try {
        const response = await User.findAll()
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Some error occurred while retrieving the Users :(." })
    }
})

// Find a single User with an username
router.get("/:username", async(req, res) => {
    const username = req.params.username
    try {
        const response = await User.findByPk(username)
        res.send(response)
    } catch (error) {
        res.status(500).json({ message: `Error getting user with username: ${username}` })
    }
})

// Update a User by the username in the request
router.put("/:username", async(req, res) => {
    const username = req.params.username

    try {
        const response = await User.update(req.body, { where: { userName: username } })

        if (response) {
            res.json({ number_updated: response })
        }
        res.status(400).json({ message: `User with username: ${username} not found!` })
    } catch (error) {
        res.status(500).json({ message: `Error getting user with username: ${username}` })
    }
})

// Delete a User with the specified username in the request
router.delete("/:username", async(req, res) => {
    const username = req.params.username

    try {
        const response = await User.destroy({ where: { userName: username } })

        if (response) {
            res.json({ number_updated: response })
        }
        res.status(400).json({ message: `User with username: ${username} not found!` })
    } catch (error) {
        res.status(500).json({ message: `Error getting user with username: ${username}` })
    }
})

// Delete all Users from the database.
router.delete("/", async(req, res) => {
    try {
        const numRowsDeleted = await User.destroy()

        res.json({ number_deleted: numRowsDeleted })
    } catch (error) {
        res.status(500).json({ message: "Error deleting rows" })
    }
})

const createUser = async (req, res, next) => {
    try {
        const username = req.body.username
               
        //When a user makes a post request to this route from the sign up page, we must check to see if the 
        //username they entered is availale. If the name they entered is already taken by someone in the 
        //database, return them back to the sign up page with a message telling them the name is taken
        if(await User.findByPk(username)){
            console.log(`user name ${username} taken!`)
            req.data = {
                username: username,
                usernameTaken: true
            }
            //res.redirect("/signup")
            return next()
        }

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password//await bycrypt.hash(req.body.password, 10)
        }

        console.log("user:", user)
        await User.create(user)

        //For the actual app
        res.redirect("/login")

        //For PostMan
        //res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong smh" })
    }
}

// Create and Save a new User
router.post("/", createUser, signup)

module.exports = router