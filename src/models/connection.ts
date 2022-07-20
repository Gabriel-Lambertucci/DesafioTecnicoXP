import mysql from 'mysql2/promise'

const connection = mysql.createPool({
  host: 'localhost',
  user: 'gabriel-lambertucci',
  password: 'ps3rules',
})

export default connection;