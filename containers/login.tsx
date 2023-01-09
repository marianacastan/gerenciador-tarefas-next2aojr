import { NextPage } from "next";
import { useState } from "react";
import { executeRequest } from "../services/api";
import { Modal } from "react-bootstrap";

type LoginProps = {
  setToken(s: string): void;

};

export const Login: NextPage<LoginProps> = ({ setToken }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerMsg, setRegisterMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const doLogin = async () => {
    try {
      setErrorMsg("");
      if (!login || !password) {
        return setErrorMsg("Favor preencher os campos");
      }
      setLoading(true);

      const body = {
        login,
        password,
      };
      const result = await executeRequest("login", "POST", body);
      if (result && result.data) {
        const obj = result.data;
        localStorage.setItem("acessToken", obj.token);
        localStorage.setItem("name", obj.name);
        localStorage.setItem("email", obj.email);
        setToken(obj.token);
      }
    } catch (e: any) {
      console.log("Ocorreu erro ao efetuar login:", e);
      if (e?.response?.data?.error) {
        setErrorMsg(e?.response?.data?.error);
      } else {
        setErrorMsg("Ocorreu erro ao efetuar login");
      }
    }
    setLoading(false);
  };
  



  const doRegister = async () => {
    try {
      setErrorMsg("");
      if (!email || !password || !name) {
        return setErrorMsg("Favor preencher os campos abaixo");
      }
      setLoading(true);

      const body = {
        email,
        password,
        name
      };
      const result = await executeRequest("register", "POST", body);
      setRegisterMsg("");
      if (result && result.data) {
        const obj = result.data;
        setRegisterMsg("Usuário criado com sucesso! Realize seu login.");
        setTimeout(() => {
          closeModal();
        }, 2000)
      }
    } catch (e: any) {
      console.log("Ocorreu erro ao criar o usuário", e);
      if (e?.response?.data?.error) {
        setErrorMsg(e?.response?.data?.error);
      } else {
        setErrorMsg("Ocorreu erro ao criar o usuário");
      }
    }
    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setRegisterMsg("");
    setLoading(false);
    setLogin('');
    setErrorMsg('');
    setName('');
    setEmail('');
    setPassword('');

}

  return (
    <>
      <div className="container-login">
        <img src="/logo.svg" alt="Logo FIAP" className="logo" />
        <div className="form">
          {errorMsg && <p>{errorMsg}</p>}
          <div>
            <img src="/mail.svg" alt="Login" />
            <input
              type="text"
              placeholder="Login"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
            />
          </div>
          <div>
            <img src="/lock.svg" alt="Senha" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button onClick={doLogin} disabled={loading}>
            {loading ? "...Carregando..." : "Login"}
          </button>
          <div className="register">
          <button onClick={() => setShowModal(!showModal)} disabled={loading}>
            {loading ? "...Carregando..." : "Novo(a) por aqui? Cria sua conta!"}
          </button>
          </div>
        </div>
      </div>
      <Modal show={showModal} className="container-register">
        <Modal.Body>
          <p>Criar nova conta</p>
          {errorMsg && <p className="error">{errorMsg}</p>}
          {registerMsg && <p className="RegisterMsg">{registerMsg}</p>}
          <span>Nome:*</span>
          <input
            type="text"
            placeholder="Nome do usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Seu melhor email:*</span>
          <input
            type="email"
            placeholder="Email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Senha:*</span>
          <span id="instrucao_senha">Deverá conter no mínimo:<br/>- 8 caracteres<br/>- 1 letra maiúscula<br/>- 1 letra minúscula<br/>- 1 número<br/>- 1 caractere especial: $*&!@#</span>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="button col-12">
            <button disabled={loading} onClick={doRegister}>
              {loading ? "...Carregando..." : "Cadastrar"}
            </button>
            <span onClick={closeModal}>Cancelar</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
