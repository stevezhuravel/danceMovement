# Install

# Database

Using mysql shell via a terminal: `mysql -u root < db.sql`


## Install Node using brew

`brew install node`

## Install dependencies

`npm install`  should work because you have the `package.json` file listing the dependencies.

Otherwise, if installing from scratch use `npm i mysql express cors`

# Running backend

from this `backend` folder, `node server.js`

if you have nodemon installed (`npm i -g nodemon`), you can use `nodemon server.js`

the server runs on localhost port 5000.

example use case for inserting new user: 

```
curl --request PUT \
  --url http://localhost:5000/api/v1/user/new \
  --header 'Content-Type: application/json' \
  --data '{
	"data":
	 {
		"username":"test",
		"password":"test"
	 }
}'
```

# Troubleshooting

In case mysql is not running and is installed by brew: `brew services start mysql` to start the service.

Sometimes the port is used by another app so the process has to be killed.

```sh
lsof -i tcp:5000
kill -9 PID
nodemon server.js
```