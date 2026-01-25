import express from 'express';
import router from './routes/routes.js'
import cors from 'cors';

// TODO: Inicinado o express, configurando o json e liberando o acesso à api para qualquer url.
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router)

app.listen(3000);
console.log(`O servidor está rodando na porta 3000.`)