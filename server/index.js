// server/index.js
const path = require('path')
const express = require("express");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

//User auth sample
app.post("/api/users", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'user created',
                authData: authData
                
            });
        }
    });

});

app.post('/api/login', (req, res) => {
    //Mock user
    console.log(req.token);
    const user = {
        id: 1,
        username: 'alice',
        email: 'alice@alice.a'
    };

    jwt.sign({ user: user }, 'secret', (err, token) => {
        res.json({
            token
        })
    });
});

//FORMAT of token
//Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.get('Authorization');
    //Check if bearer is undefined
    if (bearerHeader ===  undefined) {
        //Forbidden
        res.sendStatus(403);
    } else {
        
        //split at the space to get ride of 'Bearer'
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
}













// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(path.resolve(__dirname, '../client/build', 'index.html'));
    console.log(`Server listening on ${PORT}`);
});