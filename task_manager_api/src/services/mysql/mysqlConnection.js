import mysql from "mysql2/promise";

const mySqlConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpass',
    database: 'app'
});

export default mySqlConnection;
