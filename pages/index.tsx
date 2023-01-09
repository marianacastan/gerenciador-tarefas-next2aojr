import { Login } from '../containers/login';
import { useEffect, useState } from "react";
import { Home } from '../containers/home';
import { Register } from '../containers/register';


export default function Index() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if(window !== undefined){
      const token = localStorage.getItem('acessToken');
      if(token){
        setAccessToken(token);  
      }
     
    }
  },[])

  return !accessToken ? <Login setToken={setAccessToken}/> : <Home setToken={setAccessToken}/>;
}
