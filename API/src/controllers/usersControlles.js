import { connection } from "../databases/connection.js";

export default {
  async getUsers (req, res) {
    let sql = "SELECT * FROM users WHERE 1=1";
    const params = [];
    
    //TODO: Tornando a consulta por URL dinamica. Os parametros serão adicionados dentro do tray. 
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
  },

  async postUsers (req, res) {

    if (!req.body.name || !req.body.age || !req.body.email) {
      return res.status(400).json({
        error: "Algum capo vazio"
      });
    }

    const sql = `INSERT INTO users (nome, idade, email) VALUES ('${req.body.name}', '${req.body.age}', '${req.  body.email}')`;
    console.log(sql);

    try {
      await connection.query(sql)
    }catch (e) {
      console.log(e)
      if (e.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          error: "Esse e-mail já foi cadastrado"
        });
      }
      if (e.code === "ER_DATA_TOO_LONG") {
        return res.status(400).json({
          error: "Nome com muitos caracters"
        })
      }

      return res.status(500).json({
        error: "Erro interno do servidor"
      });
    } 

    res.status(201).json(req.body);
  },

  async putUsers (req, res) {
    const sql = `UPDATE users SET nome = '${req.body.name}', idade = '${req.body.age}', email = '${req.body.email}' WHERE id=${req.params.id}`
  
    try {
      const [results, fields] = await connection.query(sql);
      res.status(201).json(results);
    } catch (e) {
      console.log(e)
      console.log('Erro ao atualizar dados!')
    }
  },

  async deleteUsers (req, res) {
    const sql = `DELETE FROM users WHERE id=${req.params.id}`  

    try {
      const [results, fields] = await connection.query(sql);
      res.status(201).json(results);
    } catch (e) {
      console.log("Erro ao escluir urusário")
      console.log(e)
    }
  }
};