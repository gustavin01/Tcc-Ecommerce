import { FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCheckSquare } from 'react-icons/fa'
import BarAdmin from "./barAdmin";
import BarLateral from './barLateral';
import AdmMov from './admMov';
import React, { useState, useEffect } from "react";

export default function PgAdmMov() {
    const [loggedIn, setLoggedIn] = useState(true); // Inicializado como true por padrão

    useEffect(() => {
        // Verificar se o tokenAdm existe no localStorage
        const tokenAdm = localStorage.getItem('tokenAdm');
        if (!tokenAdm) {
            setLoggedIn(false); // Define loggedIn como false se o tokenAdm não existir
        }
    }, []);

    if (!loggedIn) {
        return (
            <div className="container text-center mt-5">
                <h2>Conteúdo restrito</h2>
                <p>Este conteúdo está disponível apenas para administradores.</p>
                <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Voltar para a página inicial</button>
            </div>
        );
    }
    return (
        <><BarAdmin /><></>
            <div className='d-flex home'>
                <div className='d-flex sidebar flex-column flex-shrink-0  bg-dark'>
                    <ul className='nav nav-pills flex-column mb-auto px-0 mt-3'>
                        <BarLateral />
                    </ul>

                </div>
                <div className='content container mt-2'>
                    <div className='row'>
                        <div className='col-md-4 text-white col bg-info d-flex 
                    justify-content-around px-1 py-3 rounded'>
                            <a href={"pgadmproduto"}><span>Total Produtos</span><FaCartArrowDown /></a>
                        </div>
                        <div className='col-md-4 text-white col bg-info d-flex 
                    justify-content-around px-1 py-3 rounded'>
                            <a href={"pgadmmov"}><span>Total Movimentações</span><FaCartArrowDown /></a>
                        </div>
                        <div className='col-md-4 text-white col bg-warning d-flex 
                    justify-content-around px-1 py-3 rounded'>
                            <a href={"pgcadprodadm"}><span>Add Produtos</span><FaCartArrowDown /></a>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-1">
                        <h2>Movimentações</h2>
                    </div>
                    <AdmMov />

                </div>
            </div>
        </>
    );
}

