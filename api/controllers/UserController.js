const db = require("../models");
const User = db.users
const router = require("express").Router()

// Create and Save a new User
router.post("/", async(req, res) => {
    try {
        const user = {
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        await User.create(user)

        //For the actual app
        res.redirect("/login")

        //For PostMan
        //res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Some error occurred while creating the User." })
    }
})

// Retrieve all Users from the database.
router.get("/", async(req, res) => {
    try {
        const response = await User.findAll()
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Some error occurred while retrieving the Users :()." })
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

module.exports = router