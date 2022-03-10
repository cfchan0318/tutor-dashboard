const jwt = require('jsonwebtoken');


module.exports = { verifyToken }

//FORMAT of token
//Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    console.log(req.body)
    //get auth header value
    const bearerHeader = req.get('Authorization');
    //Check if bearer is undefined
    if (bearerHeader === undefined) {
        //Forbidden
        res.sendStatus(403);
    } else {
         //split at the space to get ride of 'Bearer'
         const bearer = bearerHeader.split(' ');
         //Get token from array
         const bearerToken = bearer[1];
       
        jwt.verify(bearerToken, 'secret', (err, authData) => {
            if (err) {
                //console.log(req);
                res.send(err);
            } else {
                req.authData = authData;
                next();
            }

        });
    }
}
