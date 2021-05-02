const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
    
    const token = req.headers.authorization.split(" ")[1];
    console.log('token',token)
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    const decoded = await jwt.verify(token, process.env.secret);
    req.userId = decoded.id;
    console.log('todo ok')
    next();
}

module.exports = verifyToken;