var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const authenticateToken = require("../middlewares/authenticateToken");

// route signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        
        if (existingUser) {
            return res.status(401).json({ message: 'Utilisateur déjà existant !' });
        }

        const user = await User.create({ name, email, password });
        console.log("user creation successful !!", user)

        
        // create token if data are correct
        const token = jwt.sign({ name, email, password }, 'secretKey', { expiresIn: '24h' });
        
        // return the JWT token for the future API calls
        res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
        });

        console.log("token", token)
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'inscription");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ where: { email }});
        console.log("existingUser", existingUser)
        if (!existingUser || existingUser === null) {
            return res.status(401).json({ message: "Utilisateur non existant !" });
        } 

        const user = await User.findOne({ where: { email, password } });
        console.log("user login successful !!", user)

        // create token if data are correct
        const token = jwt.sign({ email, password }, 'secretKey', { expiresIn: '24h' });
        
        // return the JWT token for the future API calls
        res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
        });
        console.log("token", token)

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la connexion");
    }
});


router.delete("/deleteUser/:id", authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        await user.destroy();
        res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression de l'utilisateur");
    }
});

router.get("/listAllUsers", authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des utilisateurs");
    }
});

module.exports = router;