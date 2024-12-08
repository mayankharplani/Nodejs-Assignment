const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection('mysql://root:LBAoiboMZZBFMmCxAIcQIonRQCRBoszr@junction.proxy.rlwy.net:52620/railway');


db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;
