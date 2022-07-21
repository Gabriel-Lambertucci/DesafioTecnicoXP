import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'gabriel-lambertucci',
  password: process.env.MYSQL_PASSWORD || 'ps3rules',
});

export default connection;
