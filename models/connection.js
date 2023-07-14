
require('dotenv').config();

const postgres = require('pg');

const password = String(process.env.MYFIRSTRUBYAPP_DATABASE_PASSWORD);

const client = new postgres.Client({   
    user: 'yannick',
    host: 'localhost',
    database: 'testexpressreactpg',
    password : password,
    port: 5432,

});

client.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données PostgreSQL');
    }
});

module.exports = client;

