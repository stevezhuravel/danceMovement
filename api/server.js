const express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql');

// Database configurations
const pool = mysql.createPool({
    connectionLimit: 100, //arbitrary value
    host: 'localhost',
    user: 'dance',
    password: '1111',
    database: 'dancemovement'
});

var path = require('path');

// Middleware
// Allows us to acces req.body
app.use(express.json());
// Allows our front end to communicate with our backend
app.use(cors());

/* ----
	 API Endpoints
	 ----
*/

app.use('../client/static', express.static('static'))
    // GET all the users
app.get("/api/v1/users", (req, res) => {
    try {
        let query = mysql.format('SELECT * FROM users');
        pool.query(query, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // rows fetch
            console.log(data);
            res.json(data);
        });

    } catch (error) {
        console.log(error.message);
    }
});


// GET a single user that matches our id
app.get("/api/v1/users/:id", (req, res) => {
    try {
        const { id } = req.params;
        let query = mysql.format('SELECT * FROM users WHERE usrname=$1', [id]);
        pool.query(query, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // rows fetch
            console.log(data);
            res.json(data);
        });

    } catch (error) {
        console.log(error.message);
    }
});

app.get("/api/v1/media", (req, res) => {
    try {
        const { id } = req.params;
        let query = mysql.format('SELECT * FROM media');
        pool.query(query, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            // rows fetch
            console.log(data);
            res.json(data);
        });
    } catch (error) {
        console.log(error.message);
    }
});

// ----
// Insert new user to database
/* Example Body 
{
		"data":
		 {
				"username":"test",
				"password":"1111"
		 }
}
*/
app.put('/api/v1/user/new', async(req, res) => {
    try {
        // const { username, password } = req.params;
        const { username, password } = req.body.data;
        let query = mysql.format('INSERT INTO ?? (??,??) VALUES (?,?)', ["users", "usrname", "password", username, password]);
        pool.query(query, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            // rows fetch
            console.log(response);
            res.send({ status: 'success', message: 'user added' });
        });

    } catch (error) {
        console.log(error.message);
    }

})

// Insert new media to database
app.put('/api/v1/media/new', async(req, res) => {
    try {
        const { name } = req.params;
        let query = mysql.format('INSERT INTO ?? (??) VALUES (?)', ["media", "name", name]);
        pool.query(query, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            // rows fetch
            console.log(response);
            res.send({ status: 'success', message: 'media added' });
        });

    } catch (error) {
        console.log(error.message);
    }

})


// Insert new playlist to database
app.put('/api/v1/playlist/new', async(req, res) => {
    try {
        const { user, media_list } = req.params;
        let query = mysql.format('INSERT INTO ?? (??) VALUES (?)', ["playlist", "usr_id", "media_list", user, media_list]);
        pool.query(query, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }

            // rows fetch
            console.log(response);
            res.send({ status: 'success', message: 'playlist added' });
        });

    } catch (error) {
        console.log(error.message);
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/signup.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/sign-in.html'));
});

app.get('/password-reset', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/passwordreset.html'));
});



// launches the server
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});