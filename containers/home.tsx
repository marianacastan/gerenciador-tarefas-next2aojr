import { NextPage } from "next";
import { Header } from "../components/header";
import { Footer } from "../components/footer"
import { Filter } from "../components/Filter";
import { List } from "../components/list";
import { executeRequest } from "../services/api";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";


type HomeProps = {
  setToken(s:string):void
}

export const Home : NextPage<HomeProps> = ({setToken}) => {

  const logOut = async () => {
    try{
        localStorage.clear();
        setToken('');
      }
    
      catch (e: any) {
      console.log('Ocorreu erro ao efetuar logout:', e);    
  }
  }

      const [list, setList] = useState([]);
      const [previsionDateStart, setPrevisionDateStart] = useState('');
      const [previsionDateEnd, setPrevisionDateEnd] = useState('');
      const [status, setStatus] = useState(0);
      
      const [showModal, setShowModal] = useState(false);
      const [loading, setLoading] = useState(false);
      const [errorMsg, setErrorMsg] = useState('');
      const [name, setName] = useState('');
      const [finishPrevisionDate, setFinishPrevisionDate] = useState('');
  
      useEffect(() => {
          getFilteredData();
      }, [previsionDateStart, previsionDateEnd, status]);
      const getFilteredData = async () => {
        try {
            let query = '?status=' + status;

            if (previsionDateStart) {
                query += '&finishPrevisionStart=' + previsionDateStart;
            }

            if (previsionDateEnd) {
                query += '&finishPrevisionEnd=' + previsionDateEnd;
            }

            const result = await executeRequest('task' + query, 'GET');
            if (result && result.data) {
                setList(result.data);
            }
        } catch (e) {
            console.log('Ocorreu erro ao buscar os dados das tarefas:', e);
        }
    }
    console.log(list);


    const closeModal = () => {
      setShowModal(false);
      setLoading(false);
      setErrorMsg('');
      setName('');
      setFinishPrevisionDate('');
  }

  const createTask = async () => {
    try{
      setErrorMsg('');
      if(!name || !finishPrevisionDate){
        return setErrorMsg('Favor preencher os campos de nome e data prevista de conclusão')
      }
      setLoading(true);
      
      const body = {
        name,
        finishPrevisionDate
      }
      await executeRequest('task','POST',body);
      await getFilteredData();
      closeModal();
      }catch (e: any) {
      console.log('Ocorreu erro ao cadastrar tarefa:', e);
      if(e?.response?.data?.error){
        setErrorMsg(e?.response?.data?.error);
      } else {
        setErrorMsg('Ocorreu erro ao cadastrar tarefa')
      }
      
  }
  setLoading(false);
}

  return(
    
    <>
    <Header logOut={logOut} togglModal={() => setShowModal(!showModal)}/>
    <Filter
                previsionDateStart={previsionDateStart}
                previsionDateEnd={previsionDateEnd}
                status={status}
                setPrevisionDateStart={setPrevisionDateStart}
                setPrevisionDateEnd={setPrevisionDateEnd}
                setStatus={setStatus}
            />
    <List tasks={list} getFilteredData={getFilteredData}/>
    <Footer togglModal={() => setShowModal(!showModal)}/>
    <Modal
                show={showModal}
                onHide={closeModal}
                className="container-modal">
                <Modal.Body>
                        <p>Adicionar uma tarefa</p>
                        {errorMsg && <p className="error">{errorMsg}</p>}
                        <input type="text" placeholder="Nome da tarefa"
                            value={name} onChange={e => setName(e.target.value)}/>
                        <input type="date" placeholder="Previsão de conclusão"
                            value={finishPrevisionDate} onChange={e => setFinishPrevisionDate(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <div className="button col-12">
                        <button disabled={loading} onClick={createTask}>
                            {loading ? '...Carregando...' : 'Salvar'}
                        </button>
                        <span onClick={closeModal}>Cancelar</span>
                    </div>
                </Modal.Footer>
            </Modal>
 
    </>

  );
}

