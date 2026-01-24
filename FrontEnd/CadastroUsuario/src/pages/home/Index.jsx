/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useRef } from 'react';
import Lixo from '../../assets/lixo.png';
import Api from '../../servers/api'
import './Style.css';
import Inputs from '../../components/Inputs';

function Home() {

  const [users, setUsers] = useState([]);
  const [errorNome, setErrorNome] = useState();
  const [errorIdade, setErrorIdade] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const inputNome  = useRef();
  const inputIdade = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');
    setUsers(usersFromApi.data);
  }
  
  useEffect(() => {getUsers();}, []);

  async function postUsers() {

    if (!inputNome.current.value) {
      return setErrorNome("Erro: Campo nome está vazio")
    }
    if (!inputIdade.current.value) {
      return setErrorIdade("Erro: Campo idade está vazio")
    }
    if (!inputEmail.current.value) {
      return setErrorEmail("Erro: Campo email está vazio")
    }

    try {
      await Api.post('/usuarios', {
        name:  inputNome.current.value, 
        age: inputIdade.current.value,
        email: inputEmail.current.value
      })
    } catch (e) {
      //TODO: Tratando o erro caso o e-mail esteja duplicado.
      if (e.response?.status === 409) {
        console.log(e);
        return setErrorEmail("Erro: Esse e-mail já está cadastrado.")
      }
      if(e.response?.status === 400) {
        return setErrorNome("Erro: O nome contem muitos caracters.")
      }
    }
    

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
          <Inputs 
            type="text"    
            name='nome'  
            placeholder='Nome: '   
            ref={inputNome}
            err={errorNome}
          />
          <Inputs 
            type="number" 
            name='idade' 
            placeholder='Idade: '  
            ref={inputIdade}
            err={errorIdade}
          />
          <Inputs 
            type="email"  
            name='email' 
            placeholder='E-mail: ' 
            ref={inputEmail}
            err={errorEmail}
          />
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
