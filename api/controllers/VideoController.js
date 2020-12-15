const { Video } = require("../models")
const fs = require("fs")
const path = require('path')
const router = require("express").Router()

//Hit this route to fill your database with all the dance movement files!
router.post("/fill", (req, res) => {
    let videos = []
    fs.readdirSync(path.join(__dirname, "../../dancemovment/")).forEach(async file => {
        try {
            const videoFile = await Video.create({ videoname: file })
            videos.push(videoFile)
        } catch (error) {
            console.log(error)
        }
    })
    res.json(videos)
})

module.exports = router