import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b50c240de048ac',
  password: 'e79b0442',
  database: 'heroku_562cf739f494a56',
});

export default connection;
