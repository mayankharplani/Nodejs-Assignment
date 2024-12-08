const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbUri = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
const db = mysql.createConnection(dbUri);


db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;
