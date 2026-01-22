import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import mysql2 from 'mysql2/promise';

// TODO: Conexão com o banco de dados. 
const connection = await mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/usuarios', async (req, res) => {
  
  let sql = "SELECT * FROM users WHERE 1=1";
  const params = [];

  if (req.query.name) {
    sql += " AND nome = ?";
    params.push(req.query.name);
  }

  if (req.query.age) {
    sql += " AND idade = ?";
    params.push(req.query.age);
  }

  if (req.query.email) {
    sql += " AND email = ?";
    params.push(req.query.email);
  }
  
  try {
    const [results, fields] = await connection.query(sql, params);
    res.status(200).json(results);
  } catch (e) {
    console.log(e)
  }
});

app.post('/usuarios', async (req, res) => {
  
  const sql = `INSERT INTO users (nome, idade, email) VALUES ('${req.body.name}', '${req.body.age}', '${req.body.email}')`;
  console.log(sql);

  try {
    const [results, fields] = await connection.query(sql)
    console.log(results, fields);
  }catch (e) {
    console.log(e)
  } 

  res.status(201).json(req.body);
})

app.put('/usuarios/:id', async (req, res) => {
  const sql = `UPDATE users SET nome = '${req.body.name}', idade = '${req.body.age}', email = '${req.body.email}' WHERE id=${req.params.id}`

  try {
    const [results, fields] = await connection.query(sql);
    res.status(201).json(results);
  } catch (e) {
    console.log(e)
    console.log('Erro ao atualizar dados!')
  }
})

app.delete('/usuarios/:id', async (req, res) => {
  const sql = `DELETE FROM users WHERE id=${req.params.id}`  

  try {
    const [results, fields] = await connection.query(sql);
    res.status(201).json(results);
  } catch (e) {
    console.log("Erro ao escluir urusário")
    console.log(e)
  }
})

app.listen(3000);
console.log(`O servidor está rodando na porta 3000.`)