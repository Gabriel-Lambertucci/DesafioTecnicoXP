import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'us-cdbr-east-06.cleardb.net',
  user: process.env.MYSQL_USER || 'b50c240de048ac',
  password: process.env.MYSQL_PASSWORD || 'e79b0442',
  database: process.env.MYSQL_DB || 'heroku_562cf739f494a56',
});

export default connection;
