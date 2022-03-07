// server/index.js
const path = require('path')
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./src/middlewares/auth");

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

//User auth sample
app.post("/api/users", auth.verifyToken, (req, res) => {
    res.json({
        message: 'user created',
        authData: req.authData
    })
});

app.post('/api/login', (req, res) => {
    //Mock user
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

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(path.resolve(__dirname, '../client/build', 'index.html'));
    console.log(`Server listening on ${PORT}`);
});