import axios, {Method} from 'axios';

export const executeRequest = (endpoint: string, method: Method, body? : any) => {
  const headers = {'Content-Type':'application/json'} as any;
  const token = localStorage.getItem('acessToken');
  if(token){
    headers['Authorization'] = 'Bearer ' + token;
  }

  const URL = 'http://localhost:3000/api/'+endpoint;
  return axios.request({
    url: URL,
    method,
    data: body?body:'',
    headers,
    timeout: 30000
  })
}