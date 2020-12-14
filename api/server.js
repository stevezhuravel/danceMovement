if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require('express');
const expressSession = require("express-session");
const bodyParser = require("body-parser")
const flash = require("express-flash")
const cors = require('cors')
const app = express();
const userController = require("./controllers/UserController")
const viewsController = require("./controllers/ViewsController")
const passport = require("./middlewares/authentication")
const db = require("./models")
const PORT = process.env.PORT || 5000

app.set("view-engine", "ejs")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(flash())
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
db.sequelize.sync({ force: false })

//Mount controllers
app.use("/api", userController)
app.use("/", viewsController)
app.use(express.static("client"))

// launches the server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});