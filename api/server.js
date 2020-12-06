const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const userController = require("./controllers/UserController")
const db = require("./models")
    // Database configurations

const path = require('path');

// Middleware
// Allows us to acces req.body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
    // Allows our front end to communicate with our backend
app.use(cors());
db.sequelize.sync()
    /* ----
    	 API Endpoints
    	 ----
    */

app.use("/api", userController)
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/', 'index.html'));
});

app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/', 'signup.html'));
});
app.post("/signup", function(req, res) {
    console.log(req.body)
    res.redirect("/login")
})

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/', 'sign-in.html'));
});

app.get('/password-reset', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/', 'passwordreset.html'));
});

app.use(express.static("client"))

// launches the server
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});