import { NextPage} from "next";
import { useState } from "react";
import { executeRequest } from "../services/api";
import Link from 'next/link'


export const Register : NextPage = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const doRegister = async () => {
    try{
     
    
      }catch (e: any) {
      console.log('Ocorreu erro ao efetuar o cadastro:', e);
      if(e?.response?.data?.error){
        setErrorMsg(e?.response?.data?.error);
      } else {
        setErrorMsg('Ocorreu erro ao efetuar o cadastro')
      }
      
  }
}

  return(
    <div className="container-login">
      <img src="/logo.svg" alt="Logo FIAP" className="logo"/>
      <div className="form">
        {errorMsg && <p>{errorMsg}</p>}
        <div>
          <img src="/mail.svg" alt="Login"/>
          <input type='text' placeholder="Login" value={login} onChange={event => setLogin(event.target.value)}/>
          
        </div>
        <div>
        <img src="/lock.svg" alt="Senha"/>
          <input type='password' placeholder="Senha" value={password} onChange={event => setPassword(event.target.value)}/>
          
        </div>

        <button onClick={doLogin} disabled={loading}>{loading ? '...Carregando...' : 'Login'}</button>
        <div className="container-register">
        <Link href="/register">Novo(a) por aqui? Crie sua conta!</Link>
        </div>

      </div>
    </div>
  )
} 