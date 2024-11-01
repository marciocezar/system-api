// Verifies the token and authenticates the user, if expired token reloads the token.
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(
        token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err)
                return res.sendStatus(403);
            req.user = user;
            next();
        }
    );
};
module.exports = authenticateToken;