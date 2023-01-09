import { NextPage } from "next";

type HeaderProps = {
    logOut():void
    togglModal():void
}

export const Header: NextPage<HeaderProps> = ({logOut, togglModal}) => {
    const fullName = localStorage.getItem('name');
    const firstName = fullName?.split(' ')[0] || '';

    return (
        <div className="container-header">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
            <button onClick={togglModal}><span>+</span>Adicionar tarefa</button>
            <div className="desktop">
                <span>Olá, {firstName}</span>
                <img src="/exit-desktop.svg" alt="Sair" onClick={logOut}/>
            </div>
            <div className="mobile">
                <span>Olá, {firstName}</span>
                <img src="/exit-mobile.svg" alt="Sair" onClick={logOut}/>
            </div>
        </div>
    );
}