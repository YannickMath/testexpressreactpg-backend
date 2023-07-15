const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];//on récupère le token

    if (token == null) return res.sendStatus(401);//si le token est null, on renvoie une erreur 401

    jwt.verify(token, 'secretKey', (err, user) => {//on vérifie le token))
        if (err) return res.sendStatus(403);//si le token est invalide, on renvoie une erreur 403
        req.user = user;//on stocke le token dans la requête
        console.log("req.user", req.user)
        console.log("token approuvé")
        console.log("token", token)

        next();//on passe à la suite
        
    })
}

module.exports = authenticateToken;