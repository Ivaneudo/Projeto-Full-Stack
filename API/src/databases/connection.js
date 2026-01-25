import 'dotenv/config'
import mysql2 from 'mysql2/promise';

// TODO: Conexão com o banco de dados. 
export const connection = await mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});