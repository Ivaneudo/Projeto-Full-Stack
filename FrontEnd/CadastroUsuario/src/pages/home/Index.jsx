/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useRef } from 'react';
import Lixo from '../../assets/lixo.png';
import Api from '../../servers/api'
import './Style.css';

function Home() {

  const [users, setUsers] = useState([])
  const inputNome  = useRef();
  const inputIdade = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');
    setUsers(usersFromApi.data);
  }
  
  useEffect(() => {getUsers();}, []);

  async function postUsers() {

    await Api.post('/usuarios', {
      name:  inputNome.current.value, 
      age: inputIdade.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }

  async function deleteUsers(id) {
    await Api.delete(`/usuarios/${id}`);
    getUsers();
  }
  
  return (
    <>
      <div className="container">
        <form action="" method="post">
          <h1>Cadastro de Usuários</h1>
          <input type="text" name='nome' placeholder='Nome: ' ref={inputNome}/>
          <input type="number" name='idade' placeholder='Idade: ' ref={inputIdade}/>
          <input type="email" name='email' placeholder='E-mail: ' ref={inputEmail}/>
          <button type='button' onClick={postUsers}>Cadastrar</button>
        </form>
        {users.map((user) => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.nome}</span></p>
              <p>Idade: <span>{user.idade}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button>
              <img className='lixo' src={Lixo} alt="Lata de Lixo" onClick={() => deleteUsers(user.id)}/>
            </button>
          </div>
        ))}          
      </div>
    </>
  )
}

export default Home
