var express = require('express');
var router = express.Router();

// Définition des routes
router.get('/', function(req, res, next) {
    res.send('Réponse de la route index');
});

module.exports = router;
