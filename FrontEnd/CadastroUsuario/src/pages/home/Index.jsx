import Lixo from '../../assets/lixo.png';
import './Style.css';
import Inputs from '../../components/Inputs';
import { useUsers } from '../../hooks/useUsers';

function Home() {

  const {
    users,
    errorNome,
    errorIdade,
    errorEmail,
    inputNome,
    inputIdade,
    inputEmail,
    postUsers,
    deleteUsers
   } = useUsers()
  
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
