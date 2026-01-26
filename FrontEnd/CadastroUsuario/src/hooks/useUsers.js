/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import Api from '../servers/api'

export function useUsers () {

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

  return {
    users,
    errorNome,
    errorIdade,
    errorEmail,
    inputNome,
    inputIdade,
    inputEmail,
    postUsers,
    deleteUsers
  } ;
}